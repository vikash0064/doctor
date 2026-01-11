const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

const appendToSheet = async (data) => {
    try {
        // Validate Credentials
        if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
            console.log('Skipping Google Sheet (Missing GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, or GOOGLE_PRIVATE_KEY in .env)');
            return;
        }

        // Sanitize Private Key (handles literal \n and possible quotes from manual env entry)
        const sanitizedKey = process.env.GOOGLE_PRIVATE_KEY
            .trim()
            .replace(/^"|"$/g, '')
            .replace(/\\n/g, '\n');

        // Initialize Auth
        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL.trim(),
            key: sanitizedKey,
            scopes: [
                'https://www.googleapis.com/auth/spreadsheets',
            ],
        });

        // Initialize Doc
        const sheetId = (process.env.GOOGLE_SHEET_ID || "").trim();
        const serviceEmail = (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "").trim();
        console.log('Connecting to Google Sheet ID:', sheetId);
        console.log('Using Service Account:', serviceEmail);
        const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);

        await doc.loadInfo();
        console.log('Document loaded:', doc.title);

        let sheet = doc.sheetsByIndex[0];
        if (!sheet) {
            throw new Error('No sheets found in Google Spreadsheet');
        }

        // --- ALWAYS RE-SET HEADERS TO ENSURE THEY MATCH ---
        // This ensures new columns like Email, Time, Urgency exist
        const headers = ['Name', 'Phone', 'Email', 'Treatment', 'Date', 'Time', 'Urgency', 'Message', 'SubmittedAt'];
        await sheet.setHeaderRow(headers);
        console.log('Headers verified/updated');

        // Add the row
        await sheet.addRow({
            Name: data.name || '',
            Phone: data.phone || '',
            Email: data.email || '',
            Treatment: data.treatment || '',
            Date: data.date || '',
            Time: data.time || '',
            Urgency: data.urgency || '',
            Message: data.message || '',
            SubmittedAt: new Date().toLocaleString()
        });

        console.log('Successfully appended row to Google Sheet');

    } catch (error) {
        console.error('Google Sheet Error Detail:', error.message);
        console.error('Service Account Used:', (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || 'Unknown'));

        if (error.message.includes('API has not been used')) {
            console.error('ACTION REQUIRED: You must enable the Google Sheets API in the Google Cloud Console.');
            console.error('Visit: https://console.developers.google.com/apis/api/sheets.googleapis.com/overview');
        }
        if (error.message.includes('403') || error.message.includes('permission')) {
            console.error('ACTION REQUIRED: Please share the sheet with:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
        }

        // Don't re-throw if called in background to avoid unhandled promise rejection
        // but it's already caught in server.js
        throw error;
    }
};

module.exports = appendToSheet;
