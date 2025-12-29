import { google } from 'googleapis';

const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY,
});

// If we need OAuth for uploading as a specific channel (which we likely do for admin uploads)
// We would need a more complex setup with OAuth2Client.
// For now, assuming API Key for simple data fetching or simple uploads if allowed, 
// BUT for uploading to a channel, OAuth is required. 
// Given the requirements "Upload course videos by Uploading video to YouTube via YouTube Data API",
// we definitely need OAuth2 or a Service Account with proper delegation (though Service Accounts for YT are tricky).
// A common pattern for internal admin apps is to use an OAuth Refresh Token.

const getYoutubeClient = () => {
    // If using OAuth (Recommended for uploads)
    // const oauth2Client = new google.auth.OAuth2(
    //     process.env.YOUTUBE_CLIENT_ID,
    //     process.env.YOUTUBE_CLIENT_SECRET,
    //     process.env.YOUTUBE_REDIRECT_URI
    // );
    // oauth2Client.setCredentials({ refresh_token: process.env.YOUTUBE_REFRESH_TOKEN });
    // return google.youtube({ version: 'v3', auth: oauth2Client });

    // For simple public data, API key is enough. For uploads, we need OAuth.
    // I will setup the structure for OAuth but comment it out until keys are available,
    // or provide the standard keys based implementation if the user just wants to list things.
    // The user requirement says "Upload videos", so I will assume OAuth is needed.

    if (process.env.YOUTUBE_REFRESH_TOKEN) {
        const oauth2Client = new google.auth.OAuth2(
            process.env.YOUTUBE_CLIENT_ID,
            process.env.YOUTUBE_CLIENT_SECRET,
            process.env.YOUTUBE_REDIRECT_URI || 'http://localhost:3000/api/auth/callback/google'
        );
        oauth2Client.setCredentials({ refresh_token: process.env.YOUTUBE_REFRESH_TOKEN });
        return google.youtube({ version: 'v3', auth: oauth2Client });
    }

    return youtube;
};

/**
 * Initializes a resumable upload session with YouTube
 * Returns the resumable upload URL
 */
const initResumableUpload = async (metadata) => {
    const { YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, YOUTUBE_REFRESH_TOKEN } = process.env;

    if (!YOUTUBE_CLIENT_ID || !YOUTUBE_CLIENT_SECRET || !YOUTUBE_REFRESH_TOKEN) {
        throw new Error('YouTube Upload Configuration Missing: Please ensure YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, and YOUTUBE_REFRESH_TOKEN are set in your .env file. Run "node scripts/generate-youtube-token.js" to get a refresh token.');
    }

    const oauth2Client = new google.auth.OAuth2(
        YOUTUBE_CLIENT_ID,
        YOUTUBE_CLIENT_SECRET,
        process.env.YOUTUBE_REDIRECT_URI || 'http://localhost:3000/api/auth/callback/google'
    );
    oauth2Client.setCredentials({ refresh_token: YOUTUBE_REFRESH_TOKEN });

    const response = await fetch('https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${(await oauth2Client.getAccessToken()).token}`,
            'Content-Type': 'application/json',
            'X-Upload-Content-Length': metadata.fileSize,
            'X-Upload-Content-Type': metadata.mimeType
        },
        body: JSON.stringify({
            snippet: {
                title: metadata.title,
                description: metadata.description || 'Uploaded via VidyaSetu Resumable System',
                categoryId: '27', // Education
            },
            status: {
                privacyStatus: 'unlisted', // Recommended for course videos
                selfDeclaredMadeForKids: false
            }
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`YouTube initialization failed: ${JSON.stringify(error)}`);
    }

    return response.headers.get('Location');
};

export { getYoutubeClient, initResumableUpload };
