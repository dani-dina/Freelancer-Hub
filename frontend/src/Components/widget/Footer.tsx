import { 
  FiFacebook, 
  FiTwitter, 
  FiLinkedin, 
  FiInstagram, 
  FiGithub,
  FiMail,
  FiPhone,
  FiMapPin
} from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="bg-indigo-600 rounded-md px-2 py-1 mr-2">WF</span>
              WorkFinder
            </h3>
            <p className="text-gray-400 mb-4">
              Connecting businesses with top freelance talent worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiGithub size={20} />
              </a>
            </div>
          </div>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              For Clients
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  How to Hire
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Talent Marketplace
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Project Catalog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Hire an Agency
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Enterprise Solutions
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              For Freelancers
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  How to Find Work
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Direct Contracts
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Find Freelance Jobs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Resources
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Freelancer Plus
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiMapPin className="mt-1 mr-3 flex-shrink-0 text-indigo-400" />
                <span className="text-gray-400">
                  123 Business Ave, Suite 500<br />
                  San Francisco, CA 94107
                </span>
              </li>
              <li className="flex items-center">
                <FiMail className="mr-3 flex-shrink-0 text-indigo-400" />
                <a href="mailto:contact@workfinder.com" className="text-gray-400 hover:text-white transition">
                  contact@workfinder.com
                </a>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-3 flex-shrink-0 text-indigo-400" />
                <a href="tel:+18005551234" className="text-gray-400 hover:text-white transition">
                  (800) 555-1234
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 mb-8 border-t border-gray-700 pt-8">
          <div className="max-w-xl mx-auto text-center">
            <h4 className="text-lg font-semibold mb-2">Subscribe to our newsletter</h4>
            <p className="text-gray-400 mb-4">
              Get the latest updates, news and product offers
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/*  Bar */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} WorkFinder. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition">
              Cookies Setting
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;