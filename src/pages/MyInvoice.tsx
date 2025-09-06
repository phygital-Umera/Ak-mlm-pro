/* eslint-disable */
import React from 'react';
import {useAuthContext} from '@/context/AuthContext';

interface InvoiceProps {
  createdAt?: string;
}

const MyInvoice: React.FC<InvoiceProps> = ({createdAt}) => {
  const {user} = useAuthContext();
  console.log('user', user);

  const displayDate = createdAt || new Date().toLocaleDateString();

  if (!user) return <p className="py-8 text-center">No user data found</p>;

  return (
    <div className="flex justify-center py-8">
      <div className="border-gray-300 w-full max-w-3xl rounded-md border-8 bg-[#ECE8E8B5] shadow-xl">
        {/* Logo */}
        <div className="flex flex-col items-center py-4">
          {/* <img alt="Logo" className="w-[193px] h-[70px] object-contain" /> */}
          <h5 className="font-[Cambria] text-3xl text-[#1f7ca7]">SJC Group</h5>
          <p className="font-[Cambria] text-[#000000]">
            www.sjcgroupconsultant.co.in
          </p>
        </div>

        {/* Receipt Info */}
        <div className="-mt-4 px-6 text-right font-[Cambria] text-[#000000]">
          <p>Receipt No. : 1</p>
          <p>Date : {displayDate}</p>
        </div>

        {/* Mailing + Bill Info */}
        <div className="grid grid-cols-1 gap-6 px-6 py-4 font-[Cambria] text-sm md:grid-cols-2">
          <div>
            <ul className="list-none space-y-2 text-[#000000]">
              <li>
                Mailing Info,
                <br />
                <b className="text-[#000000DE]">Regional Office:</b>
                <br />
                SJC GROUP CONSULTANT
                <br />
                Near Union Bank at Post Peth, TAL-Walwa DIST-Sangli, 415407
              </li>
            </ul>
          </div>

          <div className="border-black pl-4 md:border-l-2">
            <ul className="list-none space-y-1">
              <li>Bill To,</li>
              <li>Member Code : {user.crnNo}</li>
              <li>Member Name : {user.fullname}</li>
              <li>Mobile No : {user.phone || 'N/A'}</li>
            </ul>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="px-6 py-4 font-[Cambria]">
          <p className="text-lg font-semibold text-purple-700">
            Terms & Condition :
          </p>
          <ol className="list-decimal pl-6 text-red-600">
            <li>
              Amount paid towards purchase of product shall not be refunded at
              any circumstances.
            </li>
          </ol>
        </div>

        {/* Footer */}
        <div className="bg-black py-2 text-center">
          <p className="font-[Cambria] text-sm text-white">
            No signature is required as this is computer generated receipt.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyInvoice;
