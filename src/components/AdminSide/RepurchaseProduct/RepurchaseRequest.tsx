import React, {useEffect, useState} from 'react';
import {IoCloseCircleOutline} from 'react-icons/io5';
import {
  useApproveRepurchaseRequest,
  useGetAllRePurchase,
  useGetRePurchaseRequests,
  useRejectRepurchaseRequest,
} from '@/lib/react-query/Admin/RepurchaseProduct/repurchaseproduct';
import DisplayRepurchase from './DisplayRepurchase';
import toast, {CheckmarkIcon} from 'react-hot-toast';

const RepurchaseRequest = () => {
  const {data, refetch} = useGetRePurchaseRequests();

  const {
    mutate: rejectEpin,
    isSuccess: rejectSuccess,
    isError: rejectError,
  } = useRejectRepurchaseRequest();
  const {
    mutate: approveEpin,
    isSuccess: approveSuccess,
    isError: approveError,
  } = useApproveRepurchaseRequest();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const handleApprove = (item) => {
    approveEpin(item.id);
  };

  const handleReject = (item) => {
    rejectEpin(item.id);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage('');
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (rejectSuccess) {
      toast.success('Repurchase Request Rejected');
      refetch();
    }
    if (rejectError) {
      toast.error('Failed to reject Repurchase Request');
    }
  }, [rejectSuccess, rejectError, refetch]);

  useEffect(() => {
    if (approveSuccess) {
      toast.success('Repurchase Request Approved');
      refetch();
    }
    if (approveError) {
      toast.error('Failed to approve Repurchase Request');
    }
  }, [approveSuccess, approveError, refetch]);

  // Pagination logic
  const totalPages = Math.ceil((data?.length || 0) / recordsPerPage);
  const paginatedData = data?.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="mb-6 rounded-sm bg-white px-5 pb-2.5 pt-6 shadow-default dark:bg-boxdark">
        <h1 className="mb-4 text-xl font-bold dark:text-white">
          Repurchase Product Requests
        </h1>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                {[
                  {label: 'Date & Time', accessor: 'createdAt'},
                  {label: 'Customer Name', accessor: 'customer.firstName'},
                  {label: 'Customer City', accessor: 'customer.city'},
                  {label: 'CRN', accessor: 'customer.crnNo'},
                  {label: 'Requested Amount', accessor: 'paidAmount'},
                  {label: 'Image', accessor: 'image'},
                  //   {label: 'EPINs Approved', accessor: 'epinValues'},
                  {label: 'Actions'},
                ].map((col, index) => (
                  <th
                    key={index}
                    className="px-4 py-2 font-medium text-black dark:text-white"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(paginatedData) &&
                paginatedData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 dark:hover:bg-boxhoverdark"
                  >
                    <td className="px-4 py-2 dark:text-white">
                      {new Date(item.createdAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })}
                    </td>
                    <td className="px-4 py-2 dark:text-white">
                      {item.customer?.firstName || 'N/A'}
                    </td>
                    <td className="px-4 py-2 dark:text-white">
                      {item.customer?.city || 'N/A'}
                    </td>
                    <td className="px-4 py-2 dark:text-white">
                      {item.customer?.crnNo || 'N/A'}
                    </td>
                    <td className="px-4 py-2 dark:text-white">
                      {item.paidAmount}
                    </td>
                    <td className="px-4 py-2 dark:text-white">
                      <img
                        src={item.image}
                        alt="Request"
                        className="h-12 w-12 cursor-pointer rounded object-cover"
                        onClick={() => openModal(item.image)}
                      />
                    </td>
                    <td className="px-4 py-2 dark:text-white">
                      <div className="flex items-center space-x-4">
                        {/* Approve Button */}
                        <button
                          className="transform rounded-sm bg-gradient-to-r from-green-400 to-green-500 px-2 py-2 text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:from-green-500 hover:to-green-400"
                          // onClick={() => handleApprove(item)}
                          onClick={() => handleApprove(item)}
                        >
                          <CheckmarkIcon className="h-5 w-5" />
                        </button>

                        {/* Reject Button */}
                        <button
                          className="transform rounded-sm bg-gradient-to-r from-red-400 to-red-500 px-2 py-2 text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:from-red-500 hover:to-red-400"
                          onClick={() => handleReject(item)}
                        >
                          <IoCloseCircleOutline className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <button
            className="text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded px-3 py-2"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded px-3 py-2"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            onClick={closeModal}
          >
            <div
              className="relative max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Large View"
                className="max-h-[90vh] max-w-full rounded shadow-lg"
              />
              <button
                className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
      <DisplayRepurchase />
    </>
  );
};

export default RepurchaseRequest;
