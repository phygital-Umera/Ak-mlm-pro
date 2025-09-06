import DisplayZeroEpin from '@/components/AdminSide/ZeroE-pin/DisplayZeroEpin';
import ZeroEpin from '@/components/AdminSide/ZeroE-pin/ZeroEpin';
import React from 'react';
import EpinForm from '@/components/AdminSide/E-pin/EpinForm';
import CustomerEpins from '@/components/AdminSide/E-pin/CustomerEpins';

const CustomerEpinManagment = () => {
  return (
    <div className="mx-auto max-w-270">
      <div className="grid grid-cols-8 gap-8">
        <div className="col-span-8">
          <EpinForm />
        </div>
        <div className="col-span-8">
          <CustomerEpins />
        </div>
      </div>
    </div>
  );
};

export default CustomerEpinManagment;
