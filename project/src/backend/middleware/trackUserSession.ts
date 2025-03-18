import { Request, Response, NextFunction } from 'express';
import UserSession from '../models/UserSessionSchema';
import { AuthRequest } from './authenticateUser';

export const trackUserSession = async (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthRequest;
    if (!authReq.user) {
        return next();
    }

    try {
        const sessionId = req.sessionID;
        const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';
        const userAgent = req.get('user-agent') || 'unknown';

        await UserSession.findOneAndUpdate(
            { userId: authReq.user.userId, sessionId },
            {
                lastActive: new Date(),
                ipAddress,
                userAgent
            },
            { upsert: true, new: true }
        );

        next();
    } catch (error) {
        console.error('Error tracking user session:', error);
        next();
    }
}; 