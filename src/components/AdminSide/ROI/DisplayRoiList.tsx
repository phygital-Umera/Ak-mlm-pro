import GenericTable, {Column} from '@/components/Forms/Table/GenericTable';
import {useGetRoiList} from '@/lib/react-query/Admin/Roi/roi';
import React from 'react';

type RoiList = {
  id: string;
  fullname: string;
  pairCount: string;
  amount: string;
  crnNo: string;
  createdAt: string;
  isUsed: boolean;
  days_remaining: string;
  usedAt: string | null;
  usedBy: string | null;
};

const DisplayRoiList = () => {
  const {data: RoiList} = useGetRoiList();
  console.log('====================================');
  console.log('RoiList', RoiList);
  console.log('====================================');
  const RoiColumn: Column<RoiList>[] = [
    {
      header: 'Date',
      accessor: 'createdAt',
      render: (item) => new Date(item.createdAt).toLocaleString('en-IN'),
    },
    {header: 'CRN No', accessor: 'crnNo', sortable: true},
    {header: 'Name', accessor: 'fullname'},
    {header: 'Amount', accessor: 'pairCount'},
    {header: 'Days', accessor: 'days_remaining'},
  ];

  return (
    <div>
      <div>
        <GenericTable
          data={RoiList || []}
          columns={RoiColumn}
          itemsPerPage={15}
          searchAble
          title=" Roi List"
          //   key={'epin'}
          //   onCopy={(item: EpinData) => {
          //     navigator.clipboard.writeText(item.epinNo);
          //     toast.success('Copied to clipboard');
          //   }}
        />
      </div>
    </div>
  );
};

export default DisplayRoiList;
