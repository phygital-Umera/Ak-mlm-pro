import Loader from '@/components/common/Loader';
import {useAuthContext} from '@/context/AuthContext';
import {useGetNewNetwotkTree} from '@/lib/react-query/network';
import React from 'react';
import '../app.css';
import {TreeNode} from '@/components/Network';

const NetworkTreeNew = () => {
  const {user} = useAuthContext();
  // console.log('user', user);
  const id = user?.user?.id;
  const {data, isSuccess, isPending, isError} = useGetNewNetwotkTree(id || '');
  // console.log('data', data);

  return (
    <>
      {isPending ? (
        <Loader />
      ) : isSuccess ? (
        <div className="dottedBackground mx-8">
          <TreeNode network={data} />
        </div>
      ) : (
        <div className="dottedBackground mx-8">Error loading network.</div>
      )}
    </>
  );
};

export default NetworkTreeNew;
