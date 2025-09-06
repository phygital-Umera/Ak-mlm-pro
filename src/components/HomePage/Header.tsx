/* eslint-disable */
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import React from 'react';
import { Link } from '@tanstack/react-router';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact Us' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/signin', label: 'Login' },
    { path:'/registrationform', label: 'Registration' }, 
  ];

  return (
    <header className="border-gray-200/50 fixed left-0 top-[32px] z-50 w-full border-b bg-white shadow-lg">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-[#289dd8]">SJC Group</h1>
        </div>

        <nav className="hidden space-x-8 font-lato text-lg text-[#2E363A] md:flex">
          {menuItems.map((item) =>
            item.route ? (
              <Link
                key={item.label}
                to={item.route}
                className="relative transition-all duration-300 hover:text-blue-600"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.path}
                className="relative transition-all duration-300 hover:text-blue-600"
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        <div className="flex items-center space-x-4 md:hidden">
          <Link
            to="/signin"
            className="rounded-lg border border-blue-500 px-3 py-1.5 text-sm font-medium text-blue-500 transition hover:bg-blue-500 hover:text-white"
          >
            Login
          </Link>
          <button onClick={toggleMenu} className="hover:bg-gray-100 rounded-lg p-2 text-blue-500">
            {isMobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      <div
        className={`fixed right-0 top-0 z-40 h-full w-3/4 bg-white p-6 shadow-lg transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="mb-6 flex justify-end">
          <button onClick={toggleMenu}>
            <FiX size={24} className="text-blue-500" />
          </button>
        </div>

        <nav className="space-y-4 text-lg font-semibold">
          {menuItems.map((item) =>
            item.route ? (
              <Link
                key={item.label}
                to={item.route}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded px-4 py-2 hover:bg-blue-50 hover:text-blue-600"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded px-4 py-2 hover:bg-blue-50 hover:text-blue-600"
              >
                {item.label}
              </a>
            )
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
