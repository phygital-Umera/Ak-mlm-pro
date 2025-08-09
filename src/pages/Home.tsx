import React, {useEffect, useState} from 'react';
import {IoWalletSharp} from 'react-icons/io5';
import {
  FaDollarSign,
  FaShoppingBasket,
  FaUserPlus,
  FaChartLine,
  FaAward,
  FaCrown,
  FaMoneyBillWave,
  FaRedoAlt,
  FaShoppingCart,
  FaSitemap,
  FaTicketAlt,
  FaHandHoldingUsd,
} from 'react-icons/fa';
import {motion} from 'framer-motion';
import StatCard from './StatCard';
import {useFetchAdminHome} from '@/lib/react-query/Admin/Home/adminHome';
import NewMembers from '@/components/Charts/NewMembers';
import TeamPerformance from '@/components/Charts/TeamPerformance';
import ChartOne from '@/components/Charts/ChartOne';
import Loader from '@/components/common/Loader';
import {useAuthContext} from '@/context/AuthContext';
import {FaKey, FaWallet} from 'react-icons/fa6';

interface StatCardProps {
  amount: string;
  title: string;
  icon: React.ReactNode;
  trend?: string;
  trendValue?: string;
}

const Home: React.FC = () => {
  const {data, isSuccess, isError, isPending} = useFetchAdminHome();
  console.log('====================================');
  console.log('data', data);
  console.log('====================================');
  const {user} = useAuthContext();
  const id = user?.id;

  console.log('rtreport', data);
  const [statsData, setStatsData] = useState<StatCardProps[]>([]);
  const [showExtraBoxes, setShowExtraBoxes] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedView, setSelectedView] = useState<'today' | 'month'>('today');
  console.log(selectedView);

  useEffect(() => {
    if (isSuccess && data) {
      const commission =
        selectedView === 'today'
          ? data?.todayscommission
          : data?.totalCommission;
      const binaryCommission =
        selectedView === 'today' ? data?.todayBinary : data?.binary;
      const royalty =
        selectedView === 'today' ? data?.todayRoyalty : data?.royelty;
      const achiverReport =
        selectedView === 'today' ? data?.todaysrewards : data?.totalrewards;
      const repurchaseCommission =
        selectedView === 'today'
          ? data?.todayRepurchaseCommission
          : data?.repurchaseCommission;
      const repurchaseAmount =
        selectedView === 'today'
          ? data?.todayRepurchaseAmount
          : data?.repurchaseAmount;
      const inActiveCustomer =
        selectedView === 'today' ? data?.inActive : data?.inActive;
      const leftCount =
        selectedView === 'today' ? data?.leftCount : data?.leftCount;
      const rightCount =
        selectedView === 'today' ? data?.rightCount : data?.rightCount;
      const customerCount =
        selectedView === 'today' ? data?.customerCount : data?.customerCount;
      setStatsData([
        {
          title: 'Total Business',
          amount: `${data?.totalBuisness}`,
          icon: <FaWallet className="text-2xl text-blue-500" />,
          trend: 'up',
          trendValue: '12%',
        },
        {
          title: 'Total Commission',
          amount: `${data?.totalCommission}`,
          icon: <FaHandHoldingUsd className="text-2xl text-green-500" />,
          trend: 'up',
          trendValue: '8%',
        },
        {
          title: 'Epin Given',
          amount: `${data?.givenEpin}`,
          icon: <FaKey className="text-2xl text-purple-500" />,
          trend: 'up',
          trendValue: '24%',
        },
        {
          title: 'Epin Used',
          amount: `${data?.usedEpin}`,
          icon: <FaKey className="text-2xl text-yellow-500" />,
          trend: 'up',
          trendValue: '18%',
        },
        {
          title: 'Pair Matching Income  ',
          amount: `₹${data?.binary}`,
          icon: <FaSitemap className="text-2xl text-teal-500" />,
          trend: 'up',
          trendValue: '15%',
        },
        {
          title: 'Direct Sponsor Income',
          amount: `₹${data?.directCommission}`,
          icon: <FaCrown className="text-2xl text-pink-500" />,
          trend: 'up',
          trendValue: '10%',
        },
        // {
        //   title: 'Rewards Achiever Report',
        //   amount: `₹${achiverReport || 0}`,
        //   icon: <FaAward className="text-2xl text-indigo-500" />,
        //   trend: 'up',
        //   trendValue: '5%',
        // },
        {
          title: 'Repurchase Commission',
          amount: `₹${repurchaseCommission}`,
          icon: <FaRedoAlt className="text-2xl text-amber-500" />,
          trend: 'up',
          trendValue: '20%',
        },
        {
          title: 'Repurchase Amount',
          amount: `₹${repurchaseAmount}`,
          icon: <FaShoppingCart className="text-2xl text-amber-500" />,
          trend: 'up',
          trendValue: '20%',
        },
        {
          title: 'In Active Customer',
          amount: `${inActiveCustomer}`,
          icon: <FaShoppingCart className="text-2xl text-amber-500" />,
          trend: 'up',
          trendValue: '20%',
        },
        {
          title: ' Active Customer',
          amount: `${customerCount - inActiveCustomer}`,
          icon: <FaShoppingCart className="text-2xl text-amber-500" />,
          trend: 'up',
          trendValue: '20%',
        },
        {
          title: 'Total Customer',
          amount: `${customerCount}`,
          icon: <FaShoppingCart className="text-2xl text-amber-500" />,
          trend: 'up',
          trendValue: '20%',
        },
      ]);
    }
  }, [isSuccess, data, isPending, selectedView]);

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
      value: Math.floor(Math.random() * 1000) + 500, // Random value for visualization
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
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.5}}
      className="p-4 md:p-6"
    >
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => setSelectedView('today')}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            selectedView === 'today'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          Today
        </button>
        <button
          onClick={() => setSelectedView('month')}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            selectedView === 'month'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          All
        </button>
      </div>
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
  );
};

export default Home;
//  {/* <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
//       <motion.div
//         className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.2 }}
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold text-gray-800">Customer Growth</h3>
//           <div className="flex space-x-2">
//             <button className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-full">Month</button>
//             <button className="text-xs px-3 py-1 text-gray-500 rounded-full hover:bg-gray-100">Quarter</button>
//             <button className="text-xs px-3 py-1 text-gray-500 rounded-full hover:bg-gray-100">Year</button>
//           </div>
//         </div>
//         <div className="h-80">
//           <NewMembers data={customerGrowthData} />
//         </div>
//       </motion.div>

//       <motion.div
//         className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.3 }}
//       >
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Breakdown</h3>
//         <div className="h-80">
//           <ChartOne />
//         </div>
//       </motion.div>
//     </div> */}
//       {/* <motion.div
//       className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ delay: 0.5 }}
//     >
//       <h3 className="text-lg font-semibold text-gray-800 mb-4">Team Performance</h3>
//       <div className="h-80">
//         <TeamPerformance />
//       </div>
//     </motion.div> */}
