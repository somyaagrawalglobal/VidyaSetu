const { google } = require('googleapis');
const readline = require('readline');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables from .env.local or .env
const envPath = fs.existsSync('.env.local') ? '.env.local' : '.env';
dotenv.config({ path: envPath });

const { YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, YOUTUBE_REDIRECT_URI } = process.env;

if (!YOUTUBE_CLIENT_ID || !YOUTUBE_CLIENT_SECRET) {
    console.error('Error: YOUTUBE_CLIENT_ID or YOUTUBE_CLIENT_SECRET not found in environment.');
    console.log('Please add them to your .env or .env.local file first.');
    process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
    YOUTUBE_CLIENT_ID,
    YOUTUBE_CLIENT_SECRET,
    YOUTUBE_REDIRECT_URI || 'http://localhost:3000/api/auth/callback/google'
);

const SCOPES = ['https://www.googleapis.com/auth/youtube.upload', 'https://www.googleapis.com/auth/youtube.readonly'];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function getRefreshToken() {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent' // Forces a refresh token to be returned
    });

    console.log('\n--- YouTube Token Generator ---');
    console.log('1. Authorize this app by visiting this url:');
    console.log('\x1b[36m%s\x1b[0m', authUrl);

    rl.question('\n2. Enter the code from that page here: ', async (code) => {
        try {
            const { tokens } = await oauth2Client.getToken(code);
            console.log('\n--- Success! ---');
            console.log('Add the following to your .env file:');
            console.log('\x1b[32m%s\x1b[0m', `YOUTUBE_REFRESH_TOKEN=${tokens.refresh_token}`);

            if (tokens.refresh_token) {
                console.log('\nNOTE: Keep this token secret. It allows long-term access to your YouTube channel.');
            } else {
                console.log('\nWARNING: No refresh token was returned. If you have authorized this before, you might need to revoke access first at https://myaccount.google.com/permissions');
            }
        } catch (err) {
            console.error('Error retrieving access token', err.message);
        } finally {
            rl.close();
        }
    });
}

getRefreshToken();
