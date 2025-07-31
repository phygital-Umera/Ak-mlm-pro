import DisplayZeroEpin from '@/components/AdminSide/ZeroE-pin/DisplayZeroEpin';
import ZeroEpin from '@/components/AdminSide/ZeroE-pin/ZeroEpin';
import React from 'react';

const AdminZeroEpinManagement = () => {
  return (
    <div className="mx-auto max-w-270">
      <div className="grid grid-cols-8 gap-8">
        <div className="col-span-8">
          <ZeroEpin />
        </div>
        <div className="col-span-8">
          <DisplayZeroEpin />
        </div>
      </div>
    </div>
  );
};

export default AdminZeroEpinManagement;
