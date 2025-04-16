import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from './models/UserSchema';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

router.use(cookieParser());

router.get('/current-user', async (req: Request, res: Response): Promise<any> => {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    
    if (!token) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      const user = await User.findById(decoded.userId).select('-password');
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }
  
      res.status(200).json({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userId: user._id,
        authMethod: user.authMethod
      });
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  });
  

export default router;
