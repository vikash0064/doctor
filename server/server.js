require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Testimonial = require('./models/Testimonial');
const Appointment = require('./models/Appointment');
const appendToSheet = require('./services/googleSheet');
const sendAppointmentEmail = require('./services/emailService');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
    'https://dentocare-frontend.onrender.com',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:4173'
];

app.use(cors({
    origin: true, // Allow all origins during debugging
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure Uploads Directory Exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('CRITICAL ERROR: MONGO_URI is not defined in environment variables!');
}

mongoose.connect(MONGO_URI || 'mongodb://localhost:27017/dentocare')
    .then(() => console.log('MongoDB Connected successfully to:', MONGO_URI ? 'Remote' : 'Localhost'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err.message);
    });


// --- ROUTES ---

// Health Check
app.get('/', (req, res) => {
    res.send('Dent O Care API is running...');
});

// 1. Get Testimonials (Frontend: PatientSpeaks)
app.get('/api/testimonials', async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ date: -1 });
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Upload Testimonial (Frontend: AdminPanel)
app.post('/api/testimonials', upload.single('media'), async (req, res) => {
    try {
        const { patientName, location, treatment, reviewText } = req.body;
        // Determine media type roughly
        const mediaType = req.file.mimetype.startsWith('video') ? 'video' : 'image';

        // Use dynamic structure for media URL
        const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`;
        const mediaUrl = `${baseUrl}/uploads/${req.file.filename}`;

        const newTestimonial = new Testimonial({
            patientName,
            location,
            treatment,
            reviewText,
            mediaUrl,
            mediaType
        });
        await newTestimonial.save();
        res.status(201).json(newTestimonial);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to upload' });
    }
});

// 3. Book Appointment (Frontend: Appointment)
app.post('/api/appointments', async (req, res) => {
    try {
        console.log('Incoming appointment request:', req.body);
        const { name, phone, email, treatment, date, time, message, urgency } = req.body;

        if (!name || !phone) {
            return res.status(400).json({ error: 'Name and Phone are required' });
        }

        // Save to MongoDB
        const newAppointment = new Appointment({ name, phone, email, treatment, date, time, message, urgency });
        await newAppointment.save();
        console.log('Appointment saved to MongoDB');

        // Sync with external services (Back to non-blocking to avoid Render timeouts)
        appendToSheet({ name, phone, email, treatment, date, time, message, urgency })
            .then(() => console.log('Sheet sync successful'))
            .catch(err => console.error('Sheet sync failed:', err.message));

        sendAppointmentEmail({ name, phone, email, treatment, date, time, message, urgency })
            .then(() => console.log('Email sync successful'))
            .catch(err => console.error('Email sync failed:', err.message));

        res.status(201).json({
            success: true,
            message: 'Appointment recorded in database. Syncing with Email and Sheets in background.',
            data: newAppointment
        });
    } catch (err) {
        console.error('Core Booking API Error:', err.message);
        res.status(500).json({
            error: 'Database error or server failure',
            details: err.message
        });
    }
});

// 4. Get All Appointments (Frontend: Admin Dashboard)
app.get('/api/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

