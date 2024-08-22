import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/auth.js'; // Adjust path as needed

dotenv.config();

const app = express();
const mongoUri = process.env.MONGO_URL;

if (!mongoUri) {
  throw new Error('MongoDB connection string is not defined in environment variables');
}

mongoose.connect(mongoUri, { dbName: 'Dream_Nest' })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(4444, () => {
      console.log('Server is running on http://localhost:4444');
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
