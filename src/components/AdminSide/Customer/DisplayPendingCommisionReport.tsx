import React, {useState} from 'react';
import {
  useFetchAdminCommsion,
  usePayCommission,
  usePayCommissionAll,
} from '@/lib/react-query/Admin/Home/commission';
import Modal from 'react-modal';
import * as XLSX from 'xlsx';
import Loader from '@/components/common/Loader';
import {useQueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';

type PendingCommission = {
  id: string;
  customerId: string;
  createdAt: string;
  amount: number;
  status: 'PENDING' | 'PAID';
  details: string;
  type: string;
  payableAmount: number;
  tdsAmount: number;
  crnNo: string;
  phoneNumber: string;
  fullname: string;
};

const DisplayPendingCommisionReport: React.FC = () => {
  const queryClient = useQueryClient();
  const {data, isSuccess, isError, isPending} = useFetchAdminCommsion();
  console.log('====================================');
  console.log('data', data);
  console.log('====================================');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const itemsPerPage = 10;

  const {mutate: payCommission} = usePayCommission();
  const {mutate: payAllCommission} = usePayCommissionAll();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePayClick = (row: PendingCommission) => {
    payCommission({id: row.id, data: {status: 'PAID'}});
  };

  const handlePayAll = () => {
    setIsModalOpen(true);
  };

  const confirmPayAll = () => {
    payAllCommission();
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleExportPendingToExcel = () => {
    const filteredData = filteredDataByType
      ?.filter((item: PendingCommission) => item.amount > 0)
      .map((item: PendingCommission) => ({
        'CRN No': item.crnNo,
        Amount: item.amount,
        Details: item.details,
        Type: item.type,
        'Full name': item.fullname,
        Mobile: item.phoneNumber,
        Status: item.status,
      }));

    if (filteredData && filteredData.length > 0) {
      const ws = XLSX.utils.json_to_sheet(filteredData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        wb,
        ws,
        `${selectedFilter || 'All'} Commissions`,
      );
      XLSX.writeFile(wb, `${selectedFilter || 'all'}_commissions.xlsx`);
    }
  };

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="rounded-sm border border-stroke bg-white p-8 text-center shadow-default dark:border-strokedark dark:bg-boxdark">
        <h3 className="text-lg font-medium">Error loading commission data</h3>
        <p className="text-gray-500 mt-2">
          Please try again later or contact support
        </p>
      </div>
    );
  }

  if (!isSuccess || !data) {
    return (
      <div className="rounded-sm border border-stroke bg-white p-8 text-center shadow-default dark:border-strokedark dark:bg-boxdark">
        <h3 className="text-lg font-medium">No commission data available</h3>
        <p className="text-gray-500 mt-2">
          Unable to fetch commission data at this time
        </p>
      </div>
    );
  }

  // Filter and process data
  const filterData = (data: PendingCommission[], filter: string | null) => {
    const filteredData = data.filter(
      (item) =>
        item.details.toLowerCase() !== 'fleshout' &&
        item.status === 'PENDING' &&
        item.amount > 0, // ✅ Only keep rows where amount > 0
    );

    if (!filter || filter === 'All') return filteredData;

    switch (filter) {
      case 'Golden Pair':
        return filteredData.filter((item) => item.type === 'golden pair');
      case 'Silver Pair':
        return filteredData.filter((item) => item.type === 'Silver pair');
      case 'Helping':
        return filteredData.filter(
          (item) =>
            item.details.toLowerCase() === 'helping' ||
            item.type.toLowerCase() === 'helping',
        );
      case 'BDF':
        return filteredData.filter(
          (item) =>
            item.details.toLowerCase() === 'wallet withdraw' ||
            item.type.toLowerCase() === 'withdraw',
        );
      default:
        return filteredData;
    }
  };

  // Format date and filter data
  const filteredDataByType = filterData(data, selectedFilter).map(
    (item: PendingCommission) => ({
      ...item,
      createdAt: new Date(item.createdAt).toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }),
    }),
  );

  const finalData = filteredDataByType;
  const totalPages = Math.ceil(finalData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = finalData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderTable = (
    data: PendingCommission[],
    _title: string,
    showButtons: boolean,
  ) => (
    <div className="rounded-sm border border-stroke bg-white px-6 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
      {showButtons && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={handlePayAll}
            className="dark:hover:bg-primarydark rounded bg-green-500 px-4 py-2 text-sm text-white transition hover:bg-green-600 dark:bg-primary"
            disabled={finalData.length === 0}
          >
            Pay All
          </button>
        </div>
      )}
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-2 dark:bg-meta-4">
              <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                CRN No
              </th>
              <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                Amount
              </th>
              <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                TDS
              </th>
              <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                Details
              </th>
              <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                Type
              </th>
              <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                Status
              </th>
              <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                Full Name
              </th>
              <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                Phone
              </th>
              <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                Created At
              </th>
              {showButtons && (
                <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="border-b border-stroke dark:border-strokedark"
              >
                <td className="px-4 py-2 text-left">{row.crnNo}</td>
                <td className="px-4 py-2 text-left">{row.amount}</td>
                <td className="px-4 py-2 text-left">{row.tdsAmount}</td>
                <td className="px-4 py-2 text-left">{row.details}</td>
                <td className="px-4 py-2 text-left">{row.type}</td>
                <td className="px-4 py-2 text-left">
                  <span
                    className={`rounded px-2 py-1 ${
                      row.status === 'PENDING'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-left">{row.fullname}</td>
                <td className="px-4 py-2 text-left">{row.phoneNumber}</td>
                <td className="px-4 py-2 text-left">{row.createdAt}</td>
                {showButtons && row.status === 'PENDING' && (
                  <td className="px-4 py-2 text-left">
                    <button
                      onClick={() => handlePayClick(row)}
                      className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                    >
                      Pay
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 rounded px-4 py-2 text-black transition disabled:cursor-not-allowed dark:text-white"
          >
            Previous
          </button>
          <span className="text-black dark:text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 rounded px-4 py-2 text-black transition disabled:cursor-not-allowed dark:text-white"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );

  const filterOptions = ['All', 'Golden Pair', 'Silver Pair', 'Helping', 'BDF'];

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">
          {selectedFilter
            ? `${selectedFilter} Commissions`
            : 'All Pending Commissions'}
        </h1>
        {finalData.length > 0 && (
          <div className="flex items-center gap-4">
            <button
              onClick={handleExportPendingToExcel}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Export to Excel
            </button>
          </div>
        )}
      </div>

      {finalData.length === 0 ? (
        <div className="rounded-sm border border-stroke bg-white p-8 text-center shadow-default dark:border-strokedark dark:bg-boxdark">
          <h3 className="text-lg font-medium">No commissions found</h3>
          <p className="text-gray-500 mt-2">
            {selectedFilter
              ? `No ${selectedFilter} commissions available`
              : 'No pending commissions available'}
          </p>
        </div>
      ) : (
        renderTable(currentItems, selectedFilter || 'All Commissions', true)
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="mx-auto mt-10 max-w-sm rounded bg-white p-6 shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-999"
      >
        <h2 className="text-lg font-semibold">Confirm Payment</h2>
        <p className="mt-2 text-sm">
          Are you sure you want to pay all {finalData.length} commissions?
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

export default DisplayPendingCommisionReport;
