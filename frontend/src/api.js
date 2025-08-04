import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // or use NEXT_PUBLIC_API_URL
});

export const fetchJobs = (params) => API.get('/jobs', { params });
export const createJob = (data) => API.post('/jobs', data);
