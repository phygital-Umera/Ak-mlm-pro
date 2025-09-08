import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuthContext } from '@/context/AuthContext';
import { useGetCustomerProfile } from '@/lib/react-query/Admin/profile/profile';

interface IncompleteProfilePopupProps {
  onClose?: () => void;
}

const IncompleteProfilePopup: React.FC<IncompleteProfilePopupProps> = ({
  onClose,
}) => {
  const navigate = useNavigate();
  const { data: profileData } = useGetCustomerProfile();
  const [showPopup, setShowPopup] = useState(true);

  console.log('====================================');
  console.log('profileData..................', profileData);
  console.log('====================================');

  // Check if required fields are empty
  const isProfileIncomplete = () => {
    const requiredFields = [
      profileData?.bankAccNo,
      profileData?.panNumber,
      profileData?.aadharNumber,
      // add more fields as needed
    ];

    return requiredFields.some((field) => !field || field.trim() === '');
  };

  // Only show popup if profile is incomplete
  if (!isProfileIncomplete()) {
    return null;
  }

  const handleNavigate = () => {
    if (onClose) onClose();
    navigate({ to: '/customer/profile' });
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
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
                  To access all features, please complete your profile by
                  providing the missing details like PAN number, Aadhar number,
                  Bank details, etc.
                </p>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={handleNavigate}
                  className="w-full justify-center rounded-lg bg-blue-600 px-4 py-2 text-white shadow-md hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Complete Profile
                </button>
                <button
                  onClick={handleClose}
                  className="w-full justify-center rounded-lg bg-blue-600 px-4 py-2 text-white shadow-md hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default IncompleteProfilePopup;
