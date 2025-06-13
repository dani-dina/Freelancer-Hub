import { useState } from 'react';
import { 
  FiHome, 
  FiBriefcase, 
  FiUsers, 
  FiMessageSquare, 
  FiBell, 
  FiUser, 
  FiSearch,
  FiMenu,
  FiX
} from 'react-icons/fi';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const user = {
    name: 'John Doe',
    avatar: 'JD',
    role: 'Client'
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and main nav (left side) */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-indigo-600">WorkFinder</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <a
                href="#"
                className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                <FiHome className="mr-1" />
                Home
              </a>
              <a
                href="#"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                <FiBriefcase className="mr-1" />
                Jobs
              </a>
              <a
                href="#"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                <FiUsers className="mr-1" />
                Freelancers
              </a>
              <a
                href="#"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                <FiMessageSquare className="mr-1" />
                Messages
              </a>
            </div>
          </div>

          {/* Search and user nav (right side) */}
          <div className="flex items-center">
            {/* Search button (mobile) */}
            <button
              className="md:hidden p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <FiSearch size={20} />
            </button>

            {/* Search input (desktop) */}
            <div className="hidden md:block relative mx-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                placeholder="Search jobs or freelancers"
              />
            </div>

            {/* Notifications */}
            <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none relative">
              <FiBell size={20} />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            </button>

            {/* User dropdown */}
            <div className="ml-4 relative">
              <button
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                  {user.avatar}
                </div>
                <span className="hidden md:inline ml-2 text-gray-700">{user.name}</span>
              </button>

              {/* Dropdown menu */}
              {userDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          {/* Mobile search */}
          {searchOpen && (
            <div className="px-4 pt-2 pb-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="Search jobs or freelancers"
                />
              </div>
            </div>
          )}

          <div className="pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              <FiHome className="inline mr-2" />
              Home
            </a>
            <a
              href="#"
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              <FiBriefcase className="inline mr-2" />
              Jobs
            </a>
            <a
              href="#"
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              <FiUsers className="inline mr-2" />
              Freelancers
            </a>
            <a
              href="#"
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              <FiMessageSquare className="inline mr-2" />
              Messages
            </a>
          </div>

          {/* Mobile user menu */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                  {user.avatar}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user.name}</div>
                <div className="text-sm font-medium text-gray-500">{user.role}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <a
                href="#"
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Your Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;