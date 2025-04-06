import Link from 'next/link';

// Simple SVG Icons (replace with actual social icons)
const SocialIconPlaceholder = ({ platform }: { platform: string }) => (
    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-xs text-gray-400">
        {platform.substring(0, 2).toUpperCase()}
    </div>
);

export default function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Note: A real back-to-top button would typically use state
  // and useEffect to only appear after scrolling down.
  // This is a simplified version.

  return (
    <footer className="bg-gray-800 text-gray-300 pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-3">
              Talent<span className="text-blue-400">247</span>
            </h3>
            <p className="text-sm mb-4">Connecting talent with opportunity, 24/7.</p>
            <p className="text-xs">&copy; {new Date().getFullYear()} Talent247. All rights reserved.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition duration-150">About Us</Link></li>
              <li><Link href="/jobs" className="hover:text-white transition duration-150">Browse Jobs</Link></li>
              <li><Link href="/companies" className="hover:text-white transition duration-150">Companies</Link></li>
              <li><Link href="/contact" className="hover:text-white transition duration-150">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition duration-150">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition duration-150">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Stay Updated</h4>
            <form className="flex mb-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-3 py-2 rounded-l-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md text-sm font-medium hover:bg-blue-700 transition duration-150"
              >
                Sign Up
              </button>
            </form>
            <div className="flex space-x-3">
              <a href="#" aria-label="LinkedIn"><SocialIconPlaceholder platform="Li" /></a>
              <a href="#" aria-label="Twitter"><SocialIconPlaceholder platform="Tw" /></a>
              <a href="#" aria-label="Facebook"><SocialIconPlaceholder platform="Fb" /></a>
            </div>
          </div>
        </div>

        {/* Back to Top Button (Simplified) */}
        <div className="text-center mt-8 border-t border-gray-700 pt-6">
          <button
            onClick={handleBackToTop}
            className="text-sm text-gray-400 hover:text-white transition duration-150"
          >
            Back to Top &uarr;
          </button>
        </div>
      </div>
    </footer>
  );
} 