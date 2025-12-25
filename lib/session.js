import dbConnect from '@/lib/db';
import User from '@/models/User';
import logger from '@/lib/logger';

// Validate Session - ALWAYS check DB for security
// No caching for session validation to ensure real-time invalidation
export async function validateSession(userId, incomingToken) {
    if (!userId || !incomingToken) return false;

    try {
        await dbConnect();
        const user = await User.findById(userId).select('activeToken').lean();
        return user && user.activeToken === incomingToken;
    } catch (error) {
        logger.error('Session Validation Error', error);
        return false;
    }
}

export async function updateUserSession(userId, newToken) {
    try {
        await dbConnect();
        await User.findByIdAndUpdate(userId, { activeToken: newToken });
        logger.info('Session updated for user', userId);
    } catch (error) {
        logger.error('Update Session Error', error);
    }
}
