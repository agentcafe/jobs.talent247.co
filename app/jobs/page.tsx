'use client'; // Required for useState and event handlers

import { useState, useMemo } from 'react';
// Import everything needed from lib/jobs.ts
import { Job, dummyJobs, getIndustries, getLocations, getJobTypes } from '@/lib/jobs';

// Import new components
import Header from '@/components/Header'; // Adjust path if components are elsewhere
import Footer from '@/components/Footer'; // Adjust path
import SearchBar from '@/components/SearchBar'; // Adjust path
import Filters from '@/components/Filters'; // Adjust path
import JobCard from '@/components/JobCard'; // Adjust path

// --- Helper Components (SearchBar, Filters, JobCard, ApplicationForm - same as before) ---

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <input
        type="text"
        placeholder="Search by keyword, title, company..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}

interface FiltersProps {
  industries: string[];
  locations: string[];
  jobTypes: string[];
  selectedFilters: {
    industry: string;
    location: string;
    type: string;
  };
  onFilterChange: (filterType: keyof FiltersProps['selectedFilters'], value: string) => void;
}

function Filters({ industries, locations, jobTypes, selectedFilters, onFilterChange }: FiltersProps) {
  const renderSelect = (label: string, key: keyof FiltersProps['selectedFilters'], options: string[]) => (
    <div className="mb-4">
      <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        id={key}
        name={key}
        value={selectedFilters[key]}
        onChange={(e) => onFilterChange(key, e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">All</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );

  return (
    <aside className="w-full md:w-1/4 lg:w-1/5 md:pr-8">
      <h3 className="text-lg font-semibold mb-4 border-b pb-2">Filters</h3>
      {renderSelect('Industry', 'industry', industries)}
      {renderSelect('Location', 'location', locations)}
      {renderSelect('Job Type', 'type', jobTypes)}
    </aside>
  );
}

interface JobCardProps {
  job: Job;
  onApplyClick: (jobId: string) => void;
  showApplyButton: boolean;
}

function JobCard({ job, onApplyClick, showApplyButton }: JobCardProps) {
  // Add a check for potentially undefined date
  const postedDate = job.postedDate ? new Date(job.postedDate) : null;
  const timeAgo = postedDate ? Math.floor((new Date().getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24)) : null; // days ago

  // Add safety checks for potentially missing properties
  const title = job?.title ?? 'N/A';
  const company = job?.company ?? 'N/A';
  const location = job?.location ?? 'N/A';
  const type = job?.jobType ?? 'N/A'; // Use jobType from the interface
  const salary = job?.salary ?? null; // Assuming salary might be optional in Job interface
  const description = job?.description ?? '';
  const industry = job?.industry ?? 'General';

  return (
    <article className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
      <div className="flex flex-col sm:flex-row justify-between sm:items-start">
        <div>
          <h2 className="text-xl font-semibold text-blue-700 hover:underline">
            {/* Link to a potential job detail page - replace # with actual link later */}
            <a href="#">{title}</a>
          </h2>
          <p className="text-gray-700">{company}</p>
          <p className="text-gray-500 text-sm">{location} • {type}</p> {/* Use type */}
          {salary && <p className="text-gray-600 text-sm mt-1">Salary: {salary}</p>}
        </div>
        <div className="mt-2 sm:mt-0 sm:text-right">
           <p className="text-sm text-gray-500 mb-2">
             {/* Handle null timeAgo */}
             {timeAgo !== null ? (timeAgo <= 0 ? 'Posted today' : `Posted ${timeAgo} day${timeAgo > 1 ? 's' : ''} ago`) : 'Date unavailable'}
           </p>
           {showApplyButton && (
             <button
               onClick={() => onApplyClick(job.id)} // Ensure job.id exists
               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
             >
               Apply Now
             </button>
           )}
        </div>
      </div>
      {/* Use safe description */}
      <p className="text-gray-800 mt-3 text-sm">{description.substring(0, 150)}{description.length > 150 ? '...' : ''}</p>
      <div className="mt-2">
        {/* Use safe industry */}
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {industry}
        </span>
      </div>
    </article>
  );
}

interface ApplicationFormProps {
    jobId: string | null;
    onClose: () => void;
}

function ApplicationForm({ jobId, onClose }: ApplicationFormProps) {
    if (!jobId) return null;

    // Add type annotation for 'j'
    const job = dummyJobs.find((j: Job) => j.id === jobId);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Add form submission logic here (e.g., send data to an API)
        alert(`Application submitted for ${job?.title}! (This is a demo)`);
        onClose(); // Close the modal after submission
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 overflow-y-auto h-full w-full z-[60] flex justify-center items-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg p-6 m-4">
                 <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold transition duration-150"
                    aria-label="Close"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">Apply for {job?.title}</h2>
                <p className="text-gray-600 mb-6 text-sm">{job?.company} - {job?.location}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" id="name" name="name" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input type="email" id="email" name="email" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                    </div>
                    <div>
                        <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">Resume/CV</label>
                        <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition duration-150"/>
                    </div>
                     <div>
                        <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">Cover Letter <span className="text-gray-500">(Optional)</span></label>
                        <textarea id="coverLetter" name="coverLetter" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"></textarea>
                    </div>
                    <div className="flex justify-end space-x-3 pt-3">
                         <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-150 text-sm font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 text-sm font-medium shadow-sm hover:shadow-md"
                        >
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


// --- Main Page Component ---

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    industry: '',
    location: '',
    type: '',
  });
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);

  // Memoize derived data
  const industries = useMemo(() => getIndustries(), []);
  const locations = useMemo(() => getLocations(), []);
  const jobTypes = useMemo(() => getJobTypes(), []);

  const featuredJobs = useMemo(() => dummyJobs.filter(job => job.isFeatured), []);

  const handleFilterChange = (filterType: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleApplyClick = (jobId: string) => {
    setApplyingJobId(jobId);
    setShowApplicationForm(true);
  };

  const handleCloseForm = () => {
    setShowApplicationForm(false);
    setApplyingJobId(null);
  };

  // Combined filtering logic
  const filteredJobs = useMemo(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return dummyJobs
      .filter(job => {
        if (!job) return false; // Safety check

        const matchesSearch = !searchTerm ||
          job.title?.toLowerCase().includes(lowerSearchTerm) ||
          job.company?.toLowerCase().includes(lowerSearchTerm) ||
          job.description?.toLowerCase().includes(lowerSearchTerm) ||
          job.industry?.toLowerCase().includes(lowerSearchTerm) ||
          job.location?.toLowerCase().includes(lowerSearchTerm);

        const matchesIndustry = !selectedFilters.industry || job.industry === selectedFilters.industry;
        const matchesLocation = !selectedFilters.location || job.location === selectedFilters.location;
        const matchesType = !selectedFilters.type || job.type === selectedFilters.type;

        return matchesSearch && matchesIndustry && matchesLocation && matchesType;
      })
      .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
  }, [searchTerm, selectedFilters]);

  const isSearching = searchTerm || selectedFilters.industry || selectedFilters.location || selectedFilters.type;

  // Related jobs logic (simplified: same industry, not in current results)
  const relatedJobs = useMemo(() => {
    if (!isSearching || filteredJobs.length === 0) return [];
    const primaryIndustry = filteredJobs[0]?.industry;
    if (!primaryIndustry) return [];
    const resultIds = new Set(filteredJobs.map(job => job.id));
    return dummyJobs
      .filter(job => job.industry === primaryIndustry && !resultIds.has(job.id))
      .slice(0, 3);
  }, [filteredJobs, isSearching]);

  // Determine which jobs to display (search results or latest)
  const jobsToDisplay = isSearching ? filteredJobs : dummyJobs.slice().sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()).slice(0, 10);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow">
        {/* Hero/Search Section */}
        <section className="bg-gradient-to-br from-gray-100 to-blue-50 py-12 md:py-16 text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Find Your Next Opportunity</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Search thousands of jobs in leading industries from top companies.</p>
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>
        </section>

        {/* Main Content Area */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex flex-col md:flex-row gap-8">

            {/* Filters Sidebar */}
            <Filters
              industries={industries}
              locations={locations}
              jobTypes={jobTypes}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />

            {/* Job Listings & Featured */}
            <div className="w-full md:w-3/4 lg:w-4/5 space-y-8">

              {/* Featured Jobs Section (only show if not searching) */}
              {!isSearching && featuredJobs.length > 0 && (
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">Featured Jobs</h2>
                  <div className="space-y-4">
                    {featuredJobs.map(job => (
                       <JobCard
                          key={`featured-${job.id}`}
                          job={job}
                          onApplyClick={handleApplyClick}
                          showApplyButton={true} // Always show apply for featured
                       />
                    ))}
                  </div>
                  <hr className="my-8 border-gray-200"/>
                </section>
              )}

              {/* Main Job Listings / Search Results */}
              <section>
                 <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    {isSearching ? `Search Results (${filteredJobs.length})` : 'Latest Jobs'}
                 </h2>
                 {jobsToDisplay.length > 0 ? (
                   <div className="space-y-4">
                     {jobsToDisplay.map(job => (
                       job ? <JobCard
                           key={job.id}
                           job={job}
                           onApplyClick={handleApplyClick}
                           showApplyButton={true} // Show apply button always for now
                       /> : null
                     ))}
                   </div>
                 ) : (
                   <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
                     <h3 className="text-xl font-medium text-gray-700">No jobs found</h3>
                     <p className="text-gray-500 mt-2">Try adjusting your search terms or filters.</p>
                   </div>
                 )}
              </section>

              {/* Related Jobs Section */}
              {isSearching && relatedJobs.length > 0 && (
                <section className="pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Related Jobs</h3>
                   <div className="space-y-4">
                     {relatedJobs.map(job => (
                        job ? <JobCard
                            key={`related-${job.id}`}
                            job={job}
                            onApplyClick={handleApplyClick}
                            showApplyButton={true}
                        /> : null
                     ))}
                   </div>
                </section>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <ApplicationForm jobId={applyingJobId} onClose={handleCloseForm} />
      )}

      <Footer />
    </div>
  );
} 