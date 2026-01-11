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
        console.error('Google Sheet Error Detail:', error);
        throw error; // Re-throw to handle in the route
    }
};

module.exports = appendToSheet;
