/*eslint-disable */

import GenericTable from '@/components/Forms/Table/GenericTable';
import {useGetAllProductsReport} from '@/lib/react-query/Admin/Product/products';
import {ArrowLeftIcon} from 'lucide-react';
import React from 'react';
import {useNavigate} from '@tanstack/react-router';

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
  const navigate = useNavigate();

  // Filter data to only show items with orderStatus as "DELIVERED"
  const deliveredData =
    productData?.filter((item: any) => item.orderStatus === 'DELIVERED') || [];

  console.log('Delivered Products:', deliveredData);

  return (
    <div>
      <button
        onClick={() => navigate({to: '/admin/productreport'})}
        className="bg-gray-500 text-gray-300 hover:bg-gray-600 flex items-center gap-2 rounded px-4 py-2 transition-colors"
        title="Go back to Product Report"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span>Back</span>
      </button>

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
