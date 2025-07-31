import React, {useState} from 'react';
import Modal from 'react-modal';

type CustomerData = {
  id: string;
  name: string;
  crnNo: string;
  phone: string;
  leftCount: number;
  rightCount: number;
  remainingDays: number;

  status: 'PENDING' | 'PAID';
};

const GoldRewards = () => {
  // Static data with payment information
  const retData: CustomerData[] = [
    {
      id: '1',
      name: 'John Doe',
      crnNo: '123456',
      phone: '1234567890',
      leftCount: 10,
      rightCount: 10,
      remainingDays: 30,

      status: 'PENDING',
    },
    {
      id: '2',
      name: 'Jane Smith',
      crnNo: '654321',
      phone: '9876543210',
      leftCount: 15,
      rightCount: 15,
      remainingDays: 25,

      status: 'PENDING',
    },
    {
      id: '3',
      name: 'Robert Johnson',
      crnNo: '789012',
      phone: '8765432109',
      leftCount: 20,
      rightCount: 20,
      remainingDays: 15,

      status: 'PENDING',
    },
  ];

  const [customerData, setCustomerData] = useState<CustomerData[]>(retData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  const handlePayClick = (id: string) => {
    setCustomerData((prev) =>
      prev.map((item) => (item.id === id ? {...item, status: 'PAID'} : item)),
    );
  };

  const handlePayAll = () => {
    setIsModalOpen(true);
  };

  const confirmPayAll = () => {
    setCustomerData((prev) => prev.map((item) => ({...item, status: 'PAID'})));
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Filter data based on search term
  const filteredData = customerData.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Gold Reward List</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded border border-stroke px-4 py-2 dark:border-strokedark dark:bg-boxdark"
          />
          <button
            onClick={handlePayAll}
            disabled={customerData.every((item) => item.status === 'PAID')}
            className={`rounded px-4 py-2 text-white ${
              customerData.every((item) => item.status === 'PAID')
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            Pay All
          </button>
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white px-6 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-2 dark:bg-meta-4">
                <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                  Name
                </th>
                <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                  Customer ID
                </th>
                <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                  Mobile No
                </th>
                <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                  Left Count
                </th>
                <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                  Right Count
                </th>
                <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                  Remaining Days
                </th>
                <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                  Gold Reward
                </th>
                <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-stroke dark:border-strokedark"
                >
                  <td className="px-4 py-2 text-left">{item.name}</td>
                  <td className="px-4 py-2 text-left">{item.crnNo}</td>
                  <td className="px-4 py-2 text-left">{item.phone}</td>
                  <td className="px-4 py-2 text-left">{item.leftCount}</td>
                  <td className="px-4 py-2 text-left">{item.rightCount}</td>
                  <td className="px-4 py-2 text-left">{item.remainingDays}</td>
                  <td className="px-4 py-2 text-left">{item.status}</td>
                  <td className="px-4 py-2 text-left">
                    <button
                      onClick={() => handlePayClick(item.id)}
                      disabled={item.status === 'PAID'}
                      className={`rounded px-3 py-1 text-white ${
                        item.status === 'PAID'
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-green-500 hover:bg-green-600'
                      }`}
                    >
                      {item.status === 'PAID' ? 'Paid' : 'Pay'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 rounded px-4 py-2 text-black transition disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 rounded px-4 py-2 text-black transition disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="mx-auto mt-10 max-w-sm rounded bg-white p-6 shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-lg font-semibold">Confirm Payment</h2>
        <p className="mt-2 text-sm">
          Are you sure you want to pay all pending gold rewards?
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

export default GoldRewards;
