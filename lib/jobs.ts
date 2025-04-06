// lib/jobs.ts

// Define types or functions related to jobs here
// For example:
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  industry: 'AI' | 'Alternative Protein' | 'Fintech' | 'iGaming' | 'Other';
  type: 'Full-time' | 'Part-time' | 'Contract';
  description: string;
  postedDate: string; // ISO 8601 format (YYYY-MM-DD)
  salary?: string; // Optional salary range
  logoUrl?: string; // Optional company logo URL
  isFeatured?: boolean; // Optional flag for featured jobs
}

// Placeholder logo generator
const placeholderLogo = (seed: string, size: number = 40) => `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}&size=${size}&backgroundType=gradientLinear&radius=50`;

export const dummyJobs: Job[] = [
  {
    id: 'ai-1',
    title: 'Machine Learning Engineer',
    company: 'Innovate AI Solutions',
    location: 'San Francisco, CA',
    industry: 'AI',
    type: 'Full-time',
    description: 'Develop cutting-edge machine learning models for various applications. Strong Python and TensorFlow/PyTorch skills required.',
    postedDate: '2024-07-20',
    salary: '$120,000 - $160,000',
    logoUrl: placeholderLogo('Innovate AI'),
    isFeatured: true, // Mark as featured
  },
  {
    id: 'ft-1',
    title: 'Senior Backend Engineer (Payments)',
    company: 'FinSecure Inc.',
    location: 'London, UK',
    industry: 'Fintech',
    type: 'Full-time',
    description: 'Build and maintain scalable backend systems for our payment processing platform. Expertise in Java/Kotlin and microservices.',
    postedDate: '2024-07-22',
    salary: '£80,000 - £100,000',
    logoUrl: placeholderLogo('FinSecure'),
    isFeatured: true, // Mark as featured
  },
  {
    id: 'ap-1',
    title: 'Food Scientist - Plant-Based Meats',
    company: 'GreenBite Foods',
    location: 'New York, NY',
    industry: 'Alternative Protein',
    type: 'Full-time',
    description: 'Lead research and development for new plant-based meat alternatives. Experience in food chemistry and product formulation needed.',
    postedDate: '2024-07-18',
    salary: '$90,000 - $110,000',
    logoUrl: placeholderLogo('GreenBite'),
  },
  {
    id: 'ig-1',
    title: 'Game Developer (Unity)',
    company: 'LuckyStreak Games',
    location: 'Remote',
    industry: 'iGaming',
    type: 'Contract',
    description: 'Develop engaging casino games using the Unity engine. Strong C# skills and experience with mobile game development.',
    postedDate: '2024-07-15',
    logoUrl: placeholderLogo('LuckyStreak'),
  },
   {
    id: 'ai-2',
    title: 'Data Scientist',
    company: 'Cognitive Systems Ltd.',
    location: 'Austin, TX',
    industry: 'AI',
    type: 'Full-time',
    description: 'Analyze large datasets to extract meaningful insights and build predictive models. Proficiency in SQL, Python (Pandas, Scikit-learn).',
    postedDate: '2024-07-21',
     logoUrl: placeholderLogo('Cognitive'),
  },
  {
    id: 'ap-2',
    title: 'Marketing Manager - Alt Protein',
    company: 'Future Farms Co.',
    location: 'Berlin, Germany',
    industry: 'Alternative Protein',
    type: 'Full-time',
    description: 'Develop and execute marketing strategies for our innovative alternative protein products.',
    postedDate: '2024-07-19',
    salary: '€70,000 - €90,000',
    logoUrl: placeholderLogo('Future Farms'),
    isFeatured: true, // Mark as featured
  },
  // ... add logoUrl and isFeatured to other jobs as needed ...
  {
    id: 'ft-2',
    title: 'Frontend Developer (React)',
    company: 'PaySphere',
    location: 'Remote',
    industry: 'Fintech',
    type: 'Full-time',
    description: 'Create intuitive user interfaces for our financial applications using React and TypeScript.',
    postedDate: '2024-07-23',
    logoUrl: placeholderLogo('PaySphere'),
  },
   {
    id: 'ig-2',
    title: 'Compliance Officer',
    company: 'Global Gaming Group',
    location: 'Malta',
    industry: 'iGaming',
    type: 'Full-time',
    description: 'Ensure the company adheres to all relevant gaming regulations and licensing requirements.',
    postedDate: '2024-07-17',
    logoUrl: placeholderLogo('Global Gaming'),
  },
   {
    id: 'ai-3',
    title: 'AI Research Scientist',
    company: 'DeepMind (Google)',
    location: 'Mountain View, CA',
    industry: 'AI',
    type: 'Full-time',
    description: 'Conduct fundamental research in artificial intelligence and machine learning.',
    postedDate: '2024-07-24',
    logoUrl: placeholderLogo('DeepMind'),
  },
  {
    id: 'ft-3',
    title: 'Product Manager - Trading Platform',
    company: 'Quantum Capital',
    location: 'New York, NY',
    industry: 'Fintech',
    type: 'Full-time',
    description: 'Define and manage the product roadmap for our next-generation trading platform.',
    postedDate: '2024-07-16',
    logoUrl: placeholderLogo('Quantum'),
  },
];

export function getIndustries(): string[] {
  // Example implementation
  const industries = new Set(dummyJobs.map(job => job.industry).filter(Boolean));
  return Array.from(industries) as string[];
}

export function getLocations(): string[] {
  // Example implementation
  const locations = new Set(dummyJobs.map(job => job.location));
  return Array.from(locations);
}

export function getJobTypes(): string[] {
  // Example implementation
  const jobTypes = new Set(dummyJobs.map(job => job.type).filter(Boolean));
  return Array.from(jobTypes) as string[];
}

// You can add functions to fetch or manipulate job data
// export async function fetchJobs(): Promise<Job[]> {
//   // Implementation to fetch jobs
//   return [];
// }

console.log("lib/jobs.ts loaded"); // Optional: for debugging purposes 