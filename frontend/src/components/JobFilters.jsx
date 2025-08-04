import { IconSearch, IconMapPin, IconUser } from '@tabler/icons-react';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { useState, useMemo } from 'react';

const CustomSlider = styled(Slider)({
  color: 'black',
  height: 4,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    width: 16,
    height: 16,
    backgroundColor: '#fff',
    border: '4px solid black',
    borderRadius: '50%',
    boxShadow: 'none',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: 2,
      height: 2,
      backgroundColor: '#fff',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
  '& .MuiSlider-rail': {
    opacity: 1,
    height: 4,
    backgroundColor: '#ccc',
  },
  '& .MuiSlider-track': {
    height: 4,
    backgroundColor: 'black',
  },
});

function JobFilters({ filters, onFilterChange }) {
  const { title, location, type, salary } = filters;

  const salaryRange = useMemo(() => {
    if (salary) {
      const [min, max] = salary.split('-').map((v) => parseInt(v) / 1000);
      return [min || 0, max || 100];
    }
    return [50, 80];
  }, [salary]);

  return (
    <div className="flex items-center px-12 h-[70px] w-full bg-white relative font-sans">
      {/* Search Input */}
      <div className="flex flex-1 flex-col relative">
        <div className="flex items-center">
          <IconSearch size={18} className="text-gray-500 mr-3" />
          <input
            type="text"
            value={title}
            onChange={(e) => onFilterChange({ ...filters, title: e.target.value })}
            placeholder="Search By Job Title, Role"
            className="w-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="h-10 w-px bg-gray-300 mx-4" />

      {/* Location Dropdown */}
      <div className="flex flex-1 items-center">
        <IconMapPin size={18} className="text-gray-500 mr-2" />
        <select
          value={location}
          onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
          className="w-full text-sm text-gray-600 bg-transparent focus:outline-none"
        >
          <option value="">Location</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Remote">Remote</option>
          <option value="Chennai">Chennai</option>
        </select>
      </div>

      {/* Divider */}
      <div className="h-10 w-px bg-gray-300 mx-4" />

      {/* Job Type */}
      <div className="flex flex-1 items-center">
        <IconUser size={18} className="text-gray-500 mr-2" />
        <select
          value={type}
          onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
          className="w-full text-sm text-gray-600 bg-transparent focus:outline-none"
        >
          <option value="">Job type</option>
          <option value="fulltime">Full-time</option>
          <option value="parttime">Part-time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
        </select>
      </div>

      {/* Divider */}
      <div className="h-10 w-px bg-gray-300 mx-4" />

      {/* Salary Range */}
      <div className="flex flex-1 flex-col justify-center">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-black font-semibold whitespace-nowrap">
            Salary Per Month
          </span>
          <span className="text-sm text-black font-semibold whitespace-nowrap">
            ₹{salaryRange[0]}k - ₹{salaryRange[1]}k
          </span>
        </div>
        <div className="-mt-1">
          <CustomSlider
            size="small"
            value={salaryRange}
            onChange={(_, newValue) =>
              onFilterChange({
                ...filters,
                salary: `${newValue[0] * 1000}-${newValue[1] * 1000}`,
              })
            }
            min={0}
            max={100}
            step={10}
          />
        </div>
      </div>
    </div>
  );
}

export default JobFilters;
