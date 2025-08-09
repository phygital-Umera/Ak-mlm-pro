/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {IoTodaySharp, IoWalletSharp} from 'react-icons/io5';
import {
  PiAlignLeftSimpleDuotone,
  PiAlignRightSimpleDuotone,
} from 'react-icons/pi';
import StatCard from './StatCard';
import {useAuthContext} from '@/context/AuthContext';
import CustomerTeamPerformance from '@/components/Charts/CustomerTeamPerformance';
import CustomerNewMember from '@/components/Charts/CustomerNewMember';
import {useFetchCustomerHome} from '@/lib/react-query/Customer/home';
import Loader from '@/components/common/Loader';
import Popup from '@/components/Popu/Popup';
import {BsWalletFill} from 'react-icons/bs';
import IncompleteProfilePopup from '@/components/Popu/IncompleteProfilePopup';
import {useGetCustomerProfile} from '@/lib/react-query/Admin/profile/profile';

interface StatCardProps {
  amount: string;
  title: string;
  icon: React.ReactNode;
}

interface Customer {
  crnNo: string;
  firstName: string;
  lastName: string;
  pairCount: number;
  createdAt?: string;
}

// Reward tier data structure
interface RewardTier {
  rank: string;
  pairsRequired: number;
  reward: string;
  icon: string;
}

const CustomerDashboard: React.FC = () => {
  const {user, customer} = useAuthContext();
  const {
    data: dataa,
    isError,
    isPending,
    refetch,
    isSuccess,
  } = useFetchCustomerHome();

  console.log('====================================');
  console.log('FFFFFFFFFFFFFFFFFFF', dataa);
  console.log('====================================');

  const [statsData, setStatsData] = useState<StatCardProps[]>([]);
  const [lastCustomers, setLastCustomers] = useState<Customer[]>([]);
  const [topCustomers, setTopCustomers] = useState<Customer[]>([]);
  const [showExtraBoxes, setShowExtraBoxes] = useState(false);
  const [isPopup, setIsPopup] = useState(!user?.isActive);
  const [currentTier, setCurrentTier] = useState<RewardTier | null>(null);
  const [nextTier, setNextTier] = useState<RewardTier | null>(null);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [selectedView, setSelectedView] = useState<'today' | 'all'>('today');

  const isCustomerProfileIncomplete = (customer: any) => {
    if (!customer) return true;

    const requiredFields = [
      'dob',
      'gender',
      'flatNo',
      'areaName',
      'landMark',
      'pinCode',
      'city',
      'state',
      'aadharNo',
      'panNo',
      'bankName',
      'bankAccNo',
      'bankIFSC',
      'bankBranch',
      'upiId',
    ];

    return requiredFields.some((field) => customer[field] == null);
  };

  const [showIncompletePopup, setShowIncompletePopup] = useState(
    isCustomerProfileIncomplete(customer),
  );
  const [showEpinPopup, setShowEpinPopup] = useState(
    !isCustomerProfileIncomplete(customer) && !user?.isActive,
  );
  const {data: profileData} = useGetCustomerProfile();
  console.log('====================================');
  console.log('profileData..................', profileData);
  console.log('====================================');

  useEffect(() => {
    if (!profileData?.bankAccNo) {
      setShowIncompletePopup(true);
    }
  }, [profileData]);

  useEffect(() => {
    if (!isCustomerProfileIncomplete(customer)) {
      if (!user?.isActive) {
        setShowEpinPopup(true);
      }
    }
  }, [customer, user?.isActive]);

  // Define all reward tiers
  const rewardTiers: RewardTier[] = [
    {rank: 'Star', pairsRequired: 10, reward: 'Blazer', icon: '⭐'},
    {rank: 'Gold Star', pairsRequired: 30, reward: 'Mobile Tab', icon: '🌟'},
    {rank: 'Pearl', pairsRequired: 90, reward: 'Laptop', icon: '💎'},
    {
      rank: 'Emerald',
      pairsRequired: 300,
      reward: 'Electric Scooter',
      icon: '🔶',
    },
    {
      rank: 'Ruby',
      pairsRequired: 1000,
      reward: 'Foreign Trip (Thailand)',
      icon: '🔴',
    },
    {
      rank: 'Platinum',
      pairsRequired: 3000,
      reward: 'MG Comet EV Car',
      icon: '🔷',
    },
    {rank: 'Diamond', pairsRequired: 6000, reward: 'Tata Curvv EV', icon: '💠'},
    {
      rank: 'Double Diamond',
      pairsRequired: 10000,
      reward: 'Tata Safari',
      icon: '💠💠',
    },
    {
      rank: 'Royal Diamond',
      pairsRequired: 15000,
      reward: 'House Fund of Rs.50 Lacs',
      icon: '👑💠',
    },
    {
      rank: 'Crown Diamond',
      pairsRequired: 30000,
      reward: 'Range Rover (Defender)',
      icon: '👑👑',
    },
  ];

  useEffect(() => {
    // Show popup if user is inactive
    setIsPopup(!user?.isActive);
  }, [user?.isActive]);

  useEffect(() => {
    if (isSuccess && dataa) {
      const todayStats = [
        {
          title: 'Business Income',
          amount: `${dataa?.totalCommission || 0}`,
          icon: <IoWalletSharp className="text-2xl" />,
        },
        {
          title: 'Today Matching Income',
          amount: `${dataa?.todayBinary || 0}`,
          icon: <IoTodaySharp className="text-2xl" />,
        },
        // {
        //   title: 'Today Pair Count',
        //   amount: `${dataa?.todaysPairCount || 0}`,
        //   icon: <IoTodaySharp className="text-2xl" />,
        // },
        {
          title: 'Today Direct Sponsor Income',
          amount: `${dataa?.todayRoyalty || 0}`,
          icon: <IoTodaySharp className="text-2xl" />,
        },
        {
          title: 'Today Repurchase Balance',
          amount: `${dataa?.todayRepurchase || 0}`,
          icon: <IoTodaySharp className="text-2xl" />,
        },
        {
          title: 'Carry Forward Count',
          amount: `${dataa?.carry_forward_count || 0}`,
          icon: <IoTodaySharp className="text-2xl" />,
        },
        {
          title: 'Carry Forward Branch',
          amount: `${dataa?.carry_forward_Branch || 0}`,
          icon: <IoTodaySharp className="text-2xl" />,
        },
      ];

      const allStats = [
        {
          title: 'Business Income',
          amount: `${dataa?.totalCommission || 0}`,
          icon: <IoWalletSharp className="text-2xl" />,
        },
        {
          title: 'Total Matching Income',
          amount: `${dataa?.binary || 0}`,
          icon: <IoWalletSharp className="text-2xl" />,
        },

        {
          title: 'Total Direct Sponsor Income',
          amount: `${dataa?.royelty || 0}`,
          icon: <IoWalletSharp className="text-2xl" />,
        },
        {
          title: 'Total Repurchase Balance',
          amount: `${dataa?.repurchase || 0}`,
          icon: <IoWalletSharp className="text-2xl" />,
        },
        {
          title: 'Total Pair Count',
          amount: `${dataa?.pairCount || 0}`,
          icon: <IoWalletSharp className="text-2xl" />,
        },
        {
          title: 'Left Team Count',
          amount: `${dataa?.leftCount || 0}`,
          icon: <PiAlignLeftSimpleDuotone className="text-2xl" />,
        },
        {
          title: 'Right Team Count',
          amount: `${dataa?.rightCount || 0}`,
          icon: <PiAlignRightSimpleDuotone className="text-2xl" />,
        },
        {
          title: 'Carry Forward Count',
          amount: `${dataa?.carry_forward_count || 0}`,
          icon: <IoWalletSharp className="text-2xl" />,
        },
      ];

      setStatsData(selectedView === 'today' ? todayStats : allStats);
      setLastCustomers(dataa.lastCustomers || []);
      setTopCustomers(dataa.topCustomers || []);

      // Calculate current tier and progress
      const totalPairs = dataa.pairCount || 0;
      calculateTierProgress(totalPairs);
    }
  }, [isSuccess, dataa, selectedView]);

  const calculateTierProgress = (totalPairs: number) => {
    let current = null;
    let next = null;

    // Find the highest tier the user has achieved
    for (let i = rewardTiers.length - 1; i >= 0; i--) {
      if (totalPairs >= rewardTiers[i].pairsRequired) {
        current = rewardTiers[i];
        if (i < rewardTiers.length - 1) {
          next = rewardTiers[i + 1];
        }
        break;
      }
    }

    // If user hasn't reached any tier yet
    if (!current && rewardTiers.length > 0) {
      next = rewardTiers[0];
    }

    setCurrentTier(current);
    setNextTier(next);

    // Calculate progress percentage
    if (next) {
      const basePairs = current ? current.pairsRequired : 0;
      const progress =
        ((totalPairs - basePairs) / (next.pairsRequired - basePairs)) * 100;
      setProgressPercentage(Math.min(100, Math.max(0, progress)));
    } else {
      setProgressPercentage(100);
    }
  };

  const handlePopupClose = () => {
    setIsPopup(false);
  };

  const handleToggle = () => {
    setShowExtraBoxes(!showExtraBoxes);
  };

  if (isError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold text-red-600">
          An error occurred while fetching data.
        </h1>
        <button
          onClick={() => window.location.reload()}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <>
      {showEpinPopup ? (
        <Popup onClose={() => setShowEpinPopup(false)} />
      ) : showIncompletePopup ? (
        <IncompleteProfilePopup onClose={() => setShowIncompletePopup(false)} />
      ) : null}
      <div>
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => setSelectedView('today')}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              selectedView === 'today'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            Today's Data
          </button>
          <button
            onClick={() => setSelectedView('all')}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              selectedView === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            All Data
          </button>
        </div>

        {/* Reward Progress Section */}
        <div className="mb-6 rounded-lg border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {currentTier ? (
                <>
                  <span className="mr-2 text-3xl">{currentTier.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {currentTier.rank}
                    </h3>
                    <p className="text-gray-500 text-sm">Current Rank</p>
                  </div>
                </>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold">No Rank Yet</h3>
                  <p className="text-gray-500 text-sm">
                    Start pairing to earn rewards
                  </p>
                </div>
              )}
            </div>

            <div className="flex-1 px-4">
              <div className="mb-1 flex justify-between">
                <span className="text-sm font-medium">
                  {currentTier ? currentTier.pairsRequired : 0} pairs
                </span>
                <span className="text-sm font-medium">
                  {nextTier
                    ? nextTier.pairsRequired
                    : currentTier?.pairsRequired || 0}{' '}
                  pairs
                </span>
              </div>
              <div className="bg-gray-200 dark:bg-gray-700 h-2.5 w-full rounded-full">
                <div
                  className="h-2.5 rounded-full bg-blue-600"
                  style={{width: `${progressPercentage}%`}}
                ></div>
              </div>
            </div>

            <div className="text-right">
              {nextTier ? (
                <>
                  <h3 className="text-lg font-semibold">{nextTier.rank}</h3>
                  {/* <p className="text-gray-500 text-sm">
                    Next: {nextTier.reward}
                  </p> */}
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold">Max Rank Achieved</h3>
                  <p className="text-gray-500 text-sm">
                    {currentTier?.reward || ''}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          {statsData
            .slice(0, showExtraBoxes ? statsData.length : 4)
            .map((stat, index) => (
              <StatCard
                amount={stat.amount}
                icon={stat.icon}
                title={stat.title}
                key={index}
              />
            ))}
        </div>

        {statsData.length > 4 && (
          <button
            onClick={handleToggle}
            className="mt-4 flex items-center text-blue-600"
          >
            {showExtraBoxes ? (
              <>
                <span>Show Less</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="ml-2 h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </>
            ) : (
              <>
                <span>Show More</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="ml-2 h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </>
            )}
          </button>
        )}

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div className="col-span-12 md:col-span-6">
            <CustomerNewMember newmembers={lastCustomers} />
          </div>
          <div className="col-span-12 md:col-span-6">
            <CustomerTeamPerformance topPerformers={topCustomers} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard;
