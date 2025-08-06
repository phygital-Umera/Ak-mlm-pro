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

type CustomerData = {
  fullname: string;
  crnNo: string;
  phoneNumber: string;
  email: string;
  sponsorId: string;
  password: string;
};
interface DecodedToken extends JwtPayload {
  user: {
    role: string;
  };
}

const columns: Column<CustomerData>[] = [
  {header: 'Name', accessor: 'fullname'},
  {header: 'Customer ID', accessor: 'crnNo'},
  {header: 'Mobile No', accessor: 'phoneNumber'},
  {header: 'Email', accessor: 'email'},
  // {header: 'Sponsor ID', accessor: 'sponsorId'},
  {header: 'Password', accessor: 'password'},
];

const DisplayCustomerList: React.FC = () => {
  const {mutateAsync: signIn} = useAdminLogin();
  const navigate = useNavigate();
  const {data: apiData, isLoading, error} = useFetchCustomerList();
  const [customerData, setCustomerData] = useState<CustomerData[]>([]);

  useEffect(() => {
    if (apiData) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mappedData = apiData?.map((customer: any) => ({
        id: customer.id,
        fullname: customer.fullname,
        crnNo: customer.crnNo,
        phoneNumber: customer.phoneNumber,
        email: customer.email,
        sponsorId: customer.sponsorId,
        password: customer.password,
        action: 'Edit/Delete',
      }));
      // Sort customers by creation date to show new customers at the top
      const sortedData = mappedData.sort((a, b) =>
        b.crnNo.localeCompare(a.crnNo),
      );
      setCustomerData(sortedData);
    }
  }, [apiData]);

  const {setUser, setIsAuthenticated, setToken, isAuthenticated} =
    useAuthContext();
  const handleLogin = async (item) => {
    console.log(item);
    try {
      const res = await signIn({
        email: item.email,
      });
      console.log('res', res);
      //

      setUser(jwtDecode(res.data.token.accessToken || ''));
      console.log('accessToken', res.data.token.accessToken);
      setToken(res.data?.token);
      console.log('token', res.data?.token);
      setIsAuthenticated(true);
      console.log('isAuthenticated', isAuthenticated);
      const decoded = jwtDecode<DecodedToken>(res.data.token.accessToken || '');
      const role = res.data?.user?.role;
      if (role === 'ADMIN') {
        window.location.href = '/';
      }
      if (role === 'CUSTOMER') {
        window.location.href = '/customer/dashboard';
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item) => {
    navigate({
      to: `/admin/UpdateCustomer/${item.crnNo}`,
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
        onLogin={handleLogin}
      />
    </div>
  );
};

export default DisplayCustomerList;
