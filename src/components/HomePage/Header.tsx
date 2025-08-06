import {Link} from '@tanstack/react-router';
import {useState} from 'react';
import {FiMenu, FiX} from 'react-icons/fi';
import React from 'react';
import logo1 from '../../assets/images/icon/logo.png';
import sigma from '../../../public/sigmanew.pdf';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <header className="border-gray-200/50 fixed left-0 z-50 mb-10 w-full border-b bg-white shadow-lg">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 md:py-5">
          {/* LEFT: Logo */}
          <div className="flex items-center">
            <Link to="/" className="group">
              <img
                src={logo1}
                alt="logo"
                className="h-12 w-auto transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-md"
              />
            </Link>
          </div>

          {/* CENTER: Navigation Links (Desktop) */}
          <nav className="hidden space-x-10 text-sm font-medium md:flex">
            {[
              {path: '/', label: 'Home'},
              {path: '/aboutsection', label: 'About'},
              {path: '/mycompanies', label: 'My Companies'},
              {path: '/myproducts', label: 'My Products'},
              {path: '/contactus', label: 'Contact'},
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-700 group relative transition-all duration-300 hover:text-blue-600"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* RIGHT: Icons + Business Plan (Desktop) */}
          <div className="hidden items-center space-x-4 md:flex">
            {/* Divider */}
            <div className="bg-gray-300 h-8 w-px"></div>

            {/* Business Plan Button */}
            <a
              href={sigma}
              download
              className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg"
            >
              <span className="relative z-10">Business Plan</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </a>

            {/* Login Button */}
            <Link to="/signin">
              <button
                type="button"
                className="group relative overflow-hidden rounded-lg border-2 border-blue-500 px-6 py-2 text-sm font-semibold text-blue-500 transition-all duration-300 hover:-translate-y-0.5 hover:text-white hover:shadow-lg"
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 scale-x-0 bg-gradient-to-r from-blue-500 to-blue-600 transition-transform duration-300 group-hover:scale-x-100"></div>
              </button>
            </Link>
          </div>

          {/* MOBILE: Menu Toggle */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Login Button */}
            <Link
              to="/signin"
              className="hover:bg-gray-50 flex items-center rounded-lg bg-white px-4 py-2 text-center text-sm font-semibold text-black-2 transition"
            >
              {/* User Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Login
            </Link>

            {/* Menu Toggle Button */}
            <button
              onClick={toggleMenu}
              className="bg-gray-50 hover:bg-gray-100 relative rounded-lg p-2 text-blue-500 transition-all duration-200"
            >
              <FiMenu className="text-3xl" />
            </button>
          </div>
        </div>

        {/* MOBILE: Slide-in Side Menu */}
        <div
          className={`fixed left-0 top-0 z-40 h-full w-full bg-white p-6 shadow-lg duration-300 md:hidden ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo in the mobile menu */}
            <Link to="/" className="group">
              <img
                src={logo1}
                alt="logo"
                className="h-12 w-auto transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-md"
              />
            </Link>
            {/* Close button */}
            <button
              onClick={toggleMenu}
              className="relative -top-1 right-4 text-blue-500 hover:text-blue-600"
            >
              <FiX size={`24`} />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="mt-3 space-y-4 py-4">
            {[
              {path: '/', label: 'Home'},
              {path: '/aboutsection', label: 'About'},
              {path: '/mycompanies', label: 'My Companies'},
              {path: '/myproducts', label: 'My Products'},
              {path: '/contactus', label: 'Contact'},
            ].map((item, index) => (
              <div key={item.path}>
                <Link
                  to={item.path}
                  className="block rounded px-4 py-2 text-lg font-bold text-black-2 transition hover:bg-blue-50 hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {/* Add a thin gray line after each item except the last one */}
                {index < 4 && <div className="border-gray-300 my-2 border-t" />}
              </div>
            ))}
          </nav>

          {/* Business Plan Button */}
          <a
            href={sigma}
            download
            className="mt-6 block w-full rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:from-blue-600 hover:to-blue-700"
          >
            Download Business Plan
          </a>
        </div>
      </header>
    </>
  );
};

export default Header;
