import Loader from '@/components/common/Loader';
import GenericTable, {Column} from '@/components/Forms/Table/GenericTable';
import {useGetCustomersMlm} from '@/lib/react-query/Admin/Roi/roi';
import React from 'react';
import toast from 'react-hot-toast';

type MlmCustomer = {
  crnNo: string;
  phoneNumber: string;
  fullname: string;
  email: string;
  sponsorId: string | null;
  directSponsorId: string | null;
};

const MlmColumns: Column<MlmCustomer>[] = [
  {header: 'CRN No', accessor: 'crnNo', sortable: true},
  {header: 'Full Name', accessor: 'fullname'},
  {header: 'Phone', accessor: 'phoneNumber'},
  {header: 'Email', accessor: 'email'},
  {header: 'Sponsor ID', accessor: 'sponsorId'},
  {header: 'Direct Sponsor ID', accessor: 'directSponsorId'},
];

const CustomerMlm = () => {
  const {data: customerMlm, isSuccess, isLoading} = useGetCustomersMlm();
  console.log('====================================');
  console.log('customerMlm', customerMlm);
  console.log('====================================');
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <GenericTable
        data={customerMlm || []}
        columns={MlmColumns}
        itemsPerPage={15}
        searchAble
        title="Customer MLM List"
      />
    </div>
  );
};

export default CustomerMlm;
