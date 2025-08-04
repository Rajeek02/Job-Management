import JobPosting from './JobPosting';
import { useEffect, useState } from 'react';
import axios from 'axios';

function JobListings({ localJobs, filters }) {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

 const fetchJobs = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/jobs'); // 🔥 Use full URL
    const formatted = response.data.map((job) => ({
      title: job.title || '',
      location: job.location || '',
      jobType: job.jobType || '',
      salaryFrom: job.salaryFrom || 0,
      salaryTo: job.salaryTo || 0,
      description: job.description || '',
      createdAt: new Date(job.createdAt).toISOString(),
    }));
    setJobs(formatted);
  } catch (error) {
    console.error('Error fetching jobs:', error);
  }
};


  useEffect(() => {
    if (localJobs && localJobs.length > 0) {
      setJobs(localJobs);
    } else {
      fetchJobs();
    }
  }, [localJobs]);

  useEffect(() => {
    applyFilters();
  }, [jobs, filters]);

  const applyFilters = () => {
  if (!filters) {
    setFilteredJobs(jobs);
    return;
  }

  const {
    title = '',
    location = '',
    jobType = '',
    salary = '0-Infinity',
  } = filters;

  const [salaryMin, salaryMax] = salary
    .split('-')
    .map((s, i) => (i === 1 && s === 'Infinity' ? Infinity : parseInt(s.trim()) || 0));

  const filtered = jobs.filter((job) => {
    if (!job || typeof job !== 'object') return false;

    const jobTitle = job.title?.toLowerCase() || '';
    const jobLocation = job.location?.toLowerCase() || '';
    const jobTypeFromJob = job.jobType?.toLowerCase() || '';
    const jobSalaryMin = parseInt(job.salaryFrom) || 0;
    const jobSalaryMax = parseInt(job.salaryTo) || 0;

    const matchesTitle = title === '' || jobTitle.includes(title.toLowerCase());
    const matchesLocation = location === '' || jobLocation.includes(location.toLowerCase());
    const matchesType = jobType === '' || jobTypeFromJob === jobType.toLowerCase();
    const matchesSalary = jobSalaryMin >= salaryMin && jobSalaryMax <= salaryMax;

    return matchesTitle && matchesLocation && matchesType && matchesSalary;
  });

  // 🔥 Sort: bring matching-location jobs to top
  if (location) {
    const locLower = location.toLowerCase();
    filtered.sort((a, b) => {
      const aMatch = a.location?.toLowerCase().includes(locLower);
      const bMatch = b.location?.toLowerCase().includes(locLower);
      return bMatch - aMatch; // true=1, false=0; so matching jobs come first
    });
  }

  setFilteredJobs(filtered);
};


  return (
    <div
      className="w-full bg-gray-50 px-1 font-sans relative"
      style={{ maxHeight: 'calc(100vh - 140px)', overflowY: 'auto' }}
    >
      <div className="max-w-[1220px] mx-auto grid grid-cols-1 sm:grid-cols-2 mb-2 md:grid-cols-3 lg:grid-cols-4 gap-x-1 gap-y-2 pt-1">
        {filteredJobs.map((job, index) => (
          <JobPosting
            key={index}
            logo={null}
            role={job.title}
            location={job.location}
            jobType={job.jobType}
            salaryMin={job.salaryFrom}
            salaryMax={job.salaryTo}
            description={job.description}
            isDraft={false}
            createdAt={job.createdAt}
          />
        ))}
      </div>
    </div>
  );
}

export default JobListings;
