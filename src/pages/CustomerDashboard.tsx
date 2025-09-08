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

interface RewardTier {
  rank: string;
  pairsRequired: number;
  reward: string;
  icon: string;
}
type CustomerProfile = {
  dob: string|undefined;
  gender: string|undefined;
  flatNo: string|undefined;
  areaName: string|undefined;
  landMark: string|undefined;
  pinCode: string|undefined;
  city: string|undefined;
  state: string|undefined;
  aadharNo: string|undefined;
  panNo: string|undefined;
  bankName: string|undefined;
  bankAccNo: string|undefined;
  bankIFSC: string|undefined;
  bankBranch: string|undefined;
  upiId: string|undefined;
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

  const [statsData, setStatsData] = useState<StatCardProps[]>([]);
  const [lastCustomers, setLastCustomers] = useState<Customer[]>([]);
  const [topCustomers, setTopCustomers] = useState<Customer[]>([]);
  const [showExtraBoxes, setShowExtraBoxes] = useState(false);

  // Popup states
  const [showIncompletePopup, setShowIncompletePopup] = useState(false);
  const [showEpinPopup, setShowEpinPopup] = useState(false);

  const [currentTier, setCurrentTier] = useState<RewardTier | null>(null);
  const [nextTier, setNextTier] = useState<RewardTier | null>(null);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [selectedView, setSelectedView] = useState<'today' | 'all'>('today');

  const {data: profileData} = useGetCustomerProfile();

  console.log('====================================');
  console.log('profileData..................', profileData);
  console.log('====================================');

  const isCustomerProfileIncomplete = (customer:CustomerProfile) => {
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

  // Control which popup to show
  useEffect(() => {
    if (!customer) return;
    if (isCustomerProfileIncomplete(customer as CustomerProfile)) {
      setShowIncompletePopup(true);
      setShowEpinPopup(false);
    } 
     if (!user?.isActive) {
      setShowIncompletePopup(false);
      setShowEpinPopup(true);
    } else {
      setShowIncompletePopup(false);
      setShowEpinPopup(false);
    }
  }, [customer, user?.isActive]);

  // Reward tiers
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
        {
          title: 'Wallet Amount',
          amount: `${dataa?.wallet?.amount || 0}`,
          icon: <BsWalletFill className="text-2xl" />,
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
          amount: `${dataa?.directCommission || 0}`,
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

      const totalPairs = dataa.pairCount || 0;
      calculateTierProgress(totalPairs);
    }
  }, [isSuccess, dataa, selectedView]);

  const calculateTierProgress = (totalPairs: number) => {
    let current: RewardTier | null = null;
    let next: RewardTier | null = null;

    for (let i = rewardTiers.length - 1; i >= 0; i--) {
      if (totalPairs >= rewardTiers[i].pairsRequired) {
        current = rewardTiers[i];
        if (i < rewardTiers.length - 1) {
          next = rewardTiers[i + 1];
        }
        break;
      }
    }

    if (!current && rewardTiers.length > 0) {
      next = rewardTiers[0];
    }

    setCurrentTier(current);
    setNextTier(next);

    if (next) {
      const basePairs = current ? current.pairsRequired : 0;
      const progress =
        ((totalPairs - basePairs) / (next.pairsRequired - basePairs)) * 100;
      setProgressPercentage(Math.min(100, Math.max(0, progress)));
    } else {
      setProgressPercentage(100);
    }
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
      {showIncompletePopup && (
        <IncompleteProfilePopup onClose={() => setShowIncompletePopup(false)} />
      )}

      {showEpinPopup && !showIncompletePopup && (
        <Popup onClose={() => setShowEpinPopup(false)} />
      )}

      <div>
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
