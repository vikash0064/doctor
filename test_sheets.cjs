require('dotenv').config({ path: './server/.env' });
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

const testSheets = async () => {
    try {
        console.log('Testing Google Sheets connection...');
        console.log('Sheet ID:', process.env.GOOGLE_SHEET_ID);
        console.log('Email:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);

        if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
            console.error('Missing credentials');
            return;
        }

        const sanitizedKey = process.env.GOOGLE_PRIVATE_KEY
            .trim()
            .replace(/^"|"$/g, '')
            .replace(/\\n/g, '\n');

        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL.trim(),
            key: sanitizedKey,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID.trim(), serviceAccountAuth);
        await doc.loadInfo();
        console.log('Success! Document Title:', doc.title);

        const sheet = doc.sheetsByIndex[0];
        console.log('First sheet title:', sheet.title);

        const headers = ['Name', 'Phone', 'Email', 'Treatment', 'Date', 'Time', 'Urgency', 'Message', 'SubmittedAt'];
        await sheet.setHeaderRow(headers);
        console.log('Headers set successfully');

        await sheet.addRow({
            Name: 'Test Name',
            Phone: '1234567890',
            Email: 'test@example.com',
            Treatment: 'Test Treatment',
            Date: '2023-10-10',
            Time: '10:00',
            Urgency: 'Normal',
            Message: 'Test message',
            SubmittedAt: new Date().toLocaleString()
        });
        console.log('Row added successfully');

    } catch (error) {
        console.error('Detailed Error:', error);
    }
};

testSheets();
