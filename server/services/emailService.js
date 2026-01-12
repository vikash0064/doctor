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
            user: (process.env.EMAIL_USER || "").trim(),
            pass: (process.env.EMAIL_PASS || "").trim().replace(/^"|"$/g, '')
        }
    });

    // 1. Send Email to ADMIN
    const adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        subject: `New Appointment: ${name}`,
        html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #2563eb;">New Appointment Request</h2>
                <p><strong>Patient:</strong> ${name}</p>
                <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
                <p><strong>Treatment:</strong> ${treatment}</p>
                <p><strong>Date:</strong> ${date} at ${time}</p>
                <p><strong>Urgency:</strong> ${urgency}</p>
                <p><strong>Message:</strong> ${message || 'N/A'}</p>
            </div>
        `
    };

    // 2. Send Confirmation Email to USER (if email exists)
    const userMailOptions = email ? {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Appointment Confirmed - Dent O Care`,
        html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h2 style="color: #2563eb; margin: 0;">Appointment Confirmed! ✅</h2>
                    <p style="color: #64748b;">Here are your appointment details.</p>
                </div>
                
                <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px dashed #cbd5e1;">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Treatment:</strong> ${treatment}</p>
                    <p><strong>Date:</strong> ${date}</p>
                    <p><strong>Time:</strong> ${time}</p>
                    <p><strong>Location:</strong> 123 Dental Street, Surat</p>
                </div>

                <div style="margin-top: 20px; text-align: center;">
                    <p style="color: #64748b; font-size: 14px;">Need to reschedule? Call us at <a href="tel:+918401783154" style="color: #2563eb; font-weight: bold;">+91 84017 83154</a></p>
                    <p style="color: #94a3b8; font-size: 12px; margin-top: 10px;">Dent O Care - Your Smile, Our Priority.</p>
                </div>
            </div>
        `
    } : null;

    try {
        // Send to Admin
        await transporter.sendMail(adminMailOptions);
        console.log(`Admin notification sent to ${adminMailOptions.to}`);

        // Send to User (if email provided)
        if (userMailOptions) {
            await transporter.sendMail(userMailOptions);
            console.log(`User confirmation sent to ${userMailOptions.to}`);
        }
    } catch (error) {
        console.error('Email Sending Error:', error);
        // We don't throw here to avoid failing the whole request if email fails
    }
};

module.exports = sendAppointmentEmail;
