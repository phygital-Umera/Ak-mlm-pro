import React from 'react';

import '../app.css';
import {TreeNode} from '@/components/Network';
import {useGetNetwotkTree} from '@/lib/react-query/network';
import {useAuthContext} from '@/context/AuthContext';
import Loader from '@/components/common/Loader';

const Network = () => {
  const {user} = useAuthContext();

  const {data, isSuccess, isPending, isError} = useGetNetwotkTree();

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

export default Network;
