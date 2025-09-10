/*eslint-disable */

import {Column} from '@/components/Forms/GenericImageTable';
import GenericTable from '@/components/Forms/Table/GenericTable';
import {useGetAdminWalletHistory} from '@/lib/react-query/Admin/WalletHistory/wallethistory';
import {useState} from 'react';
import React from 'react';

// ✅ Corrected data type according to API response
type history = {
  crnNo: string;
  direct: number;
  binery: number;
  genration: number;
  createdAt: string; // Map 'Date' to this in transform
};

const WalletHistory = () => {
  const {data: rawData} = useGetAdminWalletHistory();

  // ✅ Transform API data: rename `Date` to `createdAt`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const historyData: history[] =
    rawData?.map((item: any) => ({
      crnNo: item.crnNo,
      direct: item.direct,
      binery: item.binery,
      genration: item.genration,
      createdAt: item.Date.split('/').reverse().join('-'), // convert DD/MM/YYYY → YYYY-MM-DD
    })) || [];

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredData = historyData.filter((item) => {
    const created = new Date(item.createdAt).toISOString().split('T')[0];
    const start = startDate
      ? new Date(startDate).toISOString().split('T')[0]
      : '';
    const end = endDate ? new Date(endDate).toISOString().split('T')[0] : '';

    return (!start || created >= start) && (!end || created <= end);
  });

  const columns: Column<history>[] = [
    {header: 'Date', accessor: 'createdAt'},
    {header: 'CRN No', accessor: 'crnNo'},
    {header: 'Direct', accessor: 'direct'},
    {header: 'Binery', accessor: 'binery'},
    {header: 'Genration', accessor: 'genration'},
  ];

  return (
    <div className="dark:bg-gray-800 space-y-4 border border-stroke p-6 dark:border-strokedark dark:bg-black dark:text-white">
      <div className="mb-6 flex flex-col items-start gap-4">
        <div>
          <label className="text-gray-600 text-md p-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="rounded border border-stroke bg-transparent px-2 py-1 outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div>
          <label className="text-gray-600 text-md p-2">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="rounded border border-stroke bg-transparent px-2 py-1 outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
      </div>

      <GenericTable
        columns={columns}
        data={filteredData}
        title="Wallet Report"
        searchAble
      />
    </div>
  );
};

export default WalletHistory;
