import React, {useState} from 'react';
import {Link} from '@tanstack/react-router';
import ClickOutside from '../ClickOutside';
import UserOne from '../../assets/images/user/user.png';
import {IoIosArrowDown} from 'react-icons/io';
import {QUERY_KEYS} from '@/lib/react-query/QueryKeys';
import {useAuthContext} from '@/context/AuthContext';
import {FiEdit} from 'react-icons/fi';
import {jwtDecode} from 'jwt-decode';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const {user} = useAuthContext();

  const role = user?.role;
  const name = user?.fullname;
  const email = user?.email;
  const phone = user?.phone;
  const crnNo = user?.crnNo || 'N/A';

  const handleSignOut = async () => {
    if (localStorage.getItem(QUERY_KEYS.TOKEN)) {
      localStorage.removeItem(QUERY_KEYS.TOKEN);
      window.location.reload();
    }
  };

  const token = localStorage.getItem('token'); // or your key name
  let decoded;
  if (token) {
    try {
      decoded = jwtDecode(token);
      console.log('Decoded Token:', decoded?.role);
    } catch (error) {
      console.error('Invalid token:', error);
    }
  } else {
    console.log('No token found');
  }

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {name}
          </span>
          <span className="text-gray-500 dark:text-gray-400 block text-xs capitalize">
            {role?.toLowerCase()}
          </span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <img
            src={UserOne}
            alt="User"
            className="h-full w-full rounded-full object-cover"
          />
        </span>

        <IoIosArrowDown
          className={`hidden fill-current transition-transform duration-200 sm:block ${
            dropdownOpen ? 'rotate-180' : ''
          }`}
          width={24}
          height={16}
        />
      </Link>

      {/* Dropdown Start */}
      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-4 flex w-64 flex-col rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark`}
        >
          <div className="flex flex-col gap-4 border-b border-stroke px-6 py-5 dark:border-strokedark">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full">
                <img
                  src={UserOne}
                  alt="User"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium text-black dark:text-white">
                  {name}
                </h4>
                <span className="text-gray-500 dark:text-gray-400 text-xs capitalize">
                  {role?.toLowerCase()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <svg
                  className="text-gray-400 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-gray-600 dark:text-gray-300">
                  {email}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="text-gray-400 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-gray-600 dark:text-gray-300">
                  {phone}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="text-gray-400 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-gray-600 dark:text-gray-300">
                  CRN: {crnNo}
                </span>
              </div>
            </div>
          </div>
          <div className="flex">
            <button
              onClick={handleSignOut}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-3 px-6 py-3 text-sm font-medium text-red-600 duration-300 ease-in-out hover:text-red-700 lg:text-base"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign Out
            </button>

            {decoded?.role === 'ADMIN' && (
              <Link
                to="/admin/updateprofile"
                className="flex items-center gap-1 px-2 text-blue-600"
              >
                <FiEdit />
                Edit
              </Link>
            )}
          </div>
        </div>
      )}
      {/* Dropdown End */}
    </ClickOutside>
  );
};

export default DropdownUser;
