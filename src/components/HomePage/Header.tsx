import {Link} from '@tanstack/react-router';
import {useState} from 'react';
import {FiMenu, FiX} from 'react-icons/fi';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGoogle,
  FaSearch,
} from 'react-icons/fa';
import React from 'react';
import logo1 from '../../assets/images/icon/logo.png';
import sigma from '../../../public/sigmanew.pdf';
import DownSide from '../website/Bottombar';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const toggleMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <header className="border-gray-200/50 fixed left-0 z-50 mb-10 w-full border-b bg-white/95 shadow-lg backdrop-blur-lg">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-5">
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

          {/* CENTER: Navigation Links */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 transform space-x-10 text-sm font-medium md:flex">
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
            {/* Social Icons */}
            {/* <div className="text-gray-500 flex items-center space-x-3">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaGoogle].map(
                (Icon, idx) => (
                  <Icon
                    key={idx}
                    className="cursor-pointer text-lg transition-all duration-200 hover:scale-110 hover:text-blue-500"
                  />
                ),
              )}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="hover:bg-gray-100 rounded-full p-2 transition-colors duration-200"
              >
                <FaSearch className="text-lg transition-all duration-200 hover:text-blue-500" />
              </button>
            </div> */}

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
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="bg-gray-50 text-gray-700 hover:bg-gray-100 relative rounded-lg p-2 transition-all duration-200"
            >
              <div className="relative h-6 w-6">
                <FiMenu
                  className={`absolute inset-0 text-xl transition-all duration-300 ${isMobileMenuOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`}
                />
                <FiX
                  className={`absolute inset-0 text-xl transition-all duration-300 ${isMobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'}`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* MOBILE: Dropdown Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="border-gray-200/50 border-t bg-white/95 px-6 py-4 backdrop-blur-lg">
            <div className="space-y-1">
              {[
                {path: '/', label: 'Home'},
                {path: '/aboutsection', label: 'About'},
                {path: '/mycompanies', label: 'My Companies'},
                {path: '/myproducts', label: 'My Products'},
                {path: '/contactus', label: 'Contact'},
              ].map((item) => (
                <Link
                  to={item.path}
                  key={item.path}
                  className="text-gray-700 block rounded-lg px-4 py-3 font-medium transition-all duration-200 hover:bg-blue-50 hover:pl-6 hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Social Icons */}
            {/* <div className="border-gray-200/50 mt-4 flex items-center justify-center space-x-6 border-t pb-4 pt-6">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaGoogle].map(
                (Icon, idx) => (
                  <Icon
                    key={idx}
                    className="text-gray-500 cursor-pointer text-xl transition-all duration-200 hover:scale-110 hover:text-blue-500"
                  />
                ),
              )}
              <FaSearch
                onClick={() => setShowSearch(!showSearch)}
                className="text-gray-500 cursor-pointer text-xl transition-all duration-200 hover:scale-110 hover:text-blue-500"
              />
            </div> */}

            {/* Mobile Business Plan Button */}
            <a
              href={sigma}
              download
              className="block w-full rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-md transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg"
            >
              Download Business Plan
            </a>
            <Link
              to="/signin"
              className="mt-3 block w-full rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-md transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Enhanced Search Input */}
        {/* <div
          className={`overflow-hidden transition-all duration-300 ${showSearch ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="border-gray-200/50 border-t bg-white/95 px-6 py-4 backdrop-blur-lg">
            <div className="relative mx-auto max-w-md">
              <FaSearch className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                autoFocus
                onBlur={() => setShowSearch(false)}
                className="border-gray-300 bg-gray-50 placeholder-gray-500 w-full rounded-full border py-3 pl-10 pr-4 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div> */}
      </header>
    </>
  );
};

export default Header;
