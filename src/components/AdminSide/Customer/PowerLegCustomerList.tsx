import React, {useEffect, useState} from 'react';
import GenericTable from '@/components/Forms/Table/GenericTable';
import {useGetCustomer} from '@/lib/react-query/Customer/commision';
import {Column} from '@/types';
import {useNavigate} from '@tanstack/react-router';
import {useFetchCustomerList} from '@/lib/react-query/Admin/Home/adminHome';
import Loader from '@/components/common/Loader';
import {useAdminLogin, useCustomerLogin} from '@/lib/react-query/Auth/auth';
import {QUERY_KEYS} from '@/lib/react-query/QueryKeys';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import {useAuthContext} from '@/context/AuthContext';
import {useGetPowerLeg} from '@/lib/react-query/Admin/PowerLeg/powerleg';

type CustomerData = {
  powerBranch: string;
  crnNo: string;
  ispowerLeg: string;
  powerCount: string;
  // sponsorId: string;
  // password: string;
};
interface DecodedToken extends JwtPayload {
  user: {
    role: string;
  };
}

const columns: Column<CustomerData>[] = [
  // {header: 'Name', accessor: 'fullname'},
  {header: 'Customer ID', accessor: 'crnNo'},
  {header: 'Power Leg', accessor: 'ispowerLeg'},
  {header: 'Power Branch', accessor: 'powerBranch'},
  {header: 'Power Count', accessor: 'powerCount'},
  // {header: 'Password', accessor: 'password'},
];

const PowerLegCustomerList: React.FC = () => {
  const navigate = useNavigate();
  const {data: apiData, isLoading, error} = useGetPowerLeg();
  // const {data:apiData, isLoading, error } = useFetchCustomerList();
  console.log('====================================');
  console.log('apiData', apiData);
  console.log('====================================');
  const [customerData, setCustomerData] = useState<CustomerData[]>([]);

  useEffect(() => {
    if (apiData) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mappedData = apiData?.map((customer: any) => ({
        id: customer.id,
        ispowerLeg: customer.ispowerLeg,
        crnNo: customer.crnNo,
        powerBranch: customer.powerBranch,
        powerCount: customer.powerCount,
        // sponsorId: customer.sponsorId,
        // password: customer.password,
        action: 'Edit/Delete',
      }));
      // Sort customers by creation date to show new customers at the top
      const sortedData = mappedData.sort((a, b) =>
        b.crnNo.localeCompare(a.crnNo),
      );
      setCustomerData(sortedData);
    }
  }, [apiData]);

  const handleEdit = (item) => {
    navigate({
      to: `/admin/powerleg/${item.crnNo}`,
    });
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error fetching customer data.</div>;

  return (
    <div>
      <GenericTable
        title="Customer List"
        data={customerData}
        columns={columns}
        itemsPerPage={15}
        searchAble
        onEdit={handleEdit}
        // onLogin={handleLogin}
      />
    </div>
  );
};

export default PowerLegCustomerList;
