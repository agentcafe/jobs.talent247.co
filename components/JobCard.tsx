import Image from 'next/image'; // Use Next.js Image for optimization
import { Job } from '@/lib/jobs'; // Adjust path if needed

interface JobCardProps {
  job: Job;
  onApplyClick: (jobId: string) => void;
  showApplyButton: boolean;
}

// Helper to calculate time ago
const timeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000; // years
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000; // months
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400; // days
    if (interval >= 1) return Math.floor(interval) + "d ago";
     interval = seconds / 3600; // hours
    if (interval >= 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60; // minutes
    if (interval >= 1) return Math.floor(interval) + "m ago";
    return "Just now";
};

export default function JobCard({ job, onApplyClick, showApplyButton }: JobCardProps) {
  const posted = timeAgo(job.postedDate);

  return (
    <article className={`border border-gray-200 rounded-lg p-5 mb-4 shadow-sm hover:shadow-lg transition-all duration-200 ease-in-out bg-white flex flex-col sm:flex-row items-start space-x-0 sm:space-x-5 ${job.isFeatured ? 'border-l-4 border-blue-500' : ''}`}>
      {/* Logo */}
      <div className="flex-shrink-0 mb-3 sm:mb-0">
        {job.logoUrl ? (
          <Image
            src={job.logoUrl}
            alt={`${job.company} logo`}
            width={50}
            height={50}
            className="rounded-full object-contain border border-gray-100"
          />
        ) : (
          <div className="w-[50px] h-[50px] bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-lg font-semibold">
            {job.company.charAt(0)}
          </div>
        )}
      </div>

      {/* Job Details */}
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
          <h2 className="text-lg font-semibold text-blue-700 hover:underline mb-1 sm:mb-0">
            {/* Replace # with actual job link later */}
            <a href="#">{job.title}</a>
          </h2>
           <span className="text-xs text-gray-500 mt-1 sm:mt-0">{posted}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-3 flex-wrap">
          <span className="font-medium mr-2">{job.company}</span>
          <span className="text-gray-400 mr-2">•</span>
          <span className="mr-2">{job.location}</span>
           {job.salary && (
             <>
                <span className="text-gray-400 mr-2">•</span>
                <span className="text-green-700">{job.salary}</span>
             </>
           )}
        </div>

        <p className="text-sm text-gray-700 mb-3 leading-relaxed line-clamp-2">{job.description}</p>

        <div className="flex flex-wrap items-center gap-2">
           <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-semibold">
             {job.industry}
           </span>
           <span className="inline-block bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-xs font-semibold">
             {job.type}
           </span>
           {job.isFeatured && (
             <span className="inline-block bg-yellow-100 text-yellow-800 rounded-full px-3 py-1 text-xs font-semibold">
                Featured ✨
             </span>
           )}
        </div>
      </div>

      {/* Apply Button */}
      {showApplyButton && (
        <div className="mt-4 sm:mt-0 sm:ml-auto flex-shrink-0 self-center sm:self-start">
          <button
            onClick={() => onApplyClick(job.id)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-md transition duration-150 ease-in-out text-sm shadow-sm hover:shadow-md"
          >
            Apply
          </button>
        </div>
      )}
    </article>
  );
} 