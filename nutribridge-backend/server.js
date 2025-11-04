import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';  // <-- Add this

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('NutriBridge API running ✅'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);  // <-- New line

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    await pool.connect();
    console.log('✅ Database connected');
  } catch (err) {
    console.error('❌ Database connection failed', err);
  }
  console.log(`🚀 Server running on port ${PORT}`);
});

