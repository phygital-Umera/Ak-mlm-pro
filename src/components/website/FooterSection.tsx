import React, {useState} from 'react';
import {Mail, Phone, Instagram, Facebook, Twitter, Youtube} from 'lucide-react';
import logo from '../../assets/images/logo/tmslogo.png';

const FooterSection: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribing email:', email);
    // Handle subscription logic here
    setEmail('');
  };

  return (
    <footer className="bg-white">
      {/* Newsletter Section */}
      {/* <div className="bg-gray-50 py-12">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <div className="mb-4">
            <Mail className="mx-auto mb-4 h-12 w-12 text-green-600" />
          </div>
          <h2 className="mb-2 text-3xl font-bold text-blue-600">
            Get The Latest Updates.
          </h2>
          <p className="text-gray-600 mb-6">
            Signup for offers & exclusive discounts.
          </p>

          <form onSubmit={handleSubscribe} className="mx-auto flex max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border-gray-300 flex-1 rounded-l-md border px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 rounded-r-md px-6 py-3 text-white bg-blue-600 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div> */}

      {/* Visit Old Website Button */}
      <div className="fixed right-4 top-4 z-50">
        {/* <button className="rounded-md bg-green-600 px-4 py-2 text-sm text-white transition-colors hover:bg-green-700">
            Visit Vestige
            <br />
            Old Website
          </button> */}
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Logo and Info */}
          <div className="md:col-span-1">
            <div className="mb-6 flex items-center">
              <img src={logo} alt="Logo" className="h-12 w-12" />
            </div>
            <h2 className="text-sm font-bold">TMS LIFE SOLUTION (OPC) PVT LTD</h2>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-blue-600">
              Company
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>
                <a href="#" className="transition-colors hover:text-blue-600">
                  About Vestige
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-600">
                  Career
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-600">
                  Grievance Redressal
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-600">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-600">
                  Notification History
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-600">
                  Vestige Branches
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-600">
                  Vestige Heart To Heart
                </a>
              </li>
            </ul>
          </div>

          {/* Policy Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-blue-600">Policy</h3>
            <ul className="text-gray-600 space-y-2">
              <li>
                <a href="#" className="transition-colors hover:text-blue-600">
                  Cancellation & Refund Process
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-600">
                  Delivery Area
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-600">
                  Disclaimer
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-600">
                  Privacy And Security Policy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-600">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-600">
                  T&C
                </a>
              </li>
            </ul>
          </div>

          {/* Corporate Office & Customer Care */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-blue-600">
              Our Corporate Office
            </h3>
            <div className="text-gray-600 mb-6">
              <p>Vestige Marketing Pvt. Ltd. A-89,</p>
              <p>Okhla Industrial Area Phase II New</p>
              <p>Delhi 110020</p>
            </div>

            <h3 className="mb-4 text-lg font-semibold text-blue-600">
              Customer Care
            </h3>
            <div className="text-gray-600 mb-4">
              <p className="mb-1 flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                Phone: 011- 43101234
              </p>
              <p>All India Toll Free No.: 18001024624</p>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-3">
              <a href="#" className="text-pink-500 hover:text-pink-600">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-700">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-500">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-red-600 hover:text-red-700">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Payment Partners */}
        {/* <div className="border-gray-200 mt-12 border-t pt-8">
          <div className="flex flex-wrap items-center justify-between">
            <div className="mb-4 md:mb-0">
              <span className="text-gray-600 mr-4 font-medium">
                Payment Partners
              </span>
              <div className="inline-flex space-x-2">
                <div className="flex h-8 w-12 items-center justify-center rounded bg-blue-600">
                  <span className="text-xs font-bold text-white">VISA</span>
                </div>
                <div className="flex h-8 w-12 items-center justify-center rounded bg-red-500">
                  <span className="text-xs font-bold text-white">MC</span>
                </div>
                <div className="flex h-8 w-12 items-center justify-center rounded bg-blue-500">
                  <span className="text-xs font-bold text-white">M</span>
                </div>
                <div className="flex h-8 w-12 items-center justify-center rounded bg-blue-400">
                  <span className="text-xs font-bold text-white">AE</span>
                </div>
              </div>
            </div>

            Certifications
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5, 6].map((cert) => (
                <div
                  key={cert}
                  className="bg-gray-100 flex h-12 w-12 items-center justify-center rounded-full border"
                >
                  <span className="text-gray-500 text-xs">ISO</span>
                </div>
              ))}
            </div>
          </div>
        </div> */}

        {/* App Download Section */}
        {/* <div className="border-gray-200 mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 md:mb-0">
              <span className="text-gray-600 mr-4 font-medium">
                Install App
              </span>
            </div>
            <div className="flex space-x-4">
              <button className="hover:bg-gray-800 flex items-center rounded-md bg-black px-4 py-2 text-white transition-colors">
                <div className="mr-2">
                  <div className="h-6 w-6 rounded bg-green-500"></div>
                </div>
                <div className="text-left">
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </button>
              <button className="hover:bg-gray-800 flex items-center rounded-md bg-black px-4 py-2 text-white transition-colors">
                <div className="mr-2">
                  <div className="h-6 w-6 rounded bg-white"></div>
                </div>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </button>
            </div>
          </div>
        </div> */}
      </div>

      {/* Copyright */}
      <div className="bg-gray-50 py-4">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="text-gray-600 text-sm">
            Copyright © 2025 Vestige Marketing Private Limited | All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
