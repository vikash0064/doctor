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
    'http://localhost:3000',
    'http://localhost:4173'
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
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
// Note: For user's machine, assuming local mongo if no URI provided in env.
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dentocare';
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


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
        const { name, phone, treatment, date, message } = req.body;

        // Save to MongoDB
        const newAppointment = new Appointment({ name, phone, treatment, date, message });
        await newAppointment.save();

        // Append to Google Sheet (async, don't block response)
        appendToSheet({ name, phone, treatment, date, message });

        // Send Email Notification (async)
        sendAppointmentEmail({ name, phone, treatment, date, message });

        res.status(201).json({ message: 'Appointment booked successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to book appointment' });
    }
});

// 4. Get All Appointments (Frontend: Admin Dashboard)
app.get('/api/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ date: -1 });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

