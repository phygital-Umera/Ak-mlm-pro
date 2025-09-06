import React from 'react';
import {Facebook, Twitter, Youtube, Linkedin, Instagram} from 'lucide-react';
import logoWhite from '../../assets/images/logo/tmslogo.png';

const FooterSection: React.FC = () => {
  return (
    <footer className="text-gray-300 bg-[#2E363A]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Footer Row */}
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* Column 1: Logo & Services */}
          <div className="md:w-1/3">
            <a href="#" className="mb-4 inline-block">
              <h1 className="text-2xl font-bold text-[#289dd8]">SJC Group</h1>
            </a>
            <ul className="space-y-2 text-sm text-[#E5E5E5]">
              {[
                {label: 'Financial Planning', href: '#'},
                {label: 'Insurance Consulting', href: '#'},
                {label: 'Investments Management', href: '#'},
                {
                  label: 'Retirement Strategies',
                  href: 'Document/Retirement%20Strategies.pdf',
                  download: true,
                },
                {label: 'Taxes Planning', href: '#'},
                {label: 'Business Loan', href: '#'},
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    {...(item.download ? {download: true} : {})}
                    className="transition-colors duration-300 hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Contact Info */}
          <div className="md:w-1/3">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Contact Us
            </h3>
            <div className="space-y-2 border-l-4 border-blue-500 pl-4 text-sm">
              <p className="text-[#AAAAAA]">Address: India</p>
              <p className="text-[#AAAAAA]">Phone: (+91) 87677 85461</p>
              <p className="text-[#AAAAAA]">Email: npspension@gmail.com</p>
            </div>
          </div>

          {/* Column 3: Social Links */}
          <div className="md:w-1/3">
            <h3 className="mb-4 text-lg font-semibold text-white">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-600">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-sky-400">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-pink-500">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-red-600">
                <Youtube size={20} />
              </a>
              <a href="#" className="hover:text-blue-500">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-gray-700 mt-12 border-t pt-6 text-center">
          <p className="mb-4 text-sm text-[#AAAAAA]">
            Copyright © 2025. All rights reserved.
          </p>
          <ul className="flex flex-wrap justify-center gap-6 text-sm">
            <li>
              <a href="about.html" className="text-[#E5E5E5] hover:text-white">
                About
              </a>
            </li>
            <li>
              <a
                href="contact.html"
                className="text-[#E5E5E5] hover:text-white"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="text-[#E5E5E5] hover:text-white">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="text-[#E5E5E5] hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-[#E5E5E5] hover:text-white">
                Site Map
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
