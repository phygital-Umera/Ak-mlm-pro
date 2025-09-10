/* eslint-disable */
import React, {useState} from 'react';
import {
  useDeliveredReport,
  useGetAllProductsReport,
} from '@/lib/react-query/Admin/Product/products';
import {CheckmarkIcon} from 'react-hot-toast';

type ProductData = {
  id: string;
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
  orderStatus: string | null;
};

const ProductReport = () => {
  const {data: productData} = useGetAllProductsReport();
  const {mutate: approveDeliveredRequest} = useDeliveredReport();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const [sortField, setSortField] = useState<string>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  console.log('productData', productData);

  // Filter data to only show items with orderStatus as null
  const filteredData =
    productData?.filter((item: any) => item.orderStatus === null) || [];

  const handleDelivery = (id: string) => {
    approveDeliveredRequest(id);
  };

  // Sort data
  const sortedData = [...filteredData].sort((a: any, b: any) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil((sortedData?.length || 0) / recordsPerPage);
  const paginatedData = sortedData?.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  return (
    <div className="rounded-sm bg-white px-5 pb-2.5 pt-6 shadow-default dark:bg-boxdark">
      <h1 className="mb-4 text-xl font-bold dark:text-white">
        Product Report - Pending Deliveries
      </h1>

      {filteredData.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 py-8 text-center">
          No pending deliveries found
        </div>
      ) : (
        <>
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  {[
                    {label: 'Date & Time', key: 'createdAt'},
                    {label: 'CRN No', key: 'crnNo'},
                    {label: 'Customer Name', key: 'fullname'},
                    {label: 'Phone Number', key: 'phoneNumber'},
                    {label: 'Product Name', key: 'name'},
                    {label: 'Description', key: 'description'},
                    {label: 'Actual Price', key: 'actualPrice'},
                    {label: 'Discounted Price', key: 'discountedPrice'},
                    {label: 'Total Amount', key: 'totalAmount'},
                    {label: 'Delivery Charges', key: 'deliveryCharges'},
                    {label: 'Action', key: 'action'},
                  ].map((column) => (
                    <th
                      key={column.key}
                      className="cursor-pointer px-4 py-4 font-medium text-black dark:text-white"
                      onClick={() =>
                        column.key !== 'action' && handleSort(column.key)
                      }
                    >
                      <div className="flex items-center">
                        {column.label}
                        {sortField === column.key && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item: any) => {
                  const rowData = {
                    id: item.id,
                    crnNo: item.crnNo || item.customer?.crnNo,
                    fullname: item.fullname || item.customer?.user?.fullname,
                    phoneNumber:
                      item.phoneNumber || item.customer?.user?.phoneNumber,
                    name: item.name || item.product?.name,
                    description: item.description || item.product?.description,
                    actualPrice: item.actualPrice || item.product?.actualPrice,
                    discountedPrice:
                      item.discountedPrice || item.product?.discountedPrice,
                    totalAmount: item.totalAmount,
                    deliveryCharges: item.deliveryCharges,
                    createdAt: new Date(item.createdAt).toLocaleString(
                      'en-IN',
                      {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true,
                      },
                    ),
                  };

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 dark:hover:bg-boxhoverdark"
                    >
                      <td className="px-4 py-4 dark:text-white">
                        {rowData.createdAt}
                      </td>
                      <td className="px-4 py-4 dark:text-white">
                        {rowData.crnNo}
                      </td>
                      <td className="px-4 py-4 dark:text-white">
                        {rowData.fullname}
                      </td>
                      <td className="px-4 py-4 dark:text-white">
                        {rowData.phoneNumber}
                      </td>
                      <td className="px-4 py-4 dark:text-white">
                        {rowData.name}
                      </td>
                      <td className="max-w-xs truncate px-4 py-4 dark:text-white">
                        {rowData.description}
                      </td>
                      <td className="px-4 py-4 dark:text-white">
                        {formatCurrency(rowData.actualPrice)}
                      </td>
                      <td className="px-4 py-4 dark:text-white">
                        {formatCurrency(rowData.discountedPrice)}
                      </td>
                      <td className="px-4 py-4 font-medium dark:text-white">
                        {formatCurrency(rowData.totalAmount)}
                      </td>
                      <td className="px-4 py-4 dark:text-white">
                        {formatCurrency(rowData.deliveryCharges)}
                      </td>
                      <td className="px-4 py-4 dark:text-white">
                        <button
                          onClick={() => handleDelivery(item.id)}
                          className="transform rounded-sm bg-gradient-to-r from-green-400 to-green-500 px-3 py-2 text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:from-green-500 hover:to-green-400"
                          title="Mark as delivered"
                        >
                          <CheckmarkIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              Showing {(currentPage - 1) * recordsPerPage + 1} to{' '}
              {Math.min(currentPage * recordsPerPage, filteredData.length)} of{' '}
              {filteredData.length} entries
            </div>
            <div className="flex space-x-2">
              <button
                className="border-gray-300 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 rounded border bg-white px-3 py-1 dark:bg-boxdark"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="border-gray-300 bg-gray-100 text-gray-700 dark:text-gray-300 dark:border-gray-600 rounded border px-3 py-1 dark:bg-boxdark">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="border-gray-300 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 rounded border bg-white px-3 py-1 dark:bg-boxdark"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductReport;
