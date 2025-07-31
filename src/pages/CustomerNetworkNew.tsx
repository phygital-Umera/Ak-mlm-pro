import React from 'react';

import '../app.css';
import {TreeNode} from '@/components/Network';
import {useAuthContext} from '@/context/AuthContext';
import {
  useGetNetwotkTree,
  useGetNewNetwotkTree,
  useGetNewNetwotkTreeCustomer,
} from '@/lib/react-query/network';

const CustomerNetworkNew = () => {
  const {user} = useAuthContext();
  const id = user?.user?.id;
  const {data, isPending, isError, isSuccess} = useGetNewNetwotkTreeCustomer(
    id || '',
  );
  // console.log('data', data);
  //   const staticNetworkData = {
  //     name: 'Root',
  //     data: {
  //       username: 'root',
  //       id: '1',
  //       first_name: 'Root Name',
  //       sponserer_username: 'sponsor',
  //     },
  //     children: [
  //       {
  //         name: 'Child 1',
  //         data: {
  //           username: 'child1',
  //           id: '2',
  //           first_name: 'Child One',
  //           sponserer_username: 'sponsor1',
  //         },
  //         children: [
  //           {
  //             name: 'Grandchild 1',
  //             data: {
  //               username: 'grandchild1',
  //               id: '3',
  //               first_name: 'Grandchild One',
  //               sponserer_username: 'sponsor2',
  //             },
  //             children: [],
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Child 2',
  //         data: {
  //           username: 'child2',
  //           id: '4',
  //           first_name: 'Child Two',
  //           sponserer_username: 'sponsor3',
  //         },
  //         children: [],
  //       },
  //     ],
  //   };
  return (
    <>
      {isPending ? (
        <div className="dottedBackground mx-8">Loading...</div>
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

export default CustomerNetworkNew;
