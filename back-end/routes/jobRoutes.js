import express from 'express';
import { createJob, getAllJobs } from '../controllers/jobController.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', getAllJobs);
router.post('/', createJob);

router.get('/suggestions', async (req, res) => {
  const query = req.query.query?.toLowerCase();

  if (!query) return res.status(400).json({ error: 'Query is required' });

  try {
    // Fetch all jobs using Prisma
    const allJobs = await prisma.job.findMany();

    // Filter titles matching query
    const titles = allJobs
      .map(job => job.title)
      .filter(title => title.toLowerCase().includes(query));

    // Remove duplicates and limit to 5
    const uniqueSuggestions = [...new Set(titles)].slice(0, 5);

    res.json(uniqueSuggestions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
});

export default router;
