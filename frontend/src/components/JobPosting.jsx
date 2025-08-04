import { IconUserPlus, IconBuilding, IconStack2 } from '@tabler/icons-react';
import { formatDistanceToNow } from 'date-fns';



function JobPosting({
  logo,
  role,
  location = 'Remote',
  jobType = 'Full-time',
  salaryMin = 0,
  salaryMax = 0,
  description,
  isDraft = false,
  createdAt,
}) {
  // console.log("JobPosting Props:", {
  //   logo,
  //   role,
  //   location,
  //   jobType,
  //   salaryMin,
  //   salaryMax,
  //   description,
  //   isDraft,
  //   createdAt,
  // });

  const DEFAULT_LOGO = "https://cdn-icons-png.flaticon.com/512/1077/1077114.png";
  const formattedTime = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <div className="bg-white rounded-xl shadow-md w-[270px] min-h-[250px] relative flex flex-col mb-2 justify-between px-3 pt-4 pb-3 hover:shadow-lg transition font-sans">
      
      {/* Badge */}
      <div
        className={`absolute top-3 right-3 px-2 py-0.5 rounded-md text-xs font-semibold 
        ${isDraft ? 'bg-yellow-300 text-black' : 'bg-[#B0D9FF] text-black'}`}
      >
        {isDraft ? 'Draft' : formattedTime}
      </div>

      {/* Logo + Title */}
      <div className="flex flex-col items-start gap-2 mb-2">
        <img
          src={logo || DEFAULT_LOGO}
          alt="Company Logo"
          className="w-10 h-10 object-contain rounded-md -ml-1"
        />
        <h2 className="text-[14px] font-semibold text-gray-900 leading-tight">{role}</h2>
      </div>

      {/* Info Block (vertical stacked) */}
      <div className="flex flex-col gap-1 text-[12px] text-gray-600 mb-2">
        <div className="flex items-center gap-1">
          <IconUserPlus size={14} />
          <span>1-3 yr Exp</span>
        </div>
        <div className="flex items-center gap-1">
          <IconBuilding size={14} />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1">
          <IconStack2 size={14} />
          <span>₹{salaryMin} - ₹{salaryMax}</span>
        </div>
      </div>

      <p className="text-[12px] text-gray-600 leading-snug mb-2">
  {description}
</p>


      {/* Button */}
      <button
        disabled={isDraft}
        className={`w-full py-1 text-[13px] font-medium rounded-md transition ${
          isDraft
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
            : 'bg-[#00AAFF] text-white hover:bg-[#0099e6]'
        }`}
      >
        {isDraft ? 'Draft Only' : 'Apply Now'}
      </button>
    </div>
  );
}

export default JobPosting;
