import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jobRoutes from './routes/jobRoutes.js';

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

// Routes
app.use('/api/jobs', jobRoutes);

app.get('/', (req, res) => {
  res.send('Job Management API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
