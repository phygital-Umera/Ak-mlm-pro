import GenericTable, {Column} from '@/components/Forms/Table/GenericTable';
import {useGetRetirement} from '@/lib/react-query/Admin/Updatefeatures/updatefeatures';
import React, {useEffect, useState} from 'react';

type CustomerData = {
  name: string;
  crnNo: string;
  phone: string;
  teamCount: number;
  days: number;
  commission: number;
  remainingdays: number;
};

const RetirementFund = () => {
  const [customerData, setCustomerData] = useState<CustomerData[]>([]);

  const {data: RetirementData} = useGetRetirement();
  console.log(RetirementData);

  useEffect(() => {
    if (RetirementData) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mappedData = RetirementData?.map((customer: any) => ({
        name: customer.name,
        crnNo: customer.crnNo,
        phone: customer.phone,
        teamCount: customer.customerCount,
        days: customer.dayCount,
        commission: customer.commission,
        remainingdays: customer.remainingdays,
      }));
      setCustomerData(mappedData);
    }
  }, [RetirementData]);

  const columns: Column<CustomerData>[] = [
    {header: 'Name', accessor: 'name'},
    {header: 'Customer ID', accessor: 'crnNo'},
    {header: 'Mobile No', accessor: 'phone'},
    {header: 'Total Team', accessor: 'teamCount'},
    {header: 'Days', accessor: 'days'},
    {header: 'Commission', accessor: 'commission'},
    {header: 'Current Day', accessor: 'remainingdays'},
  ];

  return (
    <div>
      <GenericTable
        title="Customer List"
        data={customerData}
        columns={columns}
        itemsPerPage={15}
        searchAble
      />
    </div>
  );
};

export default RetirementFund;
