import React, {useState, useEffect} from 'react';
import GenericTable from '@/components/Forms/Table/GenericTable';
import {Column} from '@/types';
import {useFetchPayout} from '@/lib/react-query/Customer/payout';

interface PayoutEntry {
  srNo: number;
  crn: string;
  name: string;
  binary: number;
  royalty: number;
  repurchase: number;
  total: number;
}

// Static fallback data
const staticData: PayoutEntry[] = [
  {
    srNo: 1,
    crn: 'CRN001',
    name: 'John Doe',
    binary: 1000,
    royalty: 500,
    repurchase: 300,
    total: 1800,
  },
  {
    srNo: 2,
    crn: 'CRN002',
    name: 'Jane Smith',
    binary: 800,
    royalty: 200,
    repurchase: 400,
    total: 1400,
  },
];

const HistoryPayout: React.FC = () => {
  const {data: apiData, isLoading, error} = useFetchPayout();
  const [tableData, setTableData] = useState<PayoutEntry[]>([]);

  useEffect(() => {
    if (apiData?.data && apiData.data.length > 0) {
      setTableData(apiData.data);
    } else {
      setTableData(staticData); // fallback if no API data
    }
  }, [apiData]);

  const columns: Column<PayoutEntry>[] = [
    {header: 'Sr. No.', accessor: 'srNo'},
    {header: 'CRN', accessor: 'crn'},
    {header: 'Name', accessor: 'name'},
    {header: 'Binary', accessor: 'binary'},
    {header: 'Royalty', accessor: 'royalty'},
    {header: 'Repurchase', accessor: 'repurchase'},
    {header: 'Total', accessor: 'total'},
  ];

  if (isLoading) {
    return <p className="text-center text-blue-600">Loading payout data...</p>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Failed to fetch payout data. Showing default data.
        <GenericTable
          title="Payout History (Static)"
          data={staticData}
          columns={columns}
          itemsPerPage={5}
        />
      </div>
    );
  }

  return (
    <GenericTable
      title="Payout History"
      data={tableData}
      columns={columns}
      itemsPerPage={5}
    />
  );
};

export default HistoryPayout;
