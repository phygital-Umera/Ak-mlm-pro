/*eslint-disable*/
import React, {useState, useMemo, useEffect} from 'react';
import {
  useFetchAdminCommsion,
  usePayCommission,
  usePayCommissionAll,
  usePayBulkCommission,
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
  const {mutate: payCommission} = usePayCommission();
  const {mutate: payAllCommission} = usePayCommissionAll();
  const {mutate: payBulkCommission} = usePayBulkCommission();

  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateForPayAll, setSelectedDateForPayAll] = useState<
    string | null
  >(null);
  const [isProcessingBulk, setIsProcessingBulk] = useState(false);
  const [bulkPaymentIds, setBulkPaymentIds] = useState<string[]>([]);

  // Process data with useMemo - this is safe as it's a hook, not a conditional return
  const filterData = (data: any[], filter: string | null) => {
    if (!data) return [];

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
    if (!data) return [];

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

  // useEffect must be called at the top level, not after conditional returns
  useEffect(() => {
    if (Object.keys(groupedData).length > 0) {
      setExpandedDates(new Set(Object.keys(groupedData)));
    }
  }, [groupedData]);

  const handlePayClick = (row: PendingCommission) => {
    payCommission(
      {id: row.id, data: {status: 'PAID'}},
      {
        onSuccess: () => {
          toast.success('Commission paid successfully');
          queryClient.invalidateQueries({queryKey: ['adminCommission']});
        },
        onError: (error) => {
          toast.error('Failed to pay commission');
          console.error('Pay error:', error);
        },
      },
    );
  };

  const handlePayAllForDate = (date: string) => {
    const dateItems = groupedData[date] || [];
    const ids = dateItems.map((item) => item.id);

    setBulkPaymentIds(ids);
    setSelectedDateForPayAll(date);
    setIsModalOpen(true);
  };

  const handlePayAllClick = () => {
    setBulkPaymentIds([]);
    setSelectedDateForPayAll(null);
    setIsModalOpen(true);
  };

  const confirmPayAll = () => {
    setIsProcessingBulk(true);

    if (selectedDateForPayAll) {
      const ids = bulkPaymentIds;

      if (ids.length === 0) {
        toast.error('No commissions found for this date');
        setIsProcessingBulk(false);
        setIsModalOpen(false);
        return;
      }

      const loadingToast = toast.loading(
        `Paying ${ids.length} commissions for ${selectedDateForPayAll}...`,
      );

      // Send just the IDs array, not an object
      payBulkCommission(ids, {
        // First parameter is ids array
        onSuccess: (data) => {
          toast.dismiss(loadingToast);
          toast.success(
            `Successfully paid ${ids.length} commissions for ${selectedDateForPayAll}`,
          );
          queryClient.invalidateQueries({queryKey: ['adminCommission']});
          setIsProcessingBulk(false);
          setIsModalOpen(false);
          setSelectedDateForPayAll(null);
          setBulkPaymentIds([]);
        },
        onError: (error) => {
          toast.dismiss(loadingToast);
          toast.error('Failed to pay commissions');
          console.error('Bulk payment error:', error);
          setIsProcessingBulk(false);
          setIsModalOpen(false);
          setSelectedDateForPayAll(null);
          setBulkPaymentIds([]);
        },
      });
    } else {
      // Pay all commissions across all dates
      const loadingToast = toast.loading('Paying all commissions...');

      payAllCommission(undefined, {
        onSuccess: () => {
          toast.dismiss(loadingToast);
          toast.success('All commissions paid successfully');
          queryClient.invalidateQueries({queryKey: ['adminCommission']});
          setIsProcessingBulk(false);
          setIsModalOpen(false);
        },
        onError: (error) => {
          toast.dismiss(loadingToast);
          toast.error('Failed to pay all commissions');
          console.error('Pay all error:', error);
          setIsProcessingBulk(false);
          setIsModalOpen(false);
        },
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDateForPayAll(null);
    setBulkPaymentIds([]);
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
      toast.success(`Exported ${exportData.length} records to Excel`);
    } else {
      toast.error('No data to export');
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

  const filterOptions = ['All', 'Golden Pair', 'Silver Pair', 'Helping', 'BDF'];
  const totalRecords = processedData.length;
  const totalDays = Object.keys(groupedData).length;

  // NOW we can have conditional returns AFTER all hooks are called
  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="rounded-sm border border-stroke bg-white p-8 text-center shadow-default dark:border-strokedark dark:bg-boxdark">
        <h3 className="text-lg font-medium text-black dark:text-white">
          Error loading commission data
        </h3>
        <p className="text-gray-500 mt-2">
          Please try again later or contact support
        </p>
      </div>
    );
  }

  if (!isSuccess || !data) {
    return (
      <div className="rounded-sm border border-stroke bg-white p-8 text-center shadow-default dark:border-strokedark dark:bg-boxdark">
        <h3 className="text-lg font-medium text-black dark:text-white">
          No commission data available
        </h3>
        <p className="text-gray-500 mt-2">
          Unable to fetch commission data at this time
        </p>
      </div>
    );
  }

  return (
    <div className="flex auto-rows-max flex-col p-4">
      {/* Header with Filters and Export */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-800 text-2xl font-bold">
            {selectedFilter
              ? `${selectedFilter} Pending Commissions`
              : 'All Pending Commissions'}
          </h1>
          <p className="text-gray-500 text-sm">
            {totalRecords} pending records across {totalDays} days
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Pay All Button */}
          {totalRecords > 0 && (
            <button
              onClick={handlePayAllClick}
              className="rounded bg-green-600 px-4 py-2 text-sm text-white transition-colors hover:bg-green-700"
            >
              Pay All ({totalRecords})
            </button>
          )}

          {/* Export Button */}
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
          <h3 className="text-lg font-medium text-black dark:text-white">
            No commissions found
          </h3>
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
                className="bg-gray-50 hover:bg-gray-100 flex cursor-pointer auto-rows-max items-center justify-between px-4 py-3"
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
                  {/* Date Summary */}
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-600 font-medium">
                      Amount:{' '}
                      <span className="text-gray-900">
                        ₹{dateSummaries[date]?.totalAmount}
                      </span>
                    </span>
                    <span className="font-medium text-green-600">
                      Payable:{' '}
                      <span className="text-green-700">
                        ₹{dateSummaries[date]?.totalPayable}
                      </span>
                    </span>
                  </div>

                  {/* Pay All button for this date */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePayAllForDate(date);
                    }}
                    className="rounded bg-green-500 px-3 py-1 text-xs text-white transition-colors hover:bg-green-600"
                  >
                    Pay All ({items.length})
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
                                disabled={isProcessingBulk}
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
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-999"
      >
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <h2 className="text-gray-900 text-lg font-semibold">
            Confirm Payment
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            {selectedDateForPayAll ? (
              <>
                Are you sure you want to pay all commissions for{' '}
                <span className="font-medium">{selectedDateForPayAll}</span>?
                <br />
                <span className="bg-gray-50 mt-2 block rounded p-2">
                  Total records:{' '}
                  <span className="font-bold">{bulkPaymentIds.length}</span>
                  <br />
                  Total amount:{' '}
                  <span className="font-bold">
                    ₹
                    {groupedData[selectedDateForPayAll]?.reduce(
                      (sum, item) => sum + item.amount,
                      0,
                    )}
                  </span>
                </span>
              </>
            ) : (
              <>
                Are you sure you want to pay all commissions (
                <span className="font-bold">{totalRecords}</span> records)
                across all dates?
              </>
            )}
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={confirmPayAll}
              disabled={isProcessingBulk}
              className="rounded bg-green-500 px-4 py-2 text-sm text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isProcessingBulk ? 'Processing...' : 'Confirm'}
            </button>
            <button
              onClick={closeModal}
              disabled={isProcessingBulk}
              className="bg-gray-300 text-gray-700 hover:bg-gray-400 rounded px-4 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DisplayPendingCommisionReport;
