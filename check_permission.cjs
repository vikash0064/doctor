const fs = require('fs');

// Read the .env file to get the Google Service Account Email
let email = 'Not Found in .env';
try {
    const envFile = fs.readFileSync('server/.env', 'utf8');
    const match = envFile.match(/GOOGLE_SERVICE_ACCOUNT_EMAIL=(.+)/);
    if (match) {
        email = match[1].trim();
    }
} catch (e) {
    console.log('Could not read .env file');
}

console.log('\n\n' + '='.repeat(60));
console.log('   ACTION REQUIRED: SHARE YOUR GOOGLE SHEET');
console.log('='.repeat(60));
console.log('\nTo fix the "Permission Denied" error, you MUST share your sheet.');
console.log('\n1. Open your Google Sheet.');
console.log('2. Click the "Share" button (Top Right).');
console.log('3. Copy and paste this EXACT email:\n');
console.log(`   ${email}`);
console.log('\n4. Set the role to "EDITOR".');
console.log('5. Click "Send".');
console.log('\n' + '='.repeat(60) + '\n');
