import React, {useEffect, useState} from 'react';
import {
  useGetAdminPaidCommission,
  usePayCommission,
  usePayCommissionAll,
} from '@/lib/react-query/Admin/Home/commission';
import Modal from 'react-modal';
import * as XLSX from 'xlsx';
import Loader from '@/components/common/Loader';
import GenericTable from '@/components/Forms/Table/GenericTable';
import {Column} from '@/types';

type PaidCommission = {
  id: string;
  customerId: string;
  creatrdAt: string; // Note: Typo here (should be createdAt), but keeping as is if that's how the API returns it
  amount: number;
  status: 'PAID';
  details: string;
  type: string;
  pairType: string | null;
  payableAmount: number;
  tdsAmount: number;
  bankAccNo: string;
  bankIFSC: string;
  fullname: string;
  phone: string;
  date: string;
};

const columns: Column<PaidCommission>[] = [
  {header: 'Date', accessor: 'date'},
  {header: 'Account Number', accessor: 'bankAccNo'},
  {header: 'Amount', accessor: 'amount', sortable: true},
  {header: 'Bank IFSC', accessor: 'bankIFSC'},
  {header: 'Type', accessor: 'type'},
  {header: 'Full Name', accessor: 'fullname'},
  {header: 'Phone', accessor: 'phone'},
];

const DisplayCommisionReport: React.FC = () => {
  const {
    data: paidCommissionData,
    isSuccess,
    isError,
    isPending,
  } = useGetAdminPaidCommission();

  // console.log('paidCommissionData', paidCommissionData);

  const [data, setData] = useState<PaidCommission[]>([]);

  // const handleExportToExcel = () => {
  //   if (data && data.length > 0) {
  //     const formattedData = data.map((item) => ({
  //       Date: item.date,
  //       'Account No': item.bankAccNo,
  //       Amount: item.amount,
  //       IFSC: item.bankIFSC,
  //       Details: item.details,
  //       'Full Name': item.fullname,
  //       Mobile: item.phone,
  //     }));

  //     const ws = XLSX.utils.json_to_sheet(formattedData);
  //     const wb = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(wb, ws, 'Paid Commissions');
  //     XLSX.writeFile(wb, 'paid_commissions.xlsx');
  //   }
  // };

  useEffect(() => {
    if (paidCommissionData && paidCommissionData.PaidCommitions) {
      setData(
        paidCommissionData.PaidCommitions.sort(
          (a: PaidCommission, b: PaidCommission) =>
            b.date.localeCompare(a.date),
        ).map((item: PaidCommission) => ({
          ...item,
          date: new Date(item.date).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          // Add any transformations here if needed
        })),
      );
    }
  }, [paidCommissionData]);

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading commission data</div>;
  }

  return (
    <div className="p-4">
      <GenericTable
        data={data}
        columns={columns}
        itemsPerPage={50}
        searchAble
      />
    </div>
  );
};

export default DisplayCommisionReport;
