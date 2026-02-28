/*eslint-disable*/
import React, {useState, useMemo} from 'react';
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
import {ChevronDown, ChevronRight, Calendar} from 'lucide-react';

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
  email: string;
  dateOnly?: string;
  formattedTime?: string;
};

const DisplayPendingCommisionReport: React.FC = () => {
  const queryClient = useQueryClient();
  const {data, isSuccess, isError, isPending} = useFetchAdminCommsion();

  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());

  const {mutate: payCommission} = usePayCommission();
  const {mutate: payAllCommission} = usePayCommissionAll();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateForPayAll, setSelectedDateForPayAll] = useState<
    string | null
  >(null);

  const handlePayClick = (row: PendingCommission) => {
    payCommission({id: row.id, data: {status: 'PAID'}});
  };

  const handlePayAllForDate = (date: string) => {
    setSelectedDateForPayAll(date);
    setIsModalOpen(true);
  };

  const confirmPayAll = () => {
    if (selectedDateForPayAll) {
      // Get all IDs for the selected date
      const dateItems = groupedData[selectedDateForPayAll] || [];
      const ids = dateItems.map((item) => item.id);

      // You might need to modify your API to accept multiple IDs
      // For now, we'll pay one by one or create a new API endpoint
      ids.forEach((id) => {
        payCommission({id, data: {status: 'PAID'}});
      });

      toast.success(`Paid all commissions for ${selectedDateForPayAll}`);
    } else {
      // Original pay all functionality
      payAllCommission();
    }
    setIsModalOpen(false);
    setSelectedDateForPayAll(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDateForPayAll(null);
  };

  const handleExportToExcel = () => {
    const exportData = Object.entries(groupedData).flatMap(([date, items]) =>
      items.map((item) => ({
        Date: date,
        Time: item.formattedTime,
        'CRN No': item.crnNo,
        'Full Name': item.fullname,
        Phone: item.phoneNumber,
        Email: item.email,
        Amount: item.amount,
        Payable: item.payableAmount,
        TDS: item.tdsAmount,
        Details: item.details,
        Type: item.type,
        Status: item.status,
      })),
    );

    if (exportData.length > 0) {
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        wb,
        ws,
        `${selectedFilter || 'All'} Pending Commissions`,
      );
      XLSX.writeFile(wb, `${selectedFilter || 'all'}_pending_commissions.xlsx`);
    }
  };

  const toggleDate = (date: string) => {
    setExpandedDates((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(date)) {
        newSet.delete(date);
      } else {
        newSet.add(date);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    setExpandedDates(new Set(Object.keys(groupedData)));
  };

  const collapseAll = () => {
    setExpandedDates(new Set());
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
  const filterData = (data: any[], filter: string | null) => {
    const filteredData = data.filter(
      (item) =>
        item.details?.toLowerCase() !== 'fleshout' &&
        item.status === 'PENDING' &&
        item.amount > 0,
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
            item.details?.toLowerCase() === 'helping' ||
            item.type?.toLowerCase() === 'helping',
        );
      case 'BDF':
        return filteredData.filter(
          (item) =>
            item.details?.toLowerCase() === 'wallet withdraw' ||
            item.type?.toLowerCase() === 'withdraw',
        );
      default:
        return filteredData;
    }
  };

  // Transform and group data
  const processedData = useMemo(() => {
    const filtered = filterData(data, selectedFilter);

    return filtered
      .map((item: any) => {
        const date = new Date(item.createdAt);
        const dateOnly = new Intl.DateTimeFormat('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }).format(date);

        const formattedTime = new Intl.DateTimeFormat('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(date);

        return {
          id: item.id,
          customerId: item.customerId,
          createdAt: item.createdAt,
          formattedDate: dateOnly,
          formattedTime: formattedTime,
          amount: item.amount,
          status: item.status,
          details: item.details,
          type: item.type,
          payableAmount: item.payableAmount,
          tdsAmount: item.tdsAmount,
          crnNo: item.crnNo || 'N/A',
          phoneNumber:
            item.phoneNumber || item.customer?.user?.phoneNumber || '-',
          fullname: item.fullname || item.customer?.user?.fullname || '-',
          email: item.email || item.customer?.user?.email || '-',
          dateOnly: dateOnly,
        };
      })
      .sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }, [data, selectedFilter]);

  // Group data by date
  const groupedData = useMemo(() => {
    const groups: {[key: string]: any[]} = {};

    processedData.forEach((item: any) => {
      const date = item.dateOnly;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
    });

    return groups;
  }, [processedData]);

  // Calculate summaries for each date
  const dateSummaries = useMemo(() => {
    const summaries: {
      [key: string]: {
        totalAmount: number;
        totalPayable: number;
        totalTDS: number;
        count: number;
      };
    } = {};

    Object.entries(groupedData).forEach(([date, items]) => {
      summaries[date] = {
        totalAmount: items.reduce((sum, item) => sum + item.amount, 0),
        totalPayable: items.reduce((sum, item) => sum + item.payableAmount, 0),
        totalTDS: items.reduce((sum, item) => sum + item.tdsAmount, 0),
        count: items.length,
      };
    });

    return summaries;
  }, [groupedData]);

  const filterOptions = ['All', 'Golden Pair', 'Silver Pair', 'Helping', 'BDF'];
  const totalRecords = processedData.length;
  const totalDays = Object.keys(groupedData).length;

  // Initially expand all dates
  React.useEffect(() => {
    setExpandedDates(new Set(Object.keys(groupedData)));
  }, [groupedData]);

  return (
    <div className="flex flex-col p-4">
      {/* Header with Filters and Export */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-800 text-2xl font-bold">
            {selectedFilter
              ? `${selectedFilter} Pending Commissions`
              : 'All Pending Commissions'}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Filter Dropdown */}
          <select
            value={selectedFilter || 'All'}
            onChange={(e) =>
              setSelectedFilter(
                e.target.value === 'All' ? null : e.target.value,
              )
            }
            className="rounded border border-stroke bg-white px-4 py-2 text-sm focus:border-primary focus:outline-none dark:border-strokedark dark:bg-boxdark"
          >
            {filterOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {totalRecords > 0 && (
            <button
              onClick={handleExportToExcel}
              className="rounded bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600"
            >
              Export to Excel
            </button>
          )}
        </div>
      </div>

      {totalRecords === 0 ? (
        <div className="rounded-sm border border-stroke bg-white p-8 text-center shadow-default dark:border-strokedark dark:bg-boxdark">
          <h3 className="text-lg font-medium">No commissions found</h3>
          <p className="text-gray-500 mt-2">
            {selectedFilter
              ? `No ${selectedFilter} commissions available`
              : 'No pending commissions available'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedData).map(([date, items]) => (
            <div
              key={date}
              className="overflow-hidden rounded-lg border border-stroke bg-white shadow"
            >
              {/* Date Header */}
              <div
                onClick={() => toggleDate(date)}
                className="bg-gray-50 hover:bg-gray-100 flex cursor-pointer items-center justify-between px-4 py-3"
              >
                <div className="flex items-center gap-2">
                  {expandedDates.has(date) ? (
                    <ChevronDown size={20} className="text-gray-600" />
                  ) : (
                    <ChevronRight size={20} className="text-gray-600" />
                  )}
                  <Calendar size={18} className="text-gray-500" />
                  <h2 className="text-gray-700 text-lg font-semibold">
                    {date}
                  </h2>
                </div>

                <div className="flex items-center gap-6">
                  {/* Pay All button for this date */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePayAllForDate(date);
                    }}
                    className="rounded bg-green-500 px-3 py-1 text-xs text-white transition-colors hover:bg-green-600"
                  >
                    Pay All
                  </button>
                </div>
              </div>

              {/* Expanded Table */}
              {expandedDates.has(date) && (
                <div className="border-t border-stroke p-4">
                  <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto border-collapse">
                      <thead>
                        <tr className="bg-gray-2 dark:bg-meta-4">
                          <th className="px-4 py-4 text-left font-medium">
                            Time
                          </th>
                          <th className="px-4 py-4 text-left font-medium">
                            CRN No
                          </th>
                          <th className="px-4 py-4 text-left font-medium">
                            Full Name
                          </th>
                          <th className="px-4 py-4 text-left font-medium">
                            Phone
                          </th>
                          <th className="px-4 py-4 text-left font-medium">
                            Amount
                          </th>
                          <th className="px-4 py-4 text-left font-medium">
                            Payable
                          </th>
                          <th className="px-4 py-4 text-left font-medium">
                            TDS
                          </th>
                          <th className="px-4 py-4 text-left font-medium">
                            Details
                          </th>
                          <th className="px-4 py-4 text-left font-medium">
                            Type
                          </th>
                          <th className="px-4 py-4 text-left font-medium">
                            Status
                          </th>
                          <th className="px-4 py-4 text-left font-medium">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((row, index) => (
                          <tr
                            key={row.id || index}
                            className="hover:bg-gray-50 border-b border-stroke dark:border-strokedark"
                          >
                            <td className="px-4 py-2 text-left text-sm">
                              {row.formattedTime}
                            </td>
                            <td className="px-4 py-2 text-left text-sm">
                              {row.crnNo}
                            </td>
                            <td className="px-4 py-2 text-left text-sm">
                              {row.fullname}
                            </td>
                            <td className="px-4 py-2 text-left text-sm">
                              {row.phoneNumber}
                            </td>
                            <td className="px-4 py-2 text-left text-sm font-medium">
                              ₹{row.amount}
                            </td>
                            <td className="px-4 py-2 text-left text-sm text-green-600">
                              ₹{row.payableAmount}
                            </td>
                            <td className="px-4 py-2 text-left text-sm text-red-600">
                              ₹{row.tdsAmount}
                            </td>
                            <td className="px-4 py-2 text-left text-sm">
                              {row.details}
                            </td>
                            <td className="px-4 py-2 text-left text-sm">
                              {row.type}
                            </td>
                            <td className="px-4 py-2 text-left">
                              <span className="rounded bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                                {row.status}
                              </span>
                            </td>
                            <td className="px-4 py-2 text-left">
                              <button
                                onClick={() => handlePayClick(row)}
                                className="rounded bg-green-500 px-3 py-1 text-xs text-white transition-colors hover:bg-green-600"
                              >
                                Pay
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pay All Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="mx-auto mt-10 max-w-sm rounded bg-white p-6 shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-999"
      >
        <h2 className="text-lg font-semibold">Confirm Payment</h2>
        <p className="mt-2 text-sm">
          Are you sure you want to pay all commissions for{' '}
          {selectedDateForPayAll || 'all dates'}?
          {selectedDateForPayAll && (
            <span className="mt-1 block font-medium">
              Total records:{' '}
              {selectedDateForPayAll
                ? groupedData[selectedDateForPayAll]?.length
                : totalRecords}
            </span>
          )}
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={confirmPayAll}
            className="rounded bg-green-500 px-4 py-2 text-sm text-white hover:bg-green-600"
          >
            Confirm
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-300 text-gray-700 hover:bg-gray-400 rounded px-4 py-2 text-sm"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default DisplayPendingCommisionReport;
