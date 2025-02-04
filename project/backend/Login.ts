import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from './models/User';

const router = express.Router();

router.post('/login', async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    console.log('Received login request:', req.body);
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email }).exec();
    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    if (!user.password) {
      console.log('User password not set:', email);
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch for user:', email);
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;