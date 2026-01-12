const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
require('dotenv').config();

const test = async () => {
    try {
        console.log('Testing sheet access...');

        // Manual override for testing if .env is not picking up
        const SHEET_ID = '1p4yo4A3VLUL2pMfflxqcT9h-Z6Rvx9H63KIV3EfsWDc';
        const EMAIL = 'dentocare-sheets@jarvis-453411.iam.gserviceaccount.com';
        // We will try to read from process.env first

        if (!process.env.GOOGLE_PRIVATE_KEY) {
            console.error('ERROR: GOOGLE_PRIVATE_KEY is missing in local .env');
            return;
        }

        const validKey = process.env.GOOGLE_PRIVATE_KEY
            .replace(/\\n/g, '\n')
            .replace(/^"|"$/g, '');

        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || EMAIL,
            key: validKey,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID || SHEET_ID, serviceAccountAuth);
        await doc.loadInfo();
        console.log('✅ Connection Successful!');
        console.log('Title:', doc.title);

        const sheet = doc.sheetsByIndex[0];
        console.log('Sheet Title:', sheet.title);

        await sheet.addRow({
            Name: 'Debug Check',
            Phone: '0000000000',
            Email: 'debug@check.com',
            Treatment: 'System Check',
            Date: new Date().toISOString().split('T')[0],
            Time: '12:00 PM',
            Urgency: 'low',
            Message: 'Verifying connection still works',
            SubmittedAt: new Date().toLocaleString()
        });
        console.log('✅ Row added successfully!');
    } catch (err) {
        console.error('❌ Error:', err.message);
        if (err.message.includes('403')) {
            console.error('Reason: PERMISSION DENIED. Check if email is Editor.');
        }
    }
}

test();
