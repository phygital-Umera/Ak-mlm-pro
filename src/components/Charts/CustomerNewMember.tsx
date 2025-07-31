// CustomerNewMember component
import React from 'react';
import {FaUser} from 'react-icons/fa6';

interface CustomerNewMemberProps {
  newmembers: {
    crnNo: string;
    firstName: string;
    lastName: string;
  }[];
}

const CustomerNewMember: React.FC<CustomerNewMemberProps> = ({newmembers}) => {
  // Remove the unnecessary query and context since we're using props
  if (!newmembers || newmembers.length === 0) {
    return <div>No new members available.</div>;
  }

  // Sort newJoinees by CRN number in descending order
  const sortedNewJoinees = [...newmembers].sort((a, b) =>
    b.crnNo.localeCompare(a.crnNo),
  );

  return (
    <div className="h-90 overflow-auto bg-white p-4 dark:border-strokedark dark:bg-boxdark">
      <h4 className="text-md font-semibold text-black dark:text-white">
        New Members
      </h4>
      {sortedNewJoinees.map((member) => (
        <div
          key={member.crnNo}
          className="flex items-center justify-between border-b-2 border-gray py-2 dark:border-graydark"
        >
          <div className="flex items-center">
            <FaUser className="h-4 w-4 rounded-full border-2 text-center" />
            <div className="ml-3">
              <span className="text-md font-medium text-primary dark:text-gray">
                {`${member.firstName} ${member.lastName}`}{' '}
                {/* Use member instead of newmembers */}
              </span>
              <p className="text-xs text-slate-700 dark:text-secondary">
                {member.crnNo} {/* Use member instead of newmembers */}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerNewMember;
