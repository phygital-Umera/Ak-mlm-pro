import React from 'react';

import '../app.css';
import {useGetNetwotkTree} from '@/lib/react-query/network';
import {useAuthContext} from '@/context/AuthContext';
import Loader from '@/components/common/Loader';
import CustomergenTree from '@/components/Network/CustomergenTree';

const CustomerGenNetwork = () => {
  const {user} = useAuthContext();

  const {data, isSuccess, isPending, isError} = useGetNetwotkTree();
  // console.log('====================================');
  // console.log('datasssssssss', data);
  // console.log('====================================');

  return (
    <>
      {isPending ? (
        <Loader />
      ) : isSuccess ? (
        <div className="dottedBackground mx-8">
          <CustomergenTree network={data} />
        </div>
      ) : (
        <div className="dottedBackground mx-8">Error loading network.</div>
      )}
    </>
  );
};

export default CustomerGenNetwork;
