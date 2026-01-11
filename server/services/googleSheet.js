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
        console.log('Connecting to Google Sheet ID:', sheetId);
        const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);

        await doc.loadInfo();
        console.log('Document loaded:', doc.title);

        // Get the first sheet OR a sheet named 'Sheet1'
        let sheet = doc.sheetsByIndex[0];
        if (!sheet) {
            console.error('No sheets found in this document!');
            throw new Error('No sheets found in Google Spreadsheet');
        }
        console.log('Using sheet:', sheet.title);

        // Ensure headers are set correctly for all fields
        const headers = ['Name', 'Phone', 'Email', 'Treatment', 'Date', 'Time', 'Urgency', 'Message', 'SubmittedAt'];

        // Attempt to set headers if they don't look right (simple check)
        if (sheet.rowCount <= 1) {
            await sheet.setHeaderRow(headers);
        }


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
        console.error('Google Sheet Error Detail:', error);
        throw error; // Re-throw to handle in the route
    }
};

module.exports = appendToSheet;
