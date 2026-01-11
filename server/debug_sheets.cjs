const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

const GOOGLE_SHEET_ID = "1p4yo4A3VLUL2pMfflxqcT9h-Z6Rvx9H63KIV3EfsWDc";
const GOOGLE_SERVICE_ACCOUNT_EMAIL = "dentocare-sheets@jarvis-453411.iam.gserviceaccount.com";
const GOOGLE_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC3wH/tnJBhAdC3\njTHMWo8uE867At453ouDJFm1uiccf7dv3hmuxqRVmtiHqM8Rpz84qTzXmFUWG319\ndXQhc2EQRi/y68WzqN7m15as/1SWuzVsajeSJwUYzyL/2neKIw1CKwqsyG1bpoBl\n4U9KftvF8st/GzvuZMWg+bs82s3pGtSr+PdcSxp09/5W4cwP97R/aC5Hfr0wX44L\ndo0mS4/i9q+A8ZCNzJPC3nN+OcLxUa2dZ6x/8w/23vgVBWNXBwbeb2gjIkXhL0cp\n4PrKquwMAodPngX+9GOw4QqM1PBJmFIcaUoR6d7cYGIyl628o6R9FVeO9Vl6qYPM\nVrIay/brAgMBAAECggEAVJbD7YUA+/9Db3QKxCm+NvZ8WR/ZYGd/7veZaqyO27I5\npkBmr0wXk6bsXgsKg/RriLBz50XjiYFPNCWRN+LvAHhnE1uRUAMB1d/SJ8KE1LzK\nu6Vr/paC5KhaUtDl7cv0Cw1YZTEBEstj2UKu5zrd/lKmdlV5seVnCxNbrAiH+PIO\nE69bHzQxpJx6cfluucQvd1y3sO8U5ALVSYaCqEoBs4eGK9UB/KXHFIzTHekXthlB\na+rQUa845drX1lkG5ogzi31raPPkWUILOcNvz+zGkWGpFmIsmmgFDwYav9fWWUTg\n9lV1ZJq1yqn41lyBPoejPud0M27qve5KJ9wy1sAi+QKBgQDs8wH8QRwaws6wkT6t\ndWTjNaMMsC/LwNWyp6JZRXQQ4xFbbKhDlw9jjvyrfrho8oetkc2icoTw4/R+DFqZ\nxwibuMaq7n/Lb/d4ljVBIpoc0RvoxFOeHQHyYcV1fwurpVEcLVxz3ntYBl0n1cUU\nxSN2F+UA3/pBaDGe7stLtUlfaQKBgQDGho/m6RMd+2F47MTDLjYp4A/NXSA/3p+D\nb5MM3k/OaOnQxN/Q5/WfaM91udjQTRwIU1oow+3qN72P2AwINalnGz90BStJIvmh\nYHXIb1tnlX0r75CFS+lb+wmPqoPPMLWe4RnQLhObS5rr2lku9EtSyevj62iWiROt\nMzFsZ5StMwKBgQDFAGWuLRQIy968voW2AdyXa4jci7+xT+pcVzOLtUsCn0dXE8fy\nKi4JQGCi1QDNgJd9n7OwVDZjcaNdCThqkih+D+pdQ13M7pJ6F6i/Nt2bB+CEbnZ3\nBvcPZmqdfbteQlxlaPFtBJTYYrIg5IKu+hi5nrQvPgj7SH24/iDYGSmfwQKBgEhR\nyKYzjdVEN/PXPK5lbTG//8GuBQt/S9iTkpwDeEsXCOYWcfomJeIWSkz2kLcBAA9A\nXf2vskG6YIHAEFIFSlrXIDxhja0s4ocZHo8PkdqgKGMS+DC2wKHTR15gnXeipObl\n1YNy5Y2S8zKr7gUe1TmpeRckMIt2EAbuOTjmWtDlAoGAE1Cv7va+ZZMVrS9v/b2g\nLEktIfbgUmhE8ENiO6sOBOJOTRkpVq8tFOWBVk76KyOtw1G7WMth7BDgVj7zrku+\nKWF9A+FJ5WIli421fCYb4K9OSqaV6JhZbZBXH3jJIx0t0fM6ip0wcXuRMCs6ccUG\nJ+PD9Iwb4KDJ5amEiLFzZ00=\n-----END PRIVATE KEY-----\n";

async function test() {
    try {
        console.log('Testing sheet access...');
        const serviceAccountAuth = new JWT({
            email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);
        await doc.loadInfo();
        console.log('Title:', doc.title);

        const sheet = doc.sheetsByIndex[0];
        console.log('Sheet Title:', sheet.title);

        await sheet.addRow({
            Name: 'Agent Sync Test',
            Phone: '1111111111',
            Email: 'sync@test.com',
            Treatment: 'Test',
            Date: '2026-01-11',
            Time: '12:00 PM',
            Urgency: 'normal',
            Message: 'Testing from agent script',
            SubmittedAt: new Date().toLocaleString()
        });
        console.log('Row added successfully!');
    } catch (err) {
        console.error('FULL ERROR MESSAGE:', err.message);
        if (err.response && err.response.data) {
            console.error('SERVER RESPONSE:', JSON.stringify(err.response.data, null, 2));
        }
    }
}

test();
