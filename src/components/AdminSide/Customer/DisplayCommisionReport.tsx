/* eslint-disable */
import Loader from '@/components/common/Loader';
import GenericTable from '@/components/Forms/Table/GenericTable';
import {useFetchAdminCommsion} from '@/lib/react-query/Admin/Home/commission';
import {Column} from '@/types';
import React, {useEffect, useMemo, useState} from 'react';
import {ChevronDown, ChevronRight, Calendar} from 'lucide-react';

type Commission = {
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
  dateGroup?: string;
};

const columns: Column<Commission>[] = [
  {header: 'Date', accessor: 'createdAt'},
  {header: 'Full Name', accessor: 'fullname'},
  {header: 'CRN No', accessor: 'crnNo'},
  {header: 'Phone', accessor: 'phoneNumber'},
  {header: 'Email', accessor: 'email'},
  {header: 'Type', accessor: 'type'},
  {header: 'Details', accessor: 'details'},
  {header: 'Amount (₹)', accessor: 'amount', sortable: true},
  {header: 'Payable (₹)', accessor: 'payableAmount', sortable: true},
  {header: 'TDS (₹)', accessor: 'tdsAmount', sortable: true},
  {header: 'Status', accessor: 'status'},
];

const DisplayCommisionReport: React.FC = () => {
  const {
    data: commissionData,
    isSuccess,
    isError,
    isPending,
  } = useFetchAdminCommsion();

  const [data, setData] = useState<Commission[]>([]);
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isSuccess && commissionData) {
      const transformed: Commission[] = commissionData
        .filter((item: any) => item.amount > 0)
        .map((item: any) => {
          const date = new Date(item.createdAt);
          const formattedDate = new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }).format(date);

          // Get date only for grouping (without time)
          const dateOnly = new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }).format(date);

          return {
            id: item.id,
            customerId: item.customerId,
            createdAt: formattedDate,
            dateOnly: dateOnly,
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
          };
        })
        .sort((a: any, b: any) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });

      setData(transformed);

      // Initially expand all dates
      const dates = new Set(transformed.map((item: any) => item.dateOnly));
      setExpandedDates(dates);
    }
  }, [isSuccess, commissionData]);

  // Group data by date
  const groupedData = useMemo(() => {
    const groups: {[key: string]: Commission[]} = {};

    data.forEach((item: any) => {
      const date = item.dateOnly;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
    });

    return groups;
  }, [data]);

  // Calculate summary for each date
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

  if (isPending) return <Loader />;
  if (isError) return <div>Error loading commission data</div>;

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-gray-800 text-2xl font-bold">Commission Report</h1>
      </div>

      {/* Grouped Data with Collapsible Sections */}
      <div className="space-y-4">
        {Object.entries(groupedData).map(([date, items]) => (
          <div
            key={date}
            className="overflow-hidden rounded-lg border border-stroke bg-white shadow"
          >
            {/* Date Header - Click to expand/collapse */}
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
                <h2 className="text-gray-700 text-lg font-semibold">{date}</h2>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedDates.has(date) && (
              <div className="border-t border-stroke">
                <GenericTable
                  data={items}
                  columns={columns}
                  itemsPerPage={items.length}
                  searchAble={false}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayCommisionReport;
