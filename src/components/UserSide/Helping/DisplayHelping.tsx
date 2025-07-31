/* eslint-disable */
import {useAuthContext} from '@/context/AuthContext';
import {useGetCustomerHelpingData} from '@/lib/react-query/Customer/home';
import React, {useEffect, useState} from 'react';

type Data = {
  level: string;
  levelCount: number;
  levelPrice: string;
  Upgrade: string;
  Rebirth: string;
  totalIncome: number;
};

const commissionData: Data[] = [
  {
    level: 'Level 1',
    levelCount: 2,
    levelPrice: '50 Rs',
    Upgrade: '200 Rs',
    Rebirth: '- 200 Rs',
    totalIncome: 600,
  },
  {
    level: 'Level 2',
    levelCount: 4,
    levelPrice: '150 Rs',
    Upgrade: '400 Rs',
    Rebirth: '- 200 Rs',
    totalIncome: 800,
  },
  {
    level: 'Level 3',
    levelCount: 8,
    levelPrice: '300 Rs',
    Upgrade: '800 Rs',
    Rebirth: '- 200 Rs',
    totalIncome: 1600,
  },
  {
    level: 'Level 4',
    levelCount: 16,
    levelPrice: '1,400 Rs',
    Upgrade: '1,600 Rs',
    Rebirth: '- 200 Rs',
    totalIncome: 3200,
  },
  {
    level: 'Level 5',
    levelCount: 32,
    levelPrice: '6,000 Rs',
    Upgrade: '3,200 Rs',
    Rebirth: '- 200 Rs',
    totalIncome: 6400,
  },
  {
    level: 'Level 6',
    levelCount: 64,
    levelPrice: '25,000 Rs',
    Upgrade: '6,400 Rs',
    Rebirth: '- 200 Rs',
    totalIncome: 12800,
  },
  {
    level: 'Level 7',
    levelCount: 128,
    levelPrice: '76,000 Rs',
    Upgrade: '12,800 Rs',
    Rebirth: '- 200 Rs',
    totalIncome: 25600,
  },
  {
    level: 'Level 8',
    levelCount: 256,
    levelPrice: '2,03,800 Rs',
    Upgrade: '25,600 Rs',
    Rebirth: '- 200 Rs',
    totalIncome: 51200,
  },
  {
    level: 'Level 9',
    levelCount: 512,
    levelPrice: '5,10,000 Rs',
    Upgrade: '51,200 Rs',
    Rebirth: '- 200 Rs',
    totalIncome: 102400,
  },
  {
    level: 'Level 10',
    levelCount: 1024,
    levelPrice: '20,48,000 Rs',
    Upgrade: '1,02,400 Rs',
    Rebirth: '- 200 Rs',
    totalIncome: 204800,
  },
  {
    level: 'Level 11',
    levelCount: 2048,
    levelPrice: '20,48,000 Rs',
    Upgrade: '2,04,800 Rs',
    Rebirth: '- 200 Rs',
    totalIncome: 409600,
  },
  {
    level: 'Level 12',
    levelCount: 4098,
    levelPrice: '20,48,000 Rs',
    Upgrade: '4,09,800 Rs',
    Rebirth: '- 200 Rs',
    totalIncome: 819200,
  },
  {
    level: 'Level 13',
    levelCount: 2048,
    levelPrice: '20,48,000 Rs',
    Upgrade: '8,19,600 Rs',
    Rebirth: '- 200 Rs',
    totalIncome: 1639200,
  },
];

const DisplayHelping = () => {
  const {user} = useAuthContext();
  const id = user?.id;

  const {data: DataFetch, isPending} = useGetCustomerHelpingData(id as string);
  console.log('DataFetch', DataFetch);

  const [selectedId, setSelectedId] = useState<string>('');
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (DataFetch?.helpingProfile) {
      // Set the first profile as default selected
      setSelectedId(DataFetch.helpingProfile[0]?.id || '');
      setSelectedProfile(DataFetch.helpingProfile[0] || null);
    }
  }, [DataFetch]);

  const handleProfileChange = (profileId: string) => {
    const selected = DataFetch?.helpingProfile?.find(
      (item) => item.id === profileId,
    );
    if (selected) {
      setSelectedId(profileId);
      setSelectedProfile(selected);
    }
    setIsDropdownOpen(false);
  };

  if (isPending) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="mb-4 mt-4 text-xl font-bold">Leadership Fund</h1>

      {/* Custom Dropdown */}
      <div className="relative mb-4">
        <label className="mb-2 block text-sm font-medium">Profiles</label>
        <button
          type="button"
          className="border-gray-300 bg-gray-50 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 flex w-full items-center justify-between rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {selectedProfile
            ? `Profile ${DataFetch?.helpingProfile?.findIndex((p) => p.id === selectedId) + 1}`
            : 'Select a profile'}
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isDropdownOpen && (
          <div className="dark:bg-gray-700 absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg dark:bg-black">
            <ul className="max-h-60 overflow-auto py-1">
              {DataFetch?.helpingProfile?.map((profile, idx) => (
                <li
                  key={profile.id}
                  className={`hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer px-4 py-2 text-sm ${
                    selectedId === profile.id
                      ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-white'
                      : 'text-gray-700 dark:text-gray-200'
                  }`}
                  onClick={() => handleProfileChange(profile.id)}
                >
                  Profile {idx + 1}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* {selectedProfile ? (
        <div className="dark:bg-gray-800 mb-6 mt-4 rounded-lg border border-white p-4 shadow-default dark:shadow-none">
          <p className="text-gray-800 dark:text-gray-200">
            <strong>Current Helping Level:</strong> Level{' '}
            {selectedProfile.level}
          </p>
          <p className="text-gray-800 dark:text-gray-200">
            <strong>Joining Number:</strong> {selectedProfile.joiningnumber}
          </p>
          <p className="text-gray-800 dark:text-gray-200">
            <strong>Customer No:</strong> {selectedProfile.custmerNo}
          </p>
        </div>
      ) : (
        <div className="dark:bg-gray-800 mb-6 mt-4 rounded-lg border border-white p-4 shadow-default dark:shadow-none">
          <p className="text-gray-800 dark:text-gray-200">
            No helping data available
          </p>
        </div>
      )} */}

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-3 text-left text-sm font-semibold">Plan</th>
              <th className="p-3 text-left text-sm font-semibold">
                Customer Required
              </th>
              <th className="p-3 text-left text-sm font-semibold">Income</th>
              <th className="p-3 text-left text-sm font-semibold">
                Total Income{' '}
              </th>
              <th className="p-3 text-left text-sm font-semibold">Upgrade</th>
              <th className="p-3 text-left text-sm font-semibold">Rebirth</th>
            </tr>
          </thead>
          <tbody>
            {commissionData.map((row) => {
              const levelNumber = parseInt(row.level.split(' ')[1]);
              const isCurrentLevel = levelNumber === selectedProfile?.level;

              return (
                <tr
                  key={row.level}
                  className={`dark:border-gray-700 border-b ${
                    isCurrentLevel
                      ? 'bg-green-100 dark:bg-green-900'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <td className="p-3">
                    <span
                      className={`${
                        isCurrentLevel
                          ? 'font-semibold text-green-700 dark:text-green-300'
                          : 'text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      {row.level}
                    </span>
                  </td>
                  <td className="text-gray-600 dark:text-gray-300 p-3">
                    {row.levelCount}
                  </td>
                  <td className="text-gray-600 dark:text-gray-300 p-3">
                    {row.levelPrice}
                  </td>
                  <td className="text-gray-600 dark:text-gray-300 p-3">
                    {row.totalIncome}
                  </td>
                  <td className="text-gray-600 dark:text-gray-300 p-3">
                    {row.Upgrade}
                  </td>
                  <td className="p-3 text-red-600">{row.Rebirth}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayHelping;
