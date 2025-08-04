import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Create a new job
export const createJob = async (req, res) => {
  try {
    const {
      title,
      companyName,
      location,
      jobType,
      salaryFrom,
      salaryTo,
      description,
      requirements,
      responsibilities,
      applicationDeadline,
    } = req.body;

    const job = await prisma.job.create({
      data: {
        title,
        companyName,
        location,
        jobType,
        salaryFrom: parseInt(salaryFrom),
        salaryTo: parseInt(salaryTo),
        description,
        requirements,
        responsibilities,
        applicationDeadline: new Date(applicationDeadline),
      },
    });

    res.status(201).json(job);
  } catch (err) {
    console.error('Job creation failed', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
export const getJobSuggestions = async (req, res) => {
  const query = req.query.query?.toLowerCase() || '';

  try {
    // If using PostgreSQL with Prisma, TypeORM, etc. – adjust this part:
    const jobs = await prisma.job.findMany(); // <-- replace with your actual DB fetch logic

    const matches = jobs
      .map((job) => job.title)
      .filter((role) => role.toLowerCase().includes(query));

    const uniqueSuggestions = [...new Set(matches)];

    res.json(uniqueSuggestions.slice(0, 5));
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get all jobs with optional search filters
export const getAllJobs = async (req, res) => {
  try {
    const {
      title,
      location,
      jobType,
      salaryFrom,
      salaryTo,
    } = req.query;

    // Start building the filters object
    const filters = {
      AND: [],
    };

    if (title) {
      filters.AND.push({
        title: {
          contains: title,
          mode: 'insensitive',
        },
      });
    }

    if (location) {
      filters.AND.push({
        location: {
          contains: location,
          mode: 'insensitive',
        },
      });
    }

    if (jobType) {
      filters.AND.push({
        jobType: {
          equals: jobType,
          mode: 'insensitive',
        },
      });
    }

    if (salaryFrom) {
      filters.AND.push({
        salaryFrom: {
          gte: parseInt(salaryFrom),
        },
      });
    }

    if (salaryTo) {
      filters.AND.push({
        salaryTo: {
          lte: parseInt(salaryTo),
        },
      });
    }

    // console.log('🔍 Query:', req.query);
    // console.log('🛠️ Prisma Filters:', JSON.stringify(filters, null, 2));

    const whereClause = filters.AND.length > 0 ? filters : undefined;

const jobs = await prisma.job.findMany({
  where: whereClause,
  orderBy: { createdAt: 'desc' },
});

    res.status(200).json(jobs);
  } catch (err) {
    console.error('Failed to fetch jobs', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
