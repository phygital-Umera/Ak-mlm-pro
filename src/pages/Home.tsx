import React, {useEffect, useState} from 'react';
import {
  FaUserPlus,
  FaCheckCircle,
  FaCrown,
  FaKey,
  FaMoneyBillWave,
  FaPercentage,
  FaProjectDiagram,
  FaRedo,
  FaTrophy,
  FaWallet,
} from 'react-icons/fa';
import {motion} from 'framer-motion';
import StatCard from './StatCard';
import {useFetchAdminHome} from '@/lib/react-query/Admin/Home/adminHome';
import Loader from '@/components/common/Loader';
import {useAuthContext} from '@/context/AuthContext';
import {MdAttachMoney} from 'react-icons/md';

interface StatCardProps {
  amount: string;
  title: string;
  icon: React.ReactNode;
  trend?: string;
  trendValue?: string;
}

const Home: React.FC = () => {
  const {data, isSuccess, isError, isPending} = useFetchAdminHome();
  const {user} = useAuthContext();
  const id = user?.id;
  console.log('data', data);
  const [statsData, setStatsData] = useState<StatCardProps[]>([]);
  const [showExtraBoxes, setShowExtraBoxes] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const Binary = isEnabled ? data?.todayBinary : data?.binary;
  const RepurchaseAmount = isEnabled
    ? data?.todayRepurchaseAmount
    : data?.repurchaseAmount;

  const RepurchaseCommission = isEnabled
    ? data?.repurchaseCommission
    : data?.todayRepurchaseCommission;

  const Roylaty = isEnabled ? data?.todayRoyalty : data?.royelty;
  const Commission = isEnabled ? data?.todayscommission : data?.totalCommission;
  const RewardReport = isEnabled ? data?.todaysrewards : data?.totalrewards;

  useEffect(() => {
    if (isSuccess && data) {
      setStatsData([
        {
          title: 'Total Income',
          amount: `${data.totalIncome}`,
          icon: <MdAttachMoney className="text-2xl text-blue-500" />,
          trend: 'up',
          trendValue: '12%',
        },
        {
          title: 'Total Commission',
          amount: `${Commission}`,
          icon: <FaPercentage className="text-2xl text-green-500" />,
          trend: 'up',
          trendValue: '8%',
        },
        {
          title: 'Epin Given',
          amount: `₹${data.givenEpin}`,
          icon: <FaKey className="text-2xl text-purple-500" />,
          trend: 'up',
          trendValue: '24%',
        },
        {
          title: 'Epin Used',
          amount: `₹${data.usedEpin}`,
          icon: <FaCheckCircle className="text-2xl text-purple-500" />,
          trend: 'up',
          trendValue: '24%',
        },
        {
          title: 'Binary Commission',
          amount: `₹${Binary}`,
          icon: <FaProjectDiagram className="text-2xl text-yellow-500" />,
          trend: 'up',
          trendValue: '18%',
        },
        {
          title: 'Roylaty Commission',
          amount: `₹${Roylaty}`,
          icon: <FaCrown className="text-2xl text-teal-500" />,
          trend: 'up',
          trendValue: '15%',
        },
        {
          title: 'Rewards Achiver Report',
          amount: `₹${RewardReport}`,
          icon: <FaTrophy className="text-2xl text-pink-500" />,
          trend: 'up',
          trendValue: '10%',
        },
        {
          title: 'Repurchase Commission',
          amount: `₹${RepurchaseCommission}`,
          icon: <FaRedo className="text-xl text-indigo-500" />,
          trend: 'up',
          trendValue: '5%',
        },
        {
          title: 'Repurchase Amount',
          amount: `₹${RepurchaseAmount}`,
          icon: <FaWallet className="text-2xl text-amber-500" />,
          trend: 'up',
          trendValue: '20%',
        },
      ]);
    }
  }, [isSuccess, data, isPending]);

  if (isError) {
    return (
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        className="flex h-64 items-center justify-center rounded-lg bg-red-50"
      >
        <p className="text-lg text-red-500">
          Error fetching data. Please try again later.
        </p>
      </motion.div>
    );
  }

  if (isPending) {
    return <Loader />;
  }

  const handleToggle = () => {
    setShowExtraBoxes(!showExtraBoxes);
  };

  const displayedStats = showExtraBoxes ? statsData : statsData.slice(0, 4);

  // Transform customer data for charts
  const transformCustomerData = () => {
    if (!data?.customerList) return [];

    return data.customerList.map((customer) => ({
      name: customer.crnNo,
      date: new Date(customer.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      value: Math.floor(Math.random() * 1000) + 500,
    }));
  };

  const customerGrowthData = [
    {name: 'Jan', customers: 45},
    {name: 'Feb', customers: 52},
    {name: 'Mar', customers: 48},
    {name: 'Apr', customers: 78},
    {name: 'May', customers: 65},
    {name: 'Jun', customers: 90},
    {name: 'Jul', customers: data?.customerCount || 0},
  ];

  return (
    <>
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        className="p-4 md:p-6"
      >
        <label className="mb-4 inline-flex cursor-pointer items-center">
          <span className="text-gray-700 mr-3 text-sm font-medium">
            {isEnabled ? 'Today' : 'Total'}
          </span>
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={isEnabled}
              onChange={() => setIsEnabled(!isEnabled)}
            />
            <div
              className={`bg-gray-300 h-6 w-11 rounded-full shadow-inner transition ${
                isEnabled ? 'bg-blue-700' : 'bg-neutral-700'
              }`}
            ></div>
            <div
              className={`dot absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition ${
                isEnabled ? 'translate-x-5' : ''
              }`}
            ></div>
          </div>
        </label>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          {displayedStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.3, delay: index * 0.1}}
              whileHover={{scale: 1.03}}
              whileTap={{scale: 0.98}}
            >
              <StatCard
                amount={stat.amount}
                icon={stat.icon}
                title={stat.title}
              />
            </motion.div>
          ))}
        </div>

        {statsData.length > 4 && (
          <div className="mt-6 flex justify-center">
            <motion.button
              onClick={handleToggle}
              className="flex items-center rounded-lg bg-blue-50 px-4 py-2 text-blue-600"
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
            >
              <span>{showExtraBoxes ? 'Show Less' : 'Show More'}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className={`ml-2 h-5 w-5 transform ${showExtraBoxes ? 'rotate-180' : ''}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.button>
          </div>
        )}

        <motion.div
          className="border-gray-100 mt-8 rounded-xl border p-6 shadow-sm"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 0.4}}
        >
          <h3 className="text-gray-800 mb-4 text-lg font-semibold">
            Recent Customers
          </h3>
          <div className="overflow-x-auto">
            <table className="divide-gray-200 min-w-full divide-y">
              <thead>
                <tr>
                  <th className="text-gray-500 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    CRN No
                  </th>
                  <th className="text-gray-500 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Join Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-gray-200 divide-y">
                {transformCustomerData().map((customer, index) => (
                  <motion.tr
                    key={index}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.1 * index}}
                    whileHover={{backgroundColor: '#f9fafb'}}
                    className="text-sm"
                  >
                    <td className="whitespace-nowrap px-4 py-3">
                      <div className="flex items-center">
                        <div className="mr-3 rounded-full bg-blue-100 p-2">
                          <FaUserPlus className="text-blue-500" />
                        </div>
                        <span className="font-medium">{customer.name}</span>
                      </div>
                    </td>
                    <td className="text-gray-500 whitespace-nowrap px-4 py-3">
                      {customer.date}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Home;
