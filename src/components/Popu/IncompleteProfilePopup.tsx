import React from 'react';
import {useNavigate} from '@tanstack/react-router';
import {useAuthContext} from '@/context/AuthContext';

interface IncompleteProfilePopupProps {
  onClose?: () => void;
}

const IncompleteProfilePopup: React.FC<IncompleteProfilePopupProps> = ({
  onClose,
}) => {
  const navigate = useNavigate();

  const {customer} = useAuthContext();

  console.log('customer', customer);

  const handleNavigate = () => {
    if (onClose) onClose();
    navigate({to: '/customer/customerprofilec'});
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm" />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md rounded-lg border bg-white p-8 shadow-2xl dark:bg-meta-4">
          <div className="mb-6">
            <h2 className="text-gray-900 mb-4 text-2xl font-bold dark:text-white">
              Complete Your Profile
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">
              To access all features, please complete your profile by providing
              the missing details.
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleNavigate}
              className="w-full justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Complete Profile
            </button>
          </div>

          {/* Optional Close Button */}
          {/* {onClose && (
            <button
              className="text-gray-400 hover:text-gray-600 absolute right-3 top-3"
              onClick={onClose}
            >
              ✕
            </button>
          )} */}
        </div>
      </div>
    </>
  );
};

export default IncompleteProfilePopup;
