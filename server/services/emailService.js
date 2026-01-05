const nodemailer = require('nodemailer');

const sendAppointmentEmail = async (data) => {
    // Check if credentials exist
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log('Skipping Email (Missing EMAIL_USER or EMAIL_PASS in .env)');
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { name, phone, treatment, date, message } = data;

    // Email content for Admin
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER, // Default to self if no admin email specified
        subject: `New Appointment Request - ${name}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #1a56db;">New Appointment Request</h2>
                <p>You have received a new appointment booking from the website.</p>
                
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <tr style="background-color: #f8fafc;">
                        <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Name</td>
                        <td style="padding: 10px; border: 1px solid #e2e8f0;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Phone</td>
                        <td style="padding: 10px; border: 1px solid #e2e8f0;">${phone}</td>
                    </tr>
                    <tr style="background-color: #f8fafc;">
                        <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Treatment</td>
                        <td style="padding: 10px; border: 1px solid #e2e8f0;">${treatment}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Preferred Date</td>
                        <td style="padding: 10px; border: 1px solid #e2e8f0;">${date}</td>
                    </tr>
                    <tr style="background-color: #f8fafc;">
                        <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Message</td>
                        <td style="padding: 10px; border: 1px solid #e2e8f0;">${message || 'N/A'}</td>
                    </tr>
                </table>
                
                <div style="margin-top: 20px; text-align: center; color: #64748b; font-size: 12px;">
                    <p>This is an automated notification from your Dental Clinic Website.</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Notification email sent to ${mailOptions.to}`);
    } catch (error) {
        console.error('Email Sending Error:', error);
    }
};

module.exports = sendAppointmentEmail;
