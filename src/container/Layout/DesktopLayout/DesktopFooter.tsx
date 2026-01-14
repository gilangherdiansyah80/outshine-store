import { Link } from "react-router-dom";

const DesktopFooter = () => {
  return (
    <footer className="bg-[#0A2665] text-white pt-16 pb-8 font-[Poppins,sans-serif]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:w-1/3">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-lg">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <span className="text-xl font-bold">Outshine Store</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed pr-8 max-w-sm">
              Platform Software House & SaaS untuk membantu Anda membangun
              website, aplikasi, dan sistem bisnis dengan cepat, modern, dan
              terukur.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex gap-20">
            {/* Platform Column */}
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold text-lg">Platform</h4>
              <Link
                to="#"
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                Pricing
              </Link>
              <Link
                to="#"
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                Features
              </Link>
              <Link
                to="#"
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                Templates
              </Link>
              <Link
                to="#"
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                Integrations
              </Link>
            </div>

            {/* Support Column */}
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold text-lg">Support</h4>
              <Link
                to="#"
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                Help Center
              </Link>
              <Link
                to="#"
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                Terms of Service
              </Link>
              <Link
                to="#"
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 Outshine Store Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              to="#"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Twitter
            </Link>
            <Link
              to="#"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              LinkedIn
            </Link>
            <Link
              to="#"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DesktopFooter;
