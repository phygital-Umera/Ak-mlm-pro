import GenericButton from '@/components/Forms/Buttons/GenericButton';
import {useAuthContext} from '@/context/AuthContext';
import {useGetCustomerGoldenIncome} from '@/lib/react-query/Customer/home';
import React from 'react';

type Data = {
  plan: string;
  customerRequired: number;
  Duration: string;
  Income: string;
  leftCount: number;
  rightCount: number;
};

const commissionData: Data[] = [
  {
    plan: 'Orchid',
    customerRequired: 8,
    Duration: '1 Month',
    Income: '2,000 Rs',
    leftCount: 0,
    rightCount: 0,
  },
  {
    plan: 'Lotus',
    customerRequired: 16,
    Duration: '1 Month',
    Income: '4,000 Rs',
    leftCount: 0,
    rightCount: 0,
  },
  {
    plan: 'Rose',
    customerRequired: 32,
    Duration: '1 Month',
    Income: '8,000 Rs',
    leftCount: 0,
    rightCount: 0,
  },
  {
    plan: 'Athenium',
    customerRequired: 64,
    Duration: '2 Month',
    Income: '16,000 Rs',
    leftCount: 0,
    rightCount: 0,
  },
  {
    plan: 'Platinum',
    customerRequired: 256,
    Duration: '3 Month',
    Income: '40,000 Rs',
    leftCount: 0,
    rightCount: 0,
  },
];

const GoldenIncome = () => {
  const {user} = useAuthContext();
  const id = user?.id;

  const {data: Datafecth, isPending} = useGetCustomerGoldenIncome(id as string);

  // Handle loading state
  if (isPending) return <div>Loading...</div>;

  const currentPlan = Datafecth?.plan?.toLowerCase() || '';

  // Update commissionData with dynamic values from API
  const updatedCommissionData = commissionData.map((item) => {
    if (item.plan.toLowerCase() === currentPlan) {
      return {
        ...item,
        leftCount: Datafecth?.leftCount || 0,
        rightCount: Datafecth?.rightCount || 0,
      };
    }
    return item;
  });

  return (
    <div>
      <h1 className="mb-4 mt-4 text-xl font-bold">Golden Income</h1>

      {/* Display Additional Data (only if available) */}
      {Datafecth?.plan ? (
        <div className="dark:bg-gray-800 mb-6 rounded-lg border border-white p-4 shadow-default dark:shadow-none">
          <p className="text-gray-800 dark:text-gray-200">
            <strong>Current Plan:</strong> {Datafecth.plan}
          </p>
          <p className="text-gray-800 dark:text-gray-200">
            <strong>Target:</strong> {Datafecth.nextTargate}
          </p>
          <p className="text-gray-800 dark:text-gray-200">
            <strong>Current Plan Start Date:</strong>{' '}
            {Datafecth.currentplan_StartDate}
          </p>
          <p className="text-gray-800 dark:text-gray-200">
            <strong>Current Plan End Date:</strong> {Datafecth.nextPlanDate}
          </p>
        </div>
      ) : (
        <div className="dark:bg-gray-800 mb-6 rounded-lg border border-white p-4 shadow-default dark:shadow-none">
          <p className="text-gray-800 dark:text-gray-200">
            No plan data available
          </p>
        </div>
      )}

      {/* Custom Table (always displayed) */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-3 text-left text-sm font-semibold">Plan</th>
              <th className="p-3 text-left text-sm font-semibold">
                Customer Required
              </th>
              <th className="p-3 text-left text-sm font-semibold">
                Left Count
              </th>
              <th className="p-3 text-left text-sm font-semibold">
                Right Count
              </th>
              <th className="p-3 text-left text-sm font-semibold">Duration</th>
              <th className="p-3 text-left text-sm font-semibold">Income</th>
            </tr>
          </thead>
          <tbody>
            {updatedCommissionData.map((row) => {
              const isCurrentPlan = row.plan.toLowerCase() === currentPlan;

              return (
                <tr
                  key={row.plan}
                  className={`dark:border-gray-700 border-b ${
                    isCurrentPlan
                      ? 'bg-green-100 dark:bg-green-900'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <td className="p-3">
                    <span
                      className={`${
                        isCurrentPlan
                          ? 'font-semibold text-green-700 dark:text-green-300'
                          : 'text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      {row.plan}
                    </span>
                  </td>
                  <td className="text-gray-600 dark:text-gray-300 p-3">
                    {row.customerRequired}
                  </td>
                  <td className="text-gray-600 dark:text-gray-300 p-3">
                    {row.leftCount}
                  </td>
                  <td className="text-gray-600 dark:text-gray-300 p-3">
                    {row.rightCount}
                  </td>
                  <td className="text-gray-600 dark:text-gray-300 p-3">
                    {row.Duration}
                  </td>
                  <td className="text-gray-600 dark:text-gray-300 p-3">
                    {row.Income}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GoldenIncome;
