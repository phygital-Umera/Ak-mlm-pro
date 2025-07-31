/* eslint-disable */
import React from 'react';

const DisplayVoucher = ({Voucher}) => {
  const paidVouchers =
    Voucher?.filter((voucher) => voucher.status === 'PAID') || [];

  const sortedPaidVouchers = paidVouchers.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="mt-20 rounded-sm border border-stroke bg-white px-6 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
      <h2 className="mb-4 text-lg font-semibold">Paid Voucher History</h2>
      {paidVouchers.length === 0 ? (
        <p className="text-gray-500 text-sm">No paid vouchers found</p>
      ) : (
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-2 dark:bg-meta-4">
                <th className="px-4 py-2 text-left text-sm font-medium text-black dark:text-white">
                  Customer Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-black dark:text-white">
                  CRN No
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-black dark:text-white">
                  Plan
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-black dark:text-white">
                  Amount
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-black dark:text-white">
                  Payable Amount
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-black dark:text-white">
                  Admin Charges
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-black dark:text-white">
                  Payment Date
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedPaidVouchers.map((voucher) => (
                <tr
                  key={voucher.id}
                  className="border-b border-stroke dark:border-strokedark"
                >
                  <td className="px-4 py-2 text-left">{`${voucher.firstName} ${voucher.lastName}`}</td>
                  <td className="px-4 py-2 text-left">{voucher.crnNo}</td>
                  <td className="px-4 py-2 text-left">{voucher.plan}</td>
                  <td className="px-4 py-2 text-left">
                    ₹{voucher.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-left">
                    ₹{voucher.paybleAmount.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-left">
                    ₹{voucher.adminCharges.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-left">
                    {new Date(voucher.createdAt).toLocaleDateString('en-IN', {
                      dateStyle: 'medium',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DisplayVoucher;
