import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import loginRoute from './Login';
import signupRoute from './SignUp';
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/vr-learning-tool')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use('/api', signupRoute);
app.use('/api', loginRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});