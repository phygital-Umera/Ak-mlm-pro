/* eslint-disable */
import {useState} from 'react';
import {Link} from '@tanstack/react-router';
import ClickOutside from '../ClickOutside';
import {useAuthContext} from '@/context/AuthContext';
import {FaEdit} from 'react-icons/fa';
import {CheckmarkIcon} from 'react-hot-toast';
import {useGetNotification} from '@/lib/react-query/Customer/notification';

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const {user} = useAuthContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // ✅ New API
  const {data: notificationData} = useGetNotification();
  console.log('notificationData', notificationData);

  const formatIndianDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <li className="relative">
        <Link
          onClick={() => {
            setNotifying(false);
            setDropdownOpen(!dropdownOpen);
          }}
          className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
        >
          {/* Red dot when new */}
          <span
            className={`absolute -top-0.5 right-0 h-2 w-2 rounded-full bg-meta-1 ${
              notifying === false ? 'hidden' : 'inline'
            }`}
          >
            <span className="absolute h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
          </span>

          {/* Bell Icon */}
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path d="M16.2 14.93L15.64 14.06c-.11-.17-.17-.34-.17-.53V7.68c0-1.66-.7-3.21-2-4.36-1.04-.93-2.39-1.52-3.83-1.64V1.12c0-.34-.28-.64-.64-.64s-.65.28-.65.64v.54C5.28 2.05 2.83 4.67 2.83 7.79v5.74c-.03.28-.09.42-.16.52l-.54.9c-.17.28-.17.62 0 .9.17.25.45.42.75.42h13.1c.3 0 .58-.17.75-.42.17-.28.17-.62 0-.9z" />
          </svg>
        </Link>

        {dropdownOpen && (
          <div className="absolute -right-27 mt-2.5 w-80 rounded-lg border border-stroke bg-white shadow-xl dark:border-strokedark dark:bg-boxdark sm:right-0">
            {/* Header */}
            <div className="sticky top-0 z-10 border-b border-stroke bg-white px-4 py-3 dark:border-strokedark dark:bg-boxdark">
              <div className="flex items-center justify-between">
                <h5 className="text-sm font-semibold text-bodydark2">
                  Notifications
                </h5>
                <span className="text-gray-500 text-xs">
                  {notificationData?.length || 0} new
                </span>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notificationData?.length ? (
                notificationData
                  .filter((item: any) => item.status === 'PAID') // ✅ Only PAID
                  .map((item: any) => (
                    <div
                      key={item.id}
                      className="hover:bg-gray-50 border-b border-stroke px-4 py-3 dark:border-strokedark dark:hover:bg-meta-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-sm">
                          💰
                        </span>

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-black dark:text-white">
                              Payment Update ({item.status})
                            </h4>
                            <span className="text-gray-500 text-xs">
                              {formatIndianDate(item.createdAt)}
                            </span>
                          </div>

                          <div className="text-gray-600 dark:text-gray-300 mt-1 text-sm">
                            <p>Customer: {item.customerId}</p>
                            <p>
                              Amount: ₹{item.amount.toLocaleString('en-IN')}
                            </p>
                            <p>Payable: ₹{item.payableAmount}</p>
                            <p>TDS: ₹{item.tdsAmount}</p>
                            <p>Details: {item.details}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <svg
                    className="text-gray-400 h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M15 17h5l-1.4-1.4A2 2 0 0118 14.16V11a6 6 0 00-4-5.66V5a2 2 0 10-4 0v.34C7.67 6.16 6 8.39 6 11v3.16c0 .54-.21 1.05-.6 1.44L4 17h5m6 0v1a3 3 0 11-6 0v-1"
                    />
                  </svg>
                  <p className="text-gray-500 mt-2 text-sm">
                    No new notifications
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </li>
    </ClickOutside>
  );
};

export default DropdownNotification;
