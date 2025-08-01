import Loader from '@/components/common/Loader';
import GenericTable, {Column} from '@/components/Forms/Table/GenericTable';
import {useGetAdminPins} from '@/lib/react-query/Admin/Epin/epin';
import React, {useMemo, useState} from 'react';
import toast from 'react-hot-toast';

type EpinData = {
  id: string;
  epinNo: string;
  createdAt: string;
  isUsed: boolean;
  usedAt: string | null;
  usedBy: string | null;
  type: string;
  price: number;
};

const EpinColumn: Column<EpinData>[] = [
  {header: 'Created At', accessor: 'createdAt', sortable: true},
  {header: 'E-Pin No', accessor: 'epinNo'},
  {
    header: 'Used',
    accessor: 'isUsed',
    render: (item: EpinData) => (
      <span
        className={`rounded-full px-2 py-1 text-xs font-medium ${
          item.isUsed
            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        }`}
      >
        {item.isUsed ? 'Used' : 'Available'}
      </span>
    ),
    sortable: true,
  },
  {header: 'Used By', accessor: 'usedBy', sortable: true},
  {header: 'Type', accessor: 'type'},
  {
    header: 'Price',
    accessor: 'price',
    render: (item: EpinData) => (
      <span
        className={`rounded-full px-3 py-1 text-sm font-semibold ${
          item.price === 3150
            ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/50 dark:text-amber-200'
            : item.price === 3600
              ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-200'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
        } `}
      >
        ₹{item.price.toLocaleString('en-IN')}
      </span>
    ),
  },
];

const DisplayEpin: React.FC = () => {
  const {data: epinData, isSuccess, isLoading} = useGetAdminPins();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const formattedData = useMemo(() => {
    if (!isSuccess || !Array.isArray(epinData)) return [];

    return epinData.map((epin: EpinData) => ({
      ...epin,
      createdAt: new Date(epin.createdAt).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      usedAt: epin.usedAt
        ? new Date(epin.usedAt).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        : '-',
      usedBy: epin.usedBy || '-',
    }));
  }, [epinData, isSuccess]);

  const filteredData = useMemo(() => {
    let data = formattedData;

    // Status filter
    if (selectedStatus !== 'all') {
      data = data.filter(
        (item) => item.type?.toLowerCase() === selectedStatus.toLowerCase(),
      );
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      data = data.filter(
        (item) =>
          item.epinNo.toLowerCase().includes(term) ||
          (item.usedBy && item.usedBy.toLowerCase().includes(term)) ||
          item.type.toLowerCase().includes(term),
      );
    }

    return data;
  }, [formattedData, selectedStatus, searchTerm]);

  if (isLoading) {
    return (
      <div className="flex h-80 items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="dark:bg-gray-800 rounded-lg p-6 shadow-sm dark:bg-meta-4 dark:text-white">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-gray-800 text-2xl font-semibold dark:text-white">
          E-Pin Management
        </h2>
        {/* <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border-gray-300 text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 block w-full rounded-lg border bg-transparent px-4 py-2 pr-8 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white"
            >
              <option value="all" className="text-gray-700 dark:text-white dark:bg-meta-4">
                All Types
              </option>
              <option value="zero" className="text-gray-700 dark:text-white dark:bg-meta-4">
                Zero
              </option>
              <option value="regular" className="text-gray-700 dark:text-white dark:bg-meta-4">
                Regular
              </option>
            </select>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search E-Pins..."
              className="border-gray-300 text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 block w-full rounded-lg border bg-transparent px-4 py-2 pr-10 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="text-gray-400 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div> */}
      </div>

      <GenericTable
        data={filteredData}
        columns={EpinColumn}
        itemsPerPage={15}
        title=""
        key={'epin'}
        onCopy={(item: EpinData) => {
          navigator.clipboard.writeText(item.epinNo);
          toast.success('E-Pin copied to clipboard!');
        }}
      />
    </div>
  );
};

export default DisplayEpin;
