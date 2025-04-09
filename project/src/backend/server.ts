import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import path from 'path';

import loginRoute from './Login';
import signupRoute from './SignUp';
import passportRoute from './Passport';
import meRoute from './auth';
import profileRoute from './Profile';
import scoreRoutes from './scores';
import coloringProgress from './coloringProgress';
import { trackUserSession } from './middleware/trackUserSession';

const app = express();
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;

// MongoDB Connection (Use MongoDB Atlas for production)
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!process.env.MONGODB_URI && !process.env.MONGO_URI) {
  console.error('❌ MongoDB URI not found in environment variables');
  process.exit(1);
}

// Since we've checked above, we can safely assert MONGODB_URI is a string
mongoose.connect(MONGODB_URI as string)
.then(() => console.log('✅ MongoDB connected'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1); // Exit if MongoDB connection fails
});

// CORS settings for deployment
app.use(cors({
  origin: [
    process.env.CLIENT_URL || 'http://localhost:5173',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Session configuration with MongoDB store
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: MONGODB_URI,
    ttl: 24 * 60 * 60 // Session TTL (1 day)
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: 'strict'
  }
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Track user sessions
app.use(trackUserSession);

app.use(cookieParser());
app.use(bodyParser.json());

// Serve static files
const frontendPath = path.join(__dirname, 'client');
app.use(express.static(frontendPath));

// API Routes
app.use('/api', signupRoute);
app.use('/api', loginRoute);
app.use('/api', passportRoute);
app.use('/api', meRoute);
app.use('/api', profileRoute);
app.use('/api', scoreRoutes);
app.use('/api', coloringProgress);

// Handle client-side routing - must be after API routes
app.get('/*', (_req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${BASE_URL}`);
});
