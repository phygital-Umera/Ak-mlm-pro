import GenericTable from '@/components/Forms/Table/GenericTable';
import React from 'react';
import {Column} from '@/types';
import {useGetDirectCustomer} from '@/lib/react-query/Customer/commision';

type CustomerData = {
  fullname: string;
  crnNo: string;
  phoneNumber: string;
  email: string;
  sponsorId: string;
  password: string;
  id?: string; // Added since your data includes this field
};

const DirectCustomerList = () => {
  const {data: directCustomerData} = useGetDirectCustomer();
  console.log('directCustomerData', directCustomerData);

  const columns: Column<CustomerData>[] = [
    {header: 'Name', accessor: 'fullname'},
    {header: 'Customer ID', accessor: 'crnNo'},
    {header: 'Mobile No', accessor: 'phoneNumber'},
    {header: 'Email', accessor: 'email'},
    // {header: 'Sponsor ID', accessor: 'sponsorId'},
    {header: 'Password', accessor: 'password'},
  ];

  return (
    <div>
      <GenericTable columns={columns} data={directCustomerData || []} />
    </div>
  );
};

export default DirectCustomerList;
