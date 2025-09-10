/*eslint-disable */

import GenericTable from '@/components/Forms/Table/GenericTable';
import {useGetAllProductsReport} from '@/lib/react-query/Admin/Product/products';
import React from 'react';

// Define the ProductColumns for the table
const ProductColumns = [
  {header: 'Created At', accessor: 'createdAt'},
  {header: 'CRN No', accessor: 'crnNo', sortable: true},
  {header: 'Customer Name', accessor: 'fullname'},
  {header: 'Phone Number', accessor: 'phoneNumber'},
  {header: 'Product Name', accessor: 'name'},
  {header: 'Description', accessor: 'description'},
  {header: 'Actual Price', accessor: 'actualPrice'},
  {header: 'Discounted Price', accessor: 'discountedPrice'},
  {header: 'Total Amount', accessor: 'totalAmount'},
  {header: 'Delivery Charges', accessor: 'deliveryCharges'},
  {header: 'Status', accessor: 'orderStatus'},
];

const DeliveredReport = () => {
  const {data: productData} = useGetAllProductsReport();

  // Filter data to only show items with orderStatus as "DELIVERED"
  const deliveredData =
    productData?.filter((item: any) => item.orderStatus === 'DELIVERED') || [];

  console.log('Delivered Products:', deliveredData);

  return (
    <div>
      <GenericTable
        data={deliveredData}
        columns={ProductColumns}
        itemsPerPage={15}
        searchAble
        title="Delivered Products Report"
      />
    </div>
  );
};

export default DeliveredReport;
