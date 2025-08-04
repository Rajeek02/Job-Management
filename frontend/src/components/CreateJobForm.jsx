import { useForm } from 'react-hook-form';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { ChevronDown } from 'lucide-react';
import axios from 'axios';

export default function CreateJobForm({ onSubmitSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm();

  const values = watch();

  const isValidSalary = () => {
  const min = Number(values.salaryMin);
  const max = Number(values.salaryMax);
  return Number.isFinite(min) && Number.isFinite(max) && min < max;
};

  const sendJobData = async (data, status) => {
    if (!isValidSalary()) {
      throw new Error("Invalid salary range");
    }

    const payload = {
      title: data.title,
      companyName: data.company,
      location: data.location,
      jobType: data.jobType,
      salaryFrom: data.salaryMin,
      salaryTo: data.salaryMax,
      description: data.description,
      applicationDeadline: data.deadline,
      requirements: "To be added",
      responsibilities: "To be added",
      status: status,
    };

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/jobs`, payload);
    return response.data;
  };

  const onSubmit = async (data) => {
    try {
      const newJob = await sendJobData(data, 'published');
      showNotification({
        title: '🎉 Job Published!',
        message: 'Your job was successfully posted.',
        color: 'green',
        icon: <IconCheck />,
        autoClose: 3000,
      });

      if (onSubmitSuccess) {
        onSubmitSuccess(newJob);
      }
    } catch (error) {
      showNotification({
        title: 'Error ❌',
        message: error.message || 'Something went wrong.',
        color: 'red',
        icon: <IconX />,
      });
    }
  };

  const onSaveDraft = async () => {
    const data = getValues();
    try {
      const newJob = await sendJobData(data, 'draft');
      showNotification({
        title: 'Draft Saved 💾',
        message: 'Your draft has been saved successfully.',
        color: 'blue',
        icon: <IconCheck />,
      });

      if (onSubmitSuccess) {
        onSubmitSuccess(newJob);
      }
    } catch (error) {
      showNotification({
        title: 'Error ❌',
        message: error.message || 'Something went wrong.',
        color: 'red',
        icon: <IconX />,
      });
    }
  };

  const isFilled = (field) =>
    values[field] && values[field].toString().trim() !== '';

  const inputClass = (field) =>
    `w-full border rounded-md px-3 py-2 text-sm transition-all duration-150 
    ${isFilled(field) ? 'border-black font-semibold text-black' : 'border-gray-300 font-normal text-gray-700'} 
    focus:outline-none focus:ring-0 focus:border-black`;

  const selectClass = (field) =>
    `w-full rounded-md px-3 py-2 text-sm pr-8 bg-white appearance-none
   ${isFilled(field) ? 'border-black font-medium text-black' : 'border-gray-300 font-normal text-gray-400'}
   focus:outline-none focus:ring-0 focus:border-gray-400 focus:text-gray-700`;

  return (
    <div className="font-inter">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="font-inter w-full max-w-3xl mx-auto bg-transparent p-6 rounded-xl"
      >
        <h2 className="text-center text-lg font-semibold mb-6">
          Create Job Opening
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              placeholder="Full Stack Developer"
              className="w-full border border-black rounded-md px-3 py-2 text-sm text-black font-semibold focus:outline-none focus:ring-0"
              {...register('title', { required: 'Job title is required' })}
            />
            <p className="text-red-500 text-xs mt-1">{errors.title?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              placeholder="Amazon, Microsoft, Swiggy"
              className={inputClass('company')}
              {...register('company', { required: 'Company name is required' })}
            />
            <p className="text-red-500 text-xs mt-1">{errors.company?.message}</p>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <select
              defaultValue=""
              className={selectClass('location')}
              {...register('location', { required: 'Location is required' })}
            >
              <option value="" disabled hidden>Choose Preferred Location</option>
              <option value="Remote">Remote</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Chennai">Chennai</option>
            </select>
            <p className="text-red-500 text-xs mt-1">{errors.location?.message}</p>
            <ChevronDown className="absolute right-3 top-[34px] h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Type
            </label>
            <select
              defaultValue=""
              className={selectClass('jobType')}
              {...register('jobType', { required: 'Job type is required' })}
            >
              <option value="" disabled hidden>Full Time</option>
              <option value="FullTime">Full Time</option>
              <option value="PartTime">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
            <p className="text-red-500 text-xs mt-1">{errors.jobType?.message}</p>
            <ChevronDown className="absolute right-3 top-[34px] h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Salary Range
            </label>
            <div className="flex gap-2">
              <div className="relative w-full">
                <span className="absolute left-2 top-1/2 -translate-y-[65%] text-gray-400 text-sm">⇅</span>
                <input
                  type="text"
                  placeholder="₹0"
                  className="pl-7 w-full border rounded-md py-2 text-sm text-gray-700"
                  {...register('salaryMin', { required: 'Minimum salary is required' })}
                />
              </div>
              <div className="relative w-full">
                <span className="absolute left-2 top-1/2 -translate-y-[65%] text-gray-400 text-sm">⇅</span>
                <input
                  type="text"
                  placeholder="₹12,00,000"
                  className="pl-7 w-full border rounded-md py-2 text-sm text-gray-700"
                  {...register('salaryMax', { required: 'Maximum salary is required' })}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Application Deadline
            </label>
            <input
              type="date"
              className={`${inputClass('deadline')} text-transparent caret-black`}
              {...register('deadline', { required: 'Deadline is required' })}
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Description
          </label>
          <textarea
            placeholder="Please share a description to let the candidate know more about the job role"
            className={`w-full border rounded-md px-3 py-2 text-sm h-36 focus:outline-none focus:ring-1 focus:ring-black focus:border-black resize ${
              isFilled('description') ? 'border-black font-medium' : 'border-gray-300 font-normal'
            }`}
            {...register('description', { required: 'Description is required' })}
          />
          <p className="text-red-500 text-xs mt-1">{errors.description?.message}</p>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={onSaveDraft}
            className="w-[170px] py-2 border-2 border-black rounded-lg bg-white text-black text-sm font-medium shadow-sm flex items-center justify-center gap-1 hover:bg-gray-50 transition"
          >
            <span>Save Draft</span>
            <span className="inline-block transform rotate-90 text-base leading-none">&raquo;</span>
          </button>

          <button
            type="submit"
            className="w-[170px] py-2 border border-transparent rounded-lg bg-[#00AAFF] text-white text-sm font-medium shadow-sm flex items-center justify-center gap-1 hover:bg-[#0095dd] transition"
          >
            <span>Publish</span>
            <span className="text-base leading-none">&raquo;</span>
          </button>
        </div>
      </form>
    </div>
  );
}