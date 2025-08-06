import React, {useState, useEffect} from 'react';
import GenericTable from '@/components/Forms/Table/GenericTable';
import {Column} from '@/types';
import {useFetchPayout} from '@/lib/react-query/Customer/payout';

interface PayoutEntry {
  srNo: number;
  date: string;
  binary: number;
  generation: number;
  direct: number;
  total: number;
}

const HistoryPayout: React.FC = () => {
  const {data: apiData, isLoading, error} = useFetchPayout();
  const [tableData, setTableData] = useState<PayoutEntry[]>([]);

  useEffect(() => {
    if (apiData?.data && Array.isArray(apiData.data)) {
      const transformedData: PayoutEntry[] = apiData.data.map(
        (item, index) => ({
          srNo: index + 1,
          date: item.Date || '-',
          binary: item.binery || 0,
          generation: item.genration || 0,
          direct: item.direct || 0,
          total:
            (item.binery || 0) + (item.genration || 0) + (item.direct || 0),
        }),
      );
      setTableData(transformedData);
    } else {
      setTableData([]);
    }
  }, [apiData]);

  const columns: Column<PayoutEntry>[] = [
    {header: 'Sr. No.', accessor: 'srNo'},
    {header: 'Date', accessor: 'date'},
    {header: 'Matching Income', accessor: 'binary'},
    {header: 'Direct Sponsor Income', accessor: 'generation'},
    {header: 'Repurchase Income', accessor: 'direct'},
    {header: 'Total', accessor: 'total'},
  ];

  if (isLoading) {
    return <p className="text-center text-blue-600">Loading payout data...</p>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Failed to fetch payout data.
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
