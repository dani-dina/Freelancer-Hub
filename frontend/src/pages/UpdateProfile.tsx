import { useState } from 'react';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiBriefcase, 
  FiDollarSign,
  FiGlobe,
  FiSave,
  FiEdit2,
  FiUpload,
  FiX
} from 'react-icons/fi';

const UpdateProfilePage = () => {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    title: 'Senior Full Stack Developer',
    rate: 85,
    bio: 'Experienced developer with 8+ years building web applications. Specialized in React, Node.js, and cloud architecture.',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'GraphQL'],
    website: 'https://johndoe.dev',
    newSkill: ''
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleAddSkill = () => {
    if (profile.newSkill.trim() && !profile.skills.includes(profile.newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, profile.newSkill.trim()],
        newSkill: ''
      });
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    console.log('Profile updated:', profile);
    if (resumeFile) {
      console.log('Resume uploaded:', resumeFile.name);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl text-gray-400">
                      {profile.firstName[0]}{profile.lastName[0]}
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700">
                  <FiUpload size={16} />
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-gray-800">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-gray-600">{profile.title}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                  {profile.skills.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                      +{profile.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center px-4 py-2 rounded-md ${isEditing ? 'bg-gray-100 text-gray-800' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                >
                  {isEditing ? (
                    <>
                      <FiX className="mr-2" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <FiEdit2 className="mr-2" />
                      Edit Profile
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('personal')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'personal' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Personal Info
              </button>
              <button
                onClick={() => setActiveTab('professional')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'professional' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Professional Info
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'security' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Security
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'documents' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Documents
              </button>
            </nav>
          </div>
          {activeTab === 'personal' && (
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={profile.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMapPin className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={profile.location}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiGlobe className="text-gray-400" />
                    </div>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={profile.website}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
                  >
                    <FiSave className="mr-2" />
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          )}

          {/* Professional Info Tab */}
          {activeTab === 'professional' && (
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Professional Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={profile.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label htmlFor="rate" className="block text-sm font-medium text-gray-700 mb-1">
                    Hourly Rate ($)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiDollarSign className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="rate"
                      name="rate"
                      value={profile.rate}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Bio *
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={profile.bio}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    disabled={!isEditing}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skills *
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {profile.skills.map((skill, index) => (
                      <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                        <span className="text-sm">{skill}</span>
                        {isEditing && (
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-1 text-gray-500 hover:text-gray-700"
                          >
                            <FiX size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex">
                      <input
                        type="text"
                        value={profile.newSkill}
                        onChange={(e) => setProfile({...profile, newSkill: e.target.value})}
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Add a skill"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                      />
                      <button
                        type="button"
                        onClick={handleAddSkill}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700"
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
                  >
                    <FiSave className="mr-2" />
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          )}

          {/* Security Tabs */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Update your password associated with your account.
                  </p>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="current-password"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="new-password"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirm-password"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Add additional security to your account using two-factor authentication.
                  </p>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Enable Two-Factor Authentication
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900">Sessions</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage and log out your active sessions on other browsers and devices.
                  </p>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Log Out All Other Sessions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Resume</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Upload your resume to help clients learn more about your experience
                  </p>
                  <div className="mt-4">
                    {resumeFile ? (
                      <div className="flex items-center justify-between p-3 border border-gray-300 rounded-md">
                        <div className="flex items-center">
                          <FiBriefcase className="flex-shrink-0 h-5 w-5 text-gray-400" />
                          <span className="ml-2 text-sm font-medium text-gray-700">
                            {resumeFile.name}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setResumeFile(null)}
                          className="ml-1 text-gray-400 hover:text-gray-500"
                        >
                          <FiX size={18} />
                        </button>
                      </div>
                    ) : (
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="resume-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="resume-upload"
                                name="resume-upload"
                                type="file"
                                className="sr-only"
                                onChange={handleResumeUpload}
                                accept=".pdf,.doc,.docx"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PDF, DOC, DOCX up to 10MB
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900">Portfolio</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Showcase your best work to attract potential clients.
                  </p>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add Portfolio Items
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UpdateProfilePage;