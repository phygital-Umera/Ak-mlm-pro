import GenericButton from '@/components/Forms/Buttons/GenericButton';
import {useAuthContext} from '@/context/AuthContext';
import {
  useGetBDfund,
  useGetCustomerLevel,
} from '@/lib/react-query/Customer/home';
import {useCreateWalletData} from '@/lib/react-query/Customer/wallet';
import React, {useState} from 'react';
import {BsWalletFill} from 'react-icons/bs';

type Data = {
  level: string;
  customerRequired: number | string;
  Duration: string;
  Income: string;
  TotalIncome: string;
};

const commissionData: Data[] = [
  {
    level: 'Level 1',
    customerRequired: '3+3',
    Duration: '15 Day',
    Income: '1 Rs',
    TotalIncome: '15 Rs',
  },
  {
    level: 'Level 2',
    customerRequired: '12+12',
    Duration: '30 Day',
    Income: '10 Rs',
    TotalIncome: '300 Rs',
  },
  {
    level: 'Level 3',
    customerRequired: '48+48',
    Duration: '6 Month',
    Income: '50 Rs',
    TotalIncome: '9000 Rs',
  },
  {
    level: 'Level 4',
    customerRequired: '192+192',
    Duration: '1 Year',
    Income: '100 Rs',
    TotalIncome: '36,500 Rs',
  },
  {
    level: 'Level 5',
    customerRequired: '768+768',
    Duration: '3 Year',
    Income: '500 Rs',
    TotalIncome: '5,47,500 Rs',
  },
];

const RoyeltyIncome = () => {
  const {user} = useAuthContext();
  const id = user?.id;

  const {data: Datafecth, isPending} = useGetBDfund(id as string);
  console.log('Datafecthdddd', Datafecth);

  const getLevelNumber = (plan: string) => {
    return parseInt(plan.split('_')[1]) || 0;
  };

  const currentLevel = Datafecth?.data?.plan
    ? getLevelNumber(Datafecth.data.plan)
    : 0;
  const remainingDays = Datafecth?.remainingdays ?? 0;

  return (
    <div className="px-4 py-6 sm:px-6">
      <h1 className="mb-6 text-xl font-bold sm:text-2xl">Commission Report</h1>

      {/* Commission Table */}
      <div className="overflow-hidden rounded-lg shadow-default dark:shadow-none">
        {/* Desktop Table */}
        <div className="hidden overflow-x-auto sm:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="p-3 text-left text-sm font-semibold">Level</th>
                <th className="p-3 text-left text-sm font-semibold">
                  Customers Required
                </th>
                <th className="p-3 text-left text-sm font-semibold">
                  Duration
                </th>
                <th className="p-3 text-left text-sm font-semibold">
                  Income (per day)
                </th>
                <th className="p-3 text-left text-sm font-semibold">
                  Total Income
                </th>
                <th className="p-3 text-left text-sm font-semibold">
                  Current Day
                </th>
              </tr>
            </thead>
            <tbody>
              {commissionData.map((row) => {
                const rowLevel = parseInt(row.level.split(' ')[1]);
                const isCurrentLevel = rowLevel === currentLevel;
                const isAchievedLevel = rowLevel <= currentLevel;

                return (
                  <tr
                    key={row.level}
                    className={`dark:border-gray-700 border-b ${
                      isAchievedLevel
                        ? 'bg-green-100 dark:bg-green-900'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <td className="p-3">
                      <span
                        className={`${
                          isAchievedLevel
                            ? 'font-semibold text-green-700 dark:text-green-300'
                            : 'text-gray-800 dark:text-gray-200'
                        }`}
                      >
                        {row.level}
                      </span>
                    </td>
                    <td className="text-gray-600 dark:text-gray-300 p-3">
                      {row.customerRequired}
                    </td>
                    <td className="text-gray-600 dark:text-gray-300 p-3">
                      {row.Duration}
                    </td>
                    <td className="text-gray-600 dark:text-gray-300 p-3">
                      {row.Income}
                    </td>
                    <td className="text-gray-600 dark:text-gray-300 p-3">
                      {row.TotalIncome}
                    </td>
                    <td className="text-gray-600 dark:text-gray-300 p-3">
                      {isCurrentLevel && !isPending
                        ? `${remainingDays} days`
                        : '0 days'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-3 sm:hidden">
          {commissionData.map((row) => {
            const rowLevel = parseInt(row.level.split(' ')[1]);
            const isCurrentLevel = rowLevel === currentLevel;
            const isAchievedLevel = rowLevel <= currentLevel;

            return (
              <div
                key={row.level}
                className={`rounded-lg border p-4 ${
                  isAchievedLevel
                    ? 'border-green-300 bg-green-100 dark:border-green-700 dark:bg-green-900'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-lg font-medium ${
                      isAchievedLevel
                        ? 'text-green-700 dark:text-green-300'
                        : 'text-gray-800 dark:text-white'
                    }`}
                  >
                    {row.level}
                  </h3>
                  {isCurrentLevel && !isPending && (
                    <span className="rounded-full bg-primary px-3 py-1 text-xs text-white">
                      Active
                    </span>
                  )}
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Customers
                    </p>
                    <p className="font-medium dark:text-white">
                      {row.customerRequired}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Duration
                    </p>
                    <p className="font-medium dark:text-white">
                      {row.Duration}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Daily Income
                    </p>
                    <p className="font-medium dark:text-white">{row.Income}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Total Income
                    </p>
                    <p className="font-medium dark:text-white">
                      {row.TotalIncome}
                    </p>
                  </div>
                </div>

                {isCurrentLevel && !isPending && (
                  <div className="mt-3">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Days Remaining
                    </p>
                    <p className="font-medium dark:text-white">
                      {remainingDays} days
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoyeltyIncome;
