/* eslint-disable */

import {useVoucherList} from '@/lib/react-query/Admin/Home/adminHome';
import {usePayVoucher} from '@/lib/react-query/Admin/Voucher/voucher';
import React, {useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import DisplayVoucher from './DisplayVoucher';

type CustomerData = {
  id: string;
  name: string;
  amount: number;
  crnNo: string;
  plan: string;
  status: string;
  createdAt: string;
};

const Vouchers = () => {
  const {data: Voucher} = useVoucherList();
  console.log('====================================');
  console.log('Voucher', Voucher);
  console.log('====================================');
  const {mutate: payVouchers, isSuccess} = usePayVoucher();

  const [customerData, setCustomerData] = useState<CustomerData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 15;

  useEffect(() => {
    if (Voucher) {
      const mappedData = Voucher.filter(
        (voucher: any) => voucher.status !== 'PAID',
      ).map((voucher: any) => ({
        id: voucher.id,
        name: `${voucher.firstName} ${voucher.lastName}`,
        amount: voucher.amount,
        crnNo: voucher.crnNo,
        plan: voucher.plan,
        status: voucher.status,
        createdAt: voucher.createdAt,
      }));
      const sortedData = mappedData.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      setCustomerData(sortedData);
    }
  }, [Voucher, isSuccess]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Vouchers paid successfully');
    }
  }, [isSuccess]);

  const totalPages = Math.ceil(customerData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = customerData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePayClick = (row: CustomerData) => {
    payVouchers({Ids: [row.id]});
  };

  const handlePayAll = () => {
    setIsModalOpen(true);
  };

  const confirmPayAll = () => {
    const pendingIds = customerData
      .filter((voucher) => voucher.status === 'PENDING')
      .map((voucher) => voucher.id);

    if (pendingIds.length > 0) {
      payVouchers({Ids: pendingIds});
    }
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const hasPendingVouchers = customerData.some(
    (voucher) => voucher.status === 'PENDING',
  );

  const renderTable = () => (
    <div className="rounded-sm border border-stroke bg-white px-6 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
      {customerData.length === 0 ? (
        <div className="text-gray-500 py-4 text-center">
          No pending vouchers available
        </div>
      ) : (
        <>
          {hasPendingVouchers && (
            <div className="mb-4 flex justify-end">
              <button
                onClick={handlePayAll}
                className="dark:hover:bg-primarydark rounded bg-green-500 px-4 py-2 text-sm text-white transition hover:bg-green-600 dark:bg-primary"
              >
                Pay All
              </button>
            </div>
          )}
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Name
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Amount
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    CRN No
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Plan
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Status
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-stroke dark:border-strokedark"
                  >
                    <td className="px-4 py-4 text-black dark:text-white">
                      {row.name}
                    </td>
                    <td className="px-4 py-4 text-black dark:text-white">
                      {row.amount}
                    </td>
                    <td className="px-4 py-4 text-black dark:text-white">
                      {row.crnNo}
                    </td>
                    <td className="px-4 py-4 text-black dark:text-white">
                      {row.plan}
                    </td>
                    <td className="px-4 py-4 text-black dark:text-white">
                      {row.status}
                    </td>
                    <td className="px-4 py-4 text-black dark:text-white">
                      <button
                        onClick={() => handlePayClick(row)}
                        className={`rounded px-4 py-2 text-white ${
                          row.status === 'PENDING'
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'bg-gray-400 cursor-not-allowed'
                        }`}
                        disabled={row.status !== 'PENDING'}
                      >
                        Pay
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <div className="text-gray-500 text-sm">
                Showing {startIndex + 1} to{' '}
                {Math.min(startIndex + itemsPerPage, customerData.length)} of{' '}
                {customerData.length} entries
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`rounded border px-3 py-1 ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-50 bg-transparent'
                  }`}
                >
                  Previous
                </button>

                {Array.from({length: totalPages}, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`rounded border px-3 py-1 ${
                        page === currentPage
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-50 bg-transparent'
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`rounded border px-3 py-1 ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-50 bg-transparent'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
      <DisplayVoucher Voucher={Voucher} />
    </div>
  );

  return (
    <div>
      <h1 className="mb-4 mt-4 text-xl font-bold">Voucher List</h1>
      {renderTable()}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="mx-auto mt-10 max-w-sm rounded bg-white p-6 shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-999"
      >
        <h2 className="text-lg font-semibold">Confirm Payment</h2>
        <p className="mt-2 text-sm">
          Are you sure you want to pay all pending vouchers?
        </p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={confirmPayAll}
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Confirm
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-500 hover:bg-gray-600 ml-2 rounded px-4 py-2 text-black"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Vouchers;
