import React from 'react';
import JobCard from './JobCard';

const jobs = [
  { title: 'Full Stack Developer', company: 'Amazon', exp: '1–3 yr Exp', mode: 'Onsite', salary: '12LPA' },
  { title: 'Node Js Developer', company: 'Tesla', exp: '1–3 yr Exp', mode: 'Onsite', salary: '12LPA' },
  { title: 'UX/UI Designer', company: 'Bysoft', exp: '1–3 yr Exp', mode: 'Onsite', salary: '12LPA' },
  // Add more as needed
];

const JobList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 py-6">
      {jobs.map((job, idx) => (
        <JobCard key={idx} {...job} />
      ))}
    </div>
  );
};

export default JobList;
