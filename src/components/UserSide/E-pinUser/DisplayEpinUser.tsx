/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useState} from 'react';
import {useGetEpins} from '@/lib/react-query/Customer/epin';
import {useAuthContext} from '@/context/AuthContext';
import GenericTable from '@/components/Forms/Table/GenericTable';
import Loader from '@/components/common/Loader';
import toast from 'react-hot-toast';

const DisplayEpinUser: React.FC = () => {
  const {user} = useAuthContext();
  const {data: epinsData, isLoading, error} = useGetEpins();

  const [availableEpins, setAvailableEpins] = useState<any[]>([]);
  const [usedEpins, setUsedEpins] = useState<any[]>([]);

  useEffect(() => {
    if (epinsData) {
      // Filter available epins (isUsed = false)
      const formattedAvailableEpins = epinsData
        .filter((epin: any) => !epin.isUsed)
        .map((epin: any) => ({
          epinNo: epin.epinNo,
          price: epin.price,
          createdAt: epin.createdAt
            ? new Date(epin.createdAt).toLocaleString('en-IN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })
            : 'null',
        }));
      setAvailableEpins(formattedAvailableEpins);

      // Filter used epins (isUsed = true)
      const formattedUsedEpins = epinsData
        .filter((epin: any) => epin.isUsed)
        .map((epin: any) => ({
          epinNo: epin.epinNo,
          price: epin.price,
          requestId: epin.requestId,
          assignedToId: epin.assignedToId,
          createdAt: epin.createdAt
            ? new Date(epin.createdAt).toLocaleString('en-IN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })
            : 'null',
          // requestId: epin.requestId,
          usedAt: epin.usedAt
            ? new Date(epin.usedAt).toLocaleString('en-IN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })
            : 'null',
          usedBy: epin.usedBy,
        }));
      setUsedEpins(formattedUsedEpins);
    }
  }, [epinsData]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error fetching ePin data.</p>;
  }

  const availableEpinsColumns = [
    {header: 'Created At', accessor: 'createdAt'},
    {header: 'Epin Number', accessor: 'epinNo'},

    {header: 'Price', accessor: 'price'},
  ];
  const usedEpinsColumns = [
    {header: 'Created At', accessor: 'createdAt'},
    {header: 'Epin Number', accessor: 'epinNo'},
    {header: 'Used At', accessor: 'usedAt'},
    // {header: 'Used By', accessor: 'usedBy'},
    {header: 'Price', accessor: 'price'},
    {header: 'Assigned To Id', accessor: 'assignedToId'},
  ];

  return (
    <div>
      <div>
        <GenericTable
          title="Available Epins"
          itemsPerPage={5}
          data={availableEpins}
          columns={availableEpinsColumns}
          onCopy={(item: {epinNo: string}) => {
            navigator.clipboard.writeText(item.epinNo);
            toast.success('Copied to clipboard');
          }}
        />
      </div>
      <div style={{marginTop: '2rem'}}>
        <GenericTable
          title="Used Epins"
          data={usedEpins}
          columns={usedEpinsColumns}
        />
      </div>
    </div>
  );
};

export default DisplayEpinUser;
