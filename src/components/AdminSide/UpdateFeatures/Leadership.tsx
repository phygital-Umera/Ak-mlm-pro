import GenericTable, {Column} from '@/components/Forms/Table/GenericTable';
import {useGetLeadershipFund} from '@/lib/react-query/Admin/Updatefeatures/updatefeatures';
import React, {useEffect, useState} from 'react';

type CustomerData = {
  name: string;
  crnNo: string;
  phone: string;
  receivedFund: number;
  nextFund: number;
};

const Leadership = () => {
  const [customerData, setCustomerData] = useState<CustomerData[]>([]);

  const {data: LeadershipData} = useGetLeadershipFund();
  // console.log(LeadershipData);
  useEffect(() => {
    if (LeadershipData) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mappedData = LeadershipData?.map((customer: any) => ({
        name: customer.name,
        crnNo: customer.crnNo,
        phone: customer.phone,
        receivedFund: customer.Commission,
        nextFund: customer.nextIncomme,
      }));
      setCustomerData(mappedData);
    }
  }, [LeadershipData]);

  const columns: Column<CustomerData>[] = [
    {header: 'Name', accessor: 'name'},
    {header: 'Customer ID', accessor: 'crnNo'},
    {header: 'Mobile No', accessor: 'phone'},
    {header: 'Received Fund', accessor: 'receivedFund'},
    {header: 'Next Fund', accessor: 'nextFund'},
  ];

  // const retData: CustomerData[] = [
  //   {
  //     name: 'John Doe',
  //     crnNo: '123456',
  //     phone: '1234567890',
  //     paidFund: 5000,
  //     nextFund: 5000,
  //   },
  //   {
  //     name: 'John Doe',
  //     crnNo: '123456',
  //     phone: '1234567890',
  //     paidFund: 5000,
  //     nextFund: 5000,
  //   },
  // ];

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

export default Leadership;
