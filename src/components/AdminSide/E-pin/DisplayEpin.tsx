import Loader from '@/components/common/Loader';
import GenericTable, {Column} from '@/components/Forms/Table/GenericTable';
import {getAdminEpins} from '@/lib/api/Admin/Epin/epin';
import {
  useGetAdminPins,
  useGetAllEPins,
  useGetCustomerEpins,
} from '@/lib/react-query/Admin/Epin/epin';
import React, {useMemo, useState} from 'react';
import toast from 'react-hot-toast';

type EpinData = {
  id: string;
  epinNo: string;
  createdAt: string; // ISO date format
  isUsed: boolean;
  usedAt: string | null;
  usedBy: string | null;
  type: string;
};

const EpinColumn: Column<EpinData>[] = [
  {header: 'Created At', accessor: 'createdAt'},
  {header: 'E-Pin No', accessor: 'epinNo'},
  {header: 'Used', accessor: 'isUsed', sortable: true},
  {header: 'Used By', accessor: 'usedBy'},
  {header: 'Type', accessor: 'type'},
];

const DisplayEpin: React.FC = () => {
  const {data: epinData, isSuccess, isLoading} = useGetAdminPins();
  const [selectedStatus, setSelectedStatus] = useState('all');
  console.log('epindata', epinData);
  const formattedData =
    isSuccess && Array.isArray(epinData)
      ? epinData.map((epin: EpinData) => ({
          id: epin.id,
          epinNo: epin.epinNo,
          type: epin.type,
          createdAt: new Date(epin.createdAt).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
          isUsed: epin.isUsed,
          usedAt: epin.usedAt
            ? new Date(epin.usedAt).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })
            : 'null',
          usedBy: epin.usedBy || '-',
        }))
      : [];

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  const filteredData = useMemo(() => {
    if (selectedStatus === 'all') return formattedData;
    return formattedData.filter(
      (item) => item.type?.toLowerCase() === selectedStatus.toLowerCase(),
    );
  }, [formattedData, selectedStatus]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div>
        <GenericTable
          data={filteredData || []}
          columns={EpinColumn}
          itemsPerPage={15}
          searchAble
          title=" Admin E-Pin"
          key={'epin'}
          onCopy={(item: EpinData) => {
            navigator.clipboard.writeText(item.epinNo);
            toast.success('Copied to clipboard');
          }}
          filterComponent={
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              //   border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary sm:w-[300px]"
              // /></div>
              className="active:border-primar rounded border border-stroke bg-transparent px-4 py-3 outline-none focus:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            >
              <option value="all">All</option>
              <option value="zero">Zero</option>
              <option value="regular">Regular</option>
            </select>
          }
        />
      </div>
    </div>
  );
};

export default DisplayEpin;
