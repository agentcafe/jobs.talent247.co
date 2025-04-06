import { Job } from '@/lib/jobs'; // Adjust path if needed

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

export default function Filters({ industries, locations, jobTypes, selectedFilters, onFilterChange }: FiltersProps) {
  const renderSelect = (label: string, key: keyof FiltersProps['selectedFilters'], options: string[]) => (
    <div className="mb-5">
      <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        id={key}
        name={key}
        value={selectedFilters[key]}
        onChange={(e) => onFilterChange(key, e.target.value)}
        // Added appearance-none for custom arrow potential, requires background image in CSS/Tailwind config for arrow
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
      >
        <option value="">All {label}s</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );

  return (
    <aside className="w-full md:w-1/4 lg:w-1/5 md:pr-6 lg:pr-8">
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2 text-gray-800">Refine Search</h3>
        {renderSelect('Industry', 'industry', industries)}
        {renderSelect('Location', 'location', locations)}
        {renderSelect('Job Type', 'type', jobTypes)}
      </div>
    </aside>
  );
} 