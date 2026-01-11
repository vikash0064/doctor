const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

const appendToSheet = async (data) => {
    try {
        // Validate Credentials
        if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
            console.log('Skipping Google Sheet (Missing GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, or GOOGLE_PRIVATE_KEY in .env)');
            return;
        }

        // Initialize Auth - JWT is required for google-spreadsheet v4+
        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Handle newlines in env var
            scopes: [
                'https://www.googleapis.com/auth/spreadsheets',
            ],
        });

        // Initialize Doc
        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

        await doc.loadInfo();

        let sheet = doc.sheetsByIndex[0];

        // If sheet is empty, set headers
        if (sheet.rowCount <= 1) {
            await sheet.setHeaderRow(['Name', 'Phone', 'Treatment', 'Date', 'Message', 'SubmittedAt']);
        }

        await sheet.addRow({
            Name: data.name || '',
            Phone: data.phone || '',
            Treatment: data.treatment || '',
            Date: data.date || '',
            Message: data.message || '',
            SubmittedAt: new Date().toLocaleString()
        });

        console.log('Successfully appended row to Google Sheet');

    } catch (error) {
        console.error('Google Sheet Error:', error.message);
        // Do not crash the server if sheet fails
    }
};

module.exports = appendToSheet;
