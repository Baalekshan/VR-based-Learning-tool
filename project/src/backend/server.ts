import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import path from 'path';

import loginRoute from './Login';
import signupRoute from './SignUp';
import passportRoute from './Passport';
import meRoute from './auth';
import profileRoute from './Profile';
import scoreRoutes from './scores';

const app = express();
const PORT = process.env.PORT || 5000;

// CORS settings for deployment
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(bodyParser.json());

// MongoDB Connection (Use MongoDB Atlas for production)
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/vr-learning-tool')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// API Routes
app.use('/api', signupRoute);
app.use('/api', loginRoute);
app.use('/api', passportRoute);
app.use('/api', meRoute);
app.use('/api', profileRoute);
app.use('/api', scoreRoutes);

// Serve the frontend
const frontendPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
