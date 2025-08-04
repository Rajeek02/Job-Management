import { useEffect, useState } from 'react';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import Navbar from './components/Navbar';
import JobFilters from './components/JobFilters';
import JobListings from './components/JobListings';
import CreateJobForm from './components/CreateJobForm';
import axios from 'axios';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    type: '',
    salary: '',
  });

  // Toggle form modal
  const handleToggleForm = () => setShowForm((prev) => !prev);

  // Accept full filter object from JobFilters
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Fetch jobs whenever filters change
  useEffect(() => {
    const getFilteredJobs = async () => {
      try {
        const params = new URLSearchParams();

        if (filters.title) params.append('title', filters.title);
        if (filters.location) params.append('location', filters.location);
        if (filters.type) params.append('jobType', filters.type);

        if (filters.salary) {
          const [min, max] = filters.salary.split('-').map(Number);
          if (!isNaN(min)) params.append('salaryFrom', min);
          if (!isNaN(max)) params.append('salaryTo', max);
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/jobs?${params.toString()}`);

        setJobs(response.data);
      } catch (error) {
        console.error('❌ Error fetching filtered jobs:', error);
      }
    };

    getFilteredJobs();
  }, [filters]);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div className="relative min-h-screen bg-[#f8f9fa] px-6 py-4 font-sans">
        <Navbar onCreateClick={handleToggleForm} />

        <div className="mt-6">
          <JobFilters onFilterChange={handleFilterChange} filters={filters} />
        </div>

        <div className="mt-6">
          <JobListings localJobs={jobs} />
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 bg-black/50">
            <div className="bg-white bg-opacity-95 rounded-xl shadow-xl w-[78%] max-w-[680px] p-4 relative">
              <CreateJobForm onSubmitSuccess={() => { setShowForm(false); }} />
            </div>
          </div>
        )}
      </div>
    </MantineProvider>
  );
}

export default App;
