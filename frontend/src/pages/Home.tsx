import { useState } from 'react';
import { FiSearch, FiBriefcase, FiStar, FiTrendingUp, FiUser, FiDollarSign, FiGlobe } from 'react-icons/fi';

type JobCategory = {
  id: number;
  name: string;
  icon: JSX.Element;
  jobsAvailable: number;
};

type JobPost = {
  id: number;
  title: string;
  description: string;
  skills: string[];
  priceRange: string;
  proposals: number;
  postedTime: string;
  isFeatured: boolean;
};

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const categories: JobCategory[] = [
    { id: 1, name: 'Web Development', icon: <FiGlobe className="text-blue-500" />, jobsAvailable: 1245 },
    { id: 2, name: 'Mobile Development', icon: <FiBriefcase className="text-green-500" />, jobsAvailable: 892 },
    { id: 3, name: 'Design & Creative', icon: <FiStar className="text-purple-500" />, jobsAvailable: 1567 },
    { id: 4, name: 'Writing & Translation', icon: <FiUser className="text-yellow-500" />, jobsAvailable: 743 },
    { id: 5, name: 'Digital Marketing', icon: <FiTrendingUp className="text-red-500" />, jobsAvailable: 1102 },
    { id: 6, name: 'Finance & Accounting', icon: <FiDollarSign className="text-indigo-500" />, jobsAvailable: 531 },
  ];

  const featuredJobs: JobPost[] = [
    {
      id: 1,
      title: 'Senior React Developer Needed',
      description: 'We are looking for an experienced React developer to join our team for a 6-month project building a SaaS application.',
      skills: ['React', 'TypeScript', 'Redux', 'Tailwind CSS'],
      priceRange: '$50-$70/hr',
      proposals: 23,
      postedTime: '2 hours ago',
      isFeatured: true
    },
    {
      id: 2,
      title: 'UI/UX Designer for Mobile App',
      description: 'Need a talented designer to create wireframes and high-fidelity mockups for our new fitness tracking app.',
      skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping'],
      priceRange: '$35-$50/hr',
      proposals: 15,
      postedTime: '5 hours ago',
      isFeatured: true
    },
    {
      id: 3,
      title: 'Full Stack Developer (Node + React)',
      description: 'Looking for a full stack developer to help build and maintain our e-commerce platform.',
      skills: ['Node.js', 'React', 'MongoDB', 'AWS'],
      priceRange: '$45-$65/hr',
      proposals: 31,
      postedTime: '1 day ago',
      isFeatured: false
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero sec */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">WorkFinder</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-indigo-600">Browse Jobs</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600">Freelancers</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600">How It Works</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600">Login</a>
              <a href="#" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Sign Up</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main page*/}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Search sec */}
        <section className="text-center py-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Find the perfect freelance services for your business</h2>
          <p className="text-xl text-gray-600 mb-8">Connect with talented freelancers and get your work done</p>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search for jobs or skills"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-4 rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Search
            </button>
          </form>
        </section>

        {/* Categories */}
        <section className="py-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Popular Job Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedCategory === category.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <h4 className="font-medium text-gray-800">{category.name}</h4>
                  <p className="text-sm text-gray-500">{category.jobsAvailable} jobs available</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Jobs */}
        <section className="py-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">Featured Jobs</h3>
            <a href="#" className="text-indigo-600 hover:text-indigo-800">View all jobs</a>
          </div>
          
          <div className="space-y-4">
            {featuredJobs.map((job) => (
              <div key={job.id} className={`p-6 rounded-lg border ${job.isFeatured ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'} hover:shadow-md transition-shadow`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800">{job.title}</h4>
                    <p className="text-gray-600 mt-2">{job.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-indigo-600">{job.priceRange}</p>
                    <p className="text-sm text-gray-500 mt-1">{job.proposals} proposals</p>
                    <p className="text-sm text-gray-500 mt-1">{job.postedTime}</p>
                  </div>
                </div>
                {job.isFeatured && (
                  <div className="mt-4 flex justify-end">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full flex items-center">
                      <FiStar className="mr-1" /> Featured
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA sec */}
        <section className="py-12 bg-indigo-600 rounded-lg text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to get started?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of businesses and freelancers who are already working together.</p>
          <div className="space-x-4">
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100">
              Post a Job
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700">
              Browse Freelancers
            </button>
          </div>
        </section>
      </main>

      {/* Footer page */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">WorkFinder</h4>
              <p className="text-gray-400">Connecting businesses with top freelance talent worldwide.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">For Clients</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">How to Hire</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Talent Marketplace</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Project Catalog</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">For Freelancers</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">How to Find Work</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Direct Contracts</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Find Freelance Jobs</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;