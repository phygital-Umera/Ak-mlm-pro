/* eslint-disable */

import GenericTable from '@/components/Forms/Table/GenericTable';
import React, {useEffect, useState} from 'react';
import {Column} from '@/types';
import {useGoldenIncomeList} from '@/lib/react-query/Admin/Home/adminHome';

type CustomerData = {
  name: string;
  crnNo: string;
  currentplan_StartDate: string;
  nextPlanDate: string;
  nextTargate: number;
  plan: string;
  pairCount: number;
};

const GoldenIncomeList = () => {
  const [customerData, setCustomerData] = useState<CustomerData[]>([]);
  const {data: List} = useGoldenIncomeList();
  // console.log('data', List);

  const columns: Column<CustomerData>[] = [
    {header: 'Name', accessor: 'name'},
    {header: 'Customer ID', accessor: 'crnNo'},
    {header: 'Start Date', accessor: 'currentplan_StartDate'},
    {header: 'Next Plan Date', accessor: 'nextPlanDate'},
    {header: 'Next Target', accessor: 'nextTargate'},
    {header: 'Plan', accessor: 'plan'},
    {header: 'Pair Count', accessor: 'pairCount'},
  ];

  useEffect(() => {
    if (List) {
      const mappedData = List.map((customer: any) => ({
        name: `${customer.firstName} ${customer.lastName}`,
        crnNo: customer.crnNo,
        currentplan_StartDate: customer.currentplan_StartDate,
        nextPlanDate: customer.nextPlanDate,
        nextTargate: customer.nextTargate,
        plan: customer.plan,
        pairCount: customer.pairCount,
      }));
      // Sort by crnNo (you can change this to sort by another field if needed)
      const sortedData = mappedData.sort((a, b) =>
        b.crnNo.localeCompare(a.crnNo),
      );
      setCustomerData(sortedData);
    }
  }, [List]);

  return (
    <div>
      <GenericTable
        title="Golden Income List"
        data={customerData}
        columns={columns}
        itemsPerPage={15}
        searchAble
      />
    </div>
  );
};

export default GoldenIncomeList;
