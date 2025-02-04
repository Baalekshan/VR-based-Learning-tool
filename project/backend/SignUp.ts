import bcrypt from 'bcryptjs';
import express from 'express';
import User from './models/User';

const router = express.Router();
router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
  
    try {
      console.log('Received signup request:', req.body);
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(400).json({ error: 'Error creating user' });
    }
});

export default router;