import React from 'react';
import {FaTwitter, FaLinkedinIn, FaGoogle} from 'react-icons/fa';
import logo from '../../assets/images/icon/logo.png';

const SigmaFooter = () => {
  return (
    <footer className="bg-white/95 px-6 py-12 text-slate-700 dark:bg-slate-900 dark:text-slate-200 md:px-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-4">
        {/* Column 1: Logo & Info */}
        <div>
          <img src={logo} alt="Company Logo" className="mb-4 w-28" />
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Empowering the future with innovative and sustainable tech
            solutions.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="#" className="transition-colors hover:text-blue-600">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-blue-600">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-blue-600">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Column 2: Social Media */}
        <div>
          <h4 className="mb-4 text-lg font-semibold">Follow Us</h4>
          <div className="flex items-center gap-4 text-xl">
            <a href="#" className="transition-colors hover:text-blue-500">
              <FaTwitter />
            </a>
            <a href="#" className="transition-colors hover:text-blue-700">
              <FaLinkedinIn />
            </a>
            <a href="#" className="transition-colors hover:text-red-500">
              <FaGoogle />
            </a>
          </div>
        </div>

        {/* Column 3: Products */}
        <div>
          <h4 className="mb-4 text-lg font-semibold">Products</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="transition-colors hover:text-blue-600">
                SIGGMA Water Ionizer
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-blue-600">
                SIGGMA Electric Bicycle
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-blue-600">
                SIGGMA Cycle Specs
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-blue-600">
                SIGGMA Clean Drinking Water
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Support */}
        <div>
          <h4 className="mb-4 text-lg font-semibold">Need Help?</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="transition-colors hover:text-blue-600">
                FAQ
              </a>
            </li>
            <li>
              <a
                href="mailto:help@growmodo.com"
                className="transition-colors hover:text-blue-600"
              >
                help@growmodo.com
              </a>
            </li>
            <li>
              <a
                href="tel:09876543210"
                className="transition-colors hover:text-blue-600"
              >
                0-987-654-3210
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-blue-600">
                Press Inquiries
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-slate-300 pt-6 text-center text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
        © 2021 SIGMA.COM — All Rights Reserved.
      </div>
    </footer>
  );
};

export default SigmaFooter;
