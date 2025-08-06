/* eslint-disable */
import Loader from '@/components/common/Loader';
import GenericTable from '@/components/Forms/Table/GenericTable';
import {useFetchAdminCommsion} from '@/lib/react-query/Admin/Home/commission';
import {Column} from '@/types';
import React, {useEffect, useState} from 'react';

type PaidCommission = {
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
};

const columns: Column<PaidCommission>[] = [
  {header: 'Date', accessor: 'createdAt'},
  {header: 'Full Name', accessor: 'fullname'},
  {header: 'CRN No', accessor: 'crnNo'},
  {header: 'Phone', accessor: 'phoneNumber'},
  {header: 'Type', accessor: 'type'},
  {header: 'Amount', accessor: 'amount', sortable: true},
];

const DisplayCommisionReport: React.FC = () => {
  const {
    data: paidCommissionData,
    isSuccess,
    isError,
    isPending,
  } = useFetchAdminCommsion();

  const [data, setData] = useState<PaidCommission[]>([]);

  useEffect(() => {
    if (isSuccess && paidCommissionData) {
      const transformed: PaidCommission[] = paidCommissionData
        .filter((item: any) => item.status === 'PAID' && item.amount > 0)
        .map((item: any) => ({
          id: item.id,
          customerId: item.customerId,
          createdAt: new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }).format(new Date(item.createdAt)),
          amount: item.amount,
          status: item.status,
          details: item.details,
          type: item.type,
          payableAmount: item.payableAmount,
          tdsAmount: item.tdsAmount,
          crnNo: item.crnNo,
          phoneNumber:
            item.phoneNumber || item.customer?.user?.phoneNumber || '-',
          fullname: item.fullname || item.customer?.user?.fullname || '-',
        }));

      setData(transformed);
    }
  }, [isSuccess, paidCommissionData]);

  if (isPending) return <Loader />;
  if (isError) return <div>Error loading commission data</div>;

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
