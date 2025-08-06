// eslint-disable-next-line @typescript-eslint/no-unused-vars
import GenericTable from '@/components/Forms/Table/GenericTable';
import React from 'react';
import {useGetAllProductsReport} from '@/lib/react-query/Admin/Product/products';

type ProductData = {
  crnNo: string;
  fullname: string;
  phoneNumber: string;
  name: string;
  description: string;
  actualPrice: number;
  discountedPrice: number;
  totalAmount: number;
  deliveryCharges: number;
  createdAt: string;
};

const ProductReport = () => {
  const {data: productData} = useGetAllProductsReport();

  const columns = [
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
  ];

  const rows: ProductData[] =
    productData?.map((item: any) => ({
      crnNo: item.crnNo || item.customer?.crnNo,
      fullname: item.fullname || item.customer?.user?.fullname,
      phoneNumber: item.phoneNumber || item.customer?.user?.phoneNumber,
      name: item.name || item.product?.name,
      description: item.description || item.product?.description,
      actualPrice: item.actualPrice || item.product?.actualPrice,
      discountedPrice: item.discountedPrice || item.product?.discountedPrice,
      totalAmount: item.totalAmount,
      deliveryCharges: item.deliveryCharges,
      createdAt: new Date(item.createdAt).toLocaleString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }),
    })) || [];

  return (
    <div>
      <GenericTable data={rows} columns={columns} />
    </div>
  );
};

export default ProductReport;
