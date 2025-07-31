import {useGetAdminWalletHistory} from '@/lib/react-query/Admin/WalletHistory/wallethistory';
import {
  useAssignEpin,
  useGetAllCustomers,
} from '@/lib/react-query/updateCustomer';
import React, {useState} from 'react';
import {GrFormPrevious, GrFormNext} from 'react-icons/gr';

const CustomerList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {data: allCustomers} = useGetAllCustomers();

  const {mutateAsync: assignEpin} = useAssignEpin();
  console.log('customerss', allCustomers);

  const array = [
    {crn: '6547', is_active: true, amt: 564},
    {crn: '1234', is_active: false, amt: 100},
    {crn: '2222', is_active: false, amt: 200},
    {crn: '3333', is_active: false, amt: 300},
    {crn: '4444', is_active: true, amt: 400},
  ];

  const [epin, setEpin] = useState<string>('');
  const totalItems = allCustomers?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = allCustomers?.slice(startIdx, startIdx + itemsPerPage);
  const onSubmit = (crnNo: string) => {
    assignEpin({crnNo, epinNo: epin});
  };

  return (
    <div className="dark:bg-dark space-y-4 border border-stroke p-6 dark:text-white">
      <h1 className="text-xl font-semibold">Customer List</h1>

      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
              Name
            </th>
            <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
              CRN No
            </th>

            <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
              Sponsor No
            </th>
            {/* <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
              Epin
            </th> */}
            <th className="px-4 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allCustomers?.map((each, index) => {
            const globalIndex = index + 1;
            return (
              <tr key={index}>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  {each.crnNo}
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  {each.fullname}
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  {each.sponsorId}
                </td>
                {/* <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  {!each.isActive && (
                    <input
                      type="text"
                      className="rounded-md border border-stroke p-1"
                      onChange={(e) => {
                        setEpin(e.target.value);
                      }}
                    />
                  )}
                </td> */}
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <button
                    className="rounded-md bg-primary p-2 px-4 text-white"
                    onClick={() => onSubmit(each.crnNo)}
                  >
                    save
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-between">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div className="space-x-2">
          <button
            className="rounded px-3 py-4"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            <GrFormPrevious style={{fontSize: '1.25rem'}} />
          </button>
          <button
            className="rounded px-3 py-4"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
          >
            <GrFormNext style={{fontSize: '1.25rem'}} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
