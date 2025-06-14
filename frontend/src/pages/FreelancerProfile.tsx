import { FiStar, FiBriefcase, FiAward, FiMapPin, FiClock, FiDollarSign, FiMail, FiLinkedin, FiGithub } from 'react-icons/fi';

type Skill = {
  name: string;
  level: number;
};

type Experience = {
  role: string;
  company: string;
  duration: string;
  description: string;
};

type Review = {
  author: string;
  rating: number;
  comment: string;
  date: string;
};

const FreelancerProfilePage = () => {
  const freelancer = {
    name: 'Alex Johnson',
    title: 'Senior Full Stack Developer',
    location: 'San Francisco, CA',
    rate: '$80/hr',
    availability: 'Full-time',
    rating: 4.8,
    reviewsCount: 42,
    description: 'Experienced full stack developer with 8+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud architecture.',
    skills: [
      { name: 'React', level: 5 },
      { name: 'Node.js', level: 5 },
      { name: 'TypeScript', level: 4 },
      { name: 'AWS', level: 4 },
      { name: 'GraphQL', level: 4 },
      { name: 'MongoDB', level: 3 },
    ],
    experience: [
      {
        role: 'Lead Developer',
        company: 'TechSolutions Inc.',
        duration: '2019 - Present',
        description: 'Led a team of 5 developers to build a SaaS platform with over 10,000 active users.'
      },
      {
        role: 'Senior Frontend Developer',
        company: 'WebCraft Studios',
        duration: '2016 - 2019',
        description: 'Developed complex frontend applications using React and Redux.'
      }
    ],
    portfolio: [
      {
        title: 'E-commerce Platform',
        description: 'Built a scalable e-commerce platform with React and Node.js'
      },
      {
        title: 'Task Management App',
        description: 'Created a collaborative task management application with real-time updates'
      }
    ],
    reviews: [
      {
        author: 'Sarah Miller',
        rating: 5,
        comment: 'Alex delivered exceptional work on our project. His attention to detail and problem-solving skills are outstanding.',
        date: '2 months ago'
      },
      {
        author: 'Michael Chen',
        rating: 4,
        comment: 'Great communication and technical skills. Would definitely work with again.',
        date: '4 months ago'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-indigo-600">WorkFinder</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-indigo-600">Jobs</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600">Freelancers</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600">Messages</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600">Profile</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-400">
                {freelancer.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{freelancer.name}</h2>
                  <p className="text-lg text-gray-600">{freelancer.title}</p>
                </div>
                <div className="flex items-center bg-indigo-50 px-3 py-1 rounded-full">
                  <FiStar className="text-yellow-500 mr-1" />
                  <span className="font-medium">{freelancer.rating}</span>
                  <span className="text-gray-500 ml-1">({freelancer.reviewsCount})</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-gray-600">
                <div className="flex items-center">
                  <FiMapPin className="mr-1" />
                  {freelancer.location}
                </div>
                <div className="flex items-center">
                  <FiDollarSign className="mr-1" />
                  {freelancer.rate}
                </div>
                <div className="flex items-center">
                  <FiClock className="mr-1" />
                  {freelancer.availability}
                </div>
              </div>

              <p className="mt-4 text-gray-700">{freelancer.description}</p>

              <div className="mt-6 flex space-x-3">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  Hire Me
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Skills</h3>
              <div className="space-y-3">
                {freelancer.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-gray-500">{skill.level}/5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-indigo-600 h-2.5 rounded-full" 
                        style={{ width: `${skill.level * 20}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Work Experience</h3>
              <div className="space-y-6">
                {freelancer.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-indigo-200 pl-4">
                    <h4 className="text-lg font-medium">{exp.role}</h4>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-gray-500 text-sm mt-1">{exp.duration}</p>
                    <p className="mt-2 text-gray-700">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Client Reviews</h3>
              <div className="space-y-6">
                {freelancer.reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{review.author}</h4>
                      <div className="flex items-center">
                        <FiStar className="text-yellow-500 mr-1" />
                        <span>{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">{review.date}</p>
                    <p className="mt-2 text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Contact */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  <FiMail className="mr-2" />
                  Send Email
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  <FiLinkedin className="mr-2" />
                  LinkedIn
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  <FiGithub className="mr-2" />
                  GitHub
                </button>
              </div>
            </div>

            {/* Portfolio */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Portfolio Projects</h3>
              <div className="space-y-4">
                {freelancer.portfolio.map((project, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300">
                    <h4 className="font-medium">{project.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Certifications</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FiAward className="text-indigo-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">AWS Certified Developer</h4>
                    <p className="text-gray-600 text-sm">Amazon Web Services - 2021</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FiAward className="text-indigo-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">React Certified Developer</h4>
                    <p className="text-gray-600 text-sm">React Training - 2020</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FreelancerProfilePage;