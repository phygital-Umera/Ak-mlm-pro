import Loader from '@/components/common/Loader';
import GenericTable, {Column} from '@/components/Forms/Table/GenericTable';
import {useGetAllEPins} from '@/lib/react-query/Admin/Epin/epin';
import {ChevronDownIcon, ChevronUpIcon} from 'lucide-react';
import React, {useMemo, useState} from 'react';
import toast from 'react-hot-toast';

type EpinData = {
  CustomerID: string;
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
          item.price === 0
            ? 'bg-purple-100 text-purple-900 dark:bg-purple-900/50 dark:text-purple-200'
            : 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-200'
        } `}
      >
        ₹{item.price.toLocaleString('en-IN')}
      </span>
    ),
  },
];

const DisplayEpin: React.FC = () => {
  const {data: epinData, isSuccess, isLoading} = useGetAllEPins();
  console.log('epinData', epinData);
  const [searchTerm, setSearchTerm] = useState('');

  // State for expanded/collapsed sections
  const [expandedSections, setExpandedSections] = useState({
    zero: true, // true means expanded, false means collapsed
    regular: true,
  });

  const toggleSection = (section: 'zero' | 'regular') => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const expandAll = () => {
    setExpandedSections({
      zero: true,
      regular: true,
    });
  };

  const collapseAll = () => {
    setExpandedSections({
      zero: false,
      regular: false,
    });
  };

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

  // Separate data for Zero and Regular pins
  const zeroPins = useMemo(() => {
    return formattedData.filter((item) => item.type === 'ZERO');
  }, [formattedData]);

  const regularPins = useMemo(() => {
    return formattedData.filter((item) => item.type === 'REGULAR');
  }, [formattedData]);

  // Filtered data based on search
  const filteredZeroPins = useMemo(() => {
    if (!searchTerm) return zeroPins;

    const term = searchTerm.toLowerCase();
    return zeroPins.filter(
      (item) =>
        item.epinNo.toLowerCase().includes(term) ||
        (item.usedBy && item.usedBy.toLowerCase().includes(term)),
    );
  }, [zeroPins, searchTerm]);

  const filteredRegularPins = useMemo(() => {
    if (!searchTerm) return regularPins;

    const term = searchTerm.toLowerCase();
    return regularPins.filter(
      (item) =>
        item.epinNo.toLowerCase().includes(term) ||
        (item.usedBy && item.usedBy.toLowerCase().includes(term)),
    );
  }, [regularPins, searchTerm]);

  // Statistics
  const stats = useMemo(() => {
    const totalZero = zeroPins.length;
    const usedZero = zeroPins.filter((item) => item.isUsed).length;
    const availableZero = totalZero - usedZero;

    const totalRegular = regularPins.length;
    const usedRegular = regularPins.filter((item) => item.isUsed).length;
    const availableRegular = totalRegular - usedRegular;

    return {
      zero: {total: totalZero, used: usedZero, available: availableZero},
      regular: {
        total: totalRegular,
        used: usedRegular,
        available: availableRegular,
      },
    };
  }, [zeroPins, regularPins]);

  if (isLoading) {
    return (
      <div className="flex h-80 items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Title, Search and Expand/Collapse Controls */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-gray-800 text-2xl font-semibold dark:text-white">
          E-Pin Management
        </h2>
        <div className="flex items-center gap-4">
          {/* Search Input */}
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
        </div>
      </div>

      {/* Zero Pins Section - Expandable/Collapsible */}
      <div className="dark:bg-gray-800 overflow-hidden rounded-lg bg-white shadow-sm">
        {/* Section Header */}
        <div
          className="hover:bg-gray-50 dark:hover:bg-gray-700/50 flex cursor-pointer items-center justify-between p-6 transition-colors"
          onClick={() => toggleSection('zero')}
        >
          <div className="flex items-center gap-3">
            <div
              className={`rounded-lg p-2 ${expandedSections.zero ? 'bg-purple-100 dark:bg-purple-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}
            >
              {expandedSections.zero ? (
                <ChevronUpIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              ) : (
                <ChevronDownIcon className="text-gray-600 dark:text-gray-400 h-5 w-5" />
              )}
            </div>
            <div>
              <h3 className="text-gray-800 flex items-center gap-2 text-xl font-semibold dark:text-white">
                Zero Pins
                <span className="text-gray-500 ml-2 text-sm font-normal">
                  (₹0)
                </span>
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                {stats.zero.total} total • {stats.zero.available} available •{' '}
                {stats.zero.used} used
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 dark:bg-purple-900/50 dark:text-purple-200">
              {filteredZeroPins.length}{' '}
              {filteredZeroPins.length === 1 ? 'Pin' : 'Pins'}
            </span>
          </div>
        </div>

        {/* Collapsible Content */}
        {expandedSections.zero && (
          <div className="px-6 pb-6">
            <GenericTable
              data={filteredZeroPins}
              columns={EpinColumn}
              itemsPerPage={10}
              title=""
              key="zero-pins-table"
              onCopy={(item: EpinData) => {
                navigator.clipboard.writeText(item.epinNo);
                toast.success('E-Pin copied to clipboard!');
              }}
            />
          </div>
        )}
      </div>

      {/* Regular Pins Section - Expandable/Collapsible */}
      <div className="dark:bg-gray-800 overflow-hidden rounded-lg bg-white shadow-sm">
        {/* Section Header */}
        <div
          className="hover:bg-gray-50 dark:hover:bg-gray-700/50 flex cursor-pointer items-center justify-between p-6 transition-colors"
          onClick={() => toggleSection('regular')}
        >
          <div className="flex items-center gap-3">
            <div
              className={`rounded-lg p-2 ${expandedSections.regular ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}
            >
              {expandedSections.regular ? (
                <ChevronUpIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <ChevronDownIcon className="text-gray-600 dark:text-gray-400 h-5 w-5" />
              )}
            </div>
            <div>
              <h3 className="text-gray-800 flex items-center gap-2 text-xl font-semibold dark:text-white">
                Regular Pins
                <span className="text-gray-500 ml-2 text-sm font-normal">
                  (₹1000)
                </span>
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                {stats.regular.total} total • {stats.regular.available}{' '}
                available • {stats.regular.used} used
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
              {filteredRegularPins.length}{' '}
              {filteredRegularPins.length === 1 ? 'Pin' : 'Pins'}
            </span>
          </div>
        </div>

        {/* Collapsible Content */}
        {expandedSections.regular && (
          <div className="px-6 pb-6">
            <GenericTable
              data={filteredRegularPins}
              columns={EpinColumn}
              itemsPerPage={10}
              title=""
              key="regular-pins-table"
              onCopy={(item: EpinData) => {
                navigator.clipboard.writeText(item.epinNo);
                toast.success('E-Pin copied to clipboard!');
              }}
            />
          </div>
        )}
      </div>

      {/* Show message if no data */}
      {formattedData.length === 0 && (
        <div className="dark:bg-gray-800 rounded-lg bg-white p-12 text-center shadow-sm">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No E-Pins found
          </p>
        </div>
      )}
    </div>
  );
};

export default DisplayEpin;
