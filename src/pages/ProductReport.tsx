/* eslint-disable */
import React, {useState} from 'react';
import {
  useDeliveredReport,
  useGetAllProductsReport,
} from '@/lib/react-query/Admin/Product/products';
import {CheckmarkIcon} from 'react-hot-toast';
import {useNavigate} from '@tanstack/react-router';

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
  images?: string;
  productType?: string;
  gstCharges?: number;
};

const ProductReport = () => {
  const navigate = useNavigate();
  const {data: productData} = useGetAllProductsReport();
  const {mutate: approveDeliveredRequest} = useDeliveredReport();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const [sortField, setSortField] = useState<string>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  console.log('productData', productData);

  // Filter data to only show items with orderStatus as "CART" (pending deliveries)
  const filteredData =
    productData?.filter((item: any) => item.orderStatus === 'CART') || [];

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
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="p-6">
      {/* Header with title and button */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold dark:text-white">
          Product Report - Pending Deliveries
        </h1>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          onClick={() => navigate({to: '/admin/deliverdproducts'})}
        >
          Show History
        </button>
      </div>

      <div className="rounded-sm bg-white px-5 pb-2.5 pt-6 shadow-default dark:bg-boxdark">
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
                      {label: 'GST', key: 'gstCharges'},
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
                    // Extract data from the nested structure
                    const productInfo = item.product || {};
                    const customerInfo = item.customer || {};
                    const userInfo = customerInfo.user || {};

                    const rowData = {
                      id: item.id,
                      crnNo: item.crnNo || customerInfo.crnNo || 'N/A',
                      fullname: item.fullname || userInfo.fullname || 'N/A',
                      phoneNumber:
                        item.phoneNumber || userInfo.phoneNumber || 'N/A',
                      name: item.name || productInfo.name || 'Unnamed Product',
                      description:
                        item.description ||
                        productInfo.description ||
                        'No description',
                      actualPrice:
                        item.actualPrice || productInfo.actualPrice || 0,
                      discountedPrice:
                        item.discountedPrice ||
                        productInfo.discountedPrice ||
                        0,
                      totalAmount: item.totalAmount || 0,
                      deliveryCharges:
                        item.deliveryCharges ||
                        productInfo.deliveryCharges ||
                        0,
                      gstCharges: item.gstCharges || productInfo.gstAmount || 0,
                      createdAt: formatDate(item.createdAt),
                      productType:
                        item.productType || productInfo.productType || 'N/A',
                      images: item.images || productInfo.images,
                    };

                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50 dark:hover:bg-boxhoverdark border-gray-200 dark:border-gray-700 border-b"
                      >
                        <td className="whitespace-nowrap px-4 py-4 dark:text-white">
                          {rowData.createdAt}
                        </td>
                        <td className="font-mono px-4 py-4 dark:text-white">
                          {rowData.crnNo}
                        </td>
                        <td className="px-4 py-4 dark:text-white">
                          {rowData.fullname}
                        </td>
                        <td className="px-4 py-4 dark:text-white">
                          {rowData.phoneNumber}
                        </td>
                        <td className="px-4 py-4 dark:text-white">
                          <div className="flex items-center gap-2">
                            {rowData.images && (
                              <img
                                src={rowData.images}
                                alt={rowData.name}
                                className="h-8 w-8 rounded object-cover"
                              />
                            )}
                            <span className="font-medium">{rowData.name}</span>
                          </div>
                        </td>
                        <td className="max-w-xs truncate px-4 py-4 dark:text-white">
                          {rowData.description}
                        </td>
                        <td className="px-4 py-4 dark:text-white">
                          {formatCurrency(rowData.actualPrice)}
                        </td>
                        <td className="px-4 py-4 font-semibold text-green-600 dark:text-white">
                          {formatCurrency(rowData.discountedPrice)}
                        </td>
                        <td className="px-4 py-4 font-medium dark:text-white">
                          {formatCurrency(rowData.totalAmount)}
                        </td>
                        <td className="px-4 py-4 dark:text-white">
                          {formatCurrency(rowData.deliveryCharges)}
                        </td>
                        <td className="px-4 py-4 dark:text-white">
                          {formatCurrency(rowData.gstCharges)}
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
          </>
        )}
      </div>
    </div>
  );
};

export default ProductReport;
