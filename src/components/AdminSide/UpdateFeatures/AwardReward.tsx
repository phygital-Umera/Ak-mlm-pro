import React from 'react';
import {useFetchCustomerHome} from '@/lib/react-query/Customer/home';

type RewardLevel = {
  id: number;
  rank: string;
  pair: number;
  reward: string;
};

const rewardLevels: RewardLevel[] = [
  {id: 1, rank: 'Star', pair: 10, reward: 'Rank Recognition'},
  {id: 2, rank: 'Bronze', pair: 25, reward: 'Training Programme'},
  {id: 3, rank: 'Silver', pair: 50, reward: 'Food Processor'},
  {
    id: 4,
    rank: 'Gold',
    pair: 100,
    reward: 'Ramoji Film City (2N/3D Flight & Train)',
  },
  {id: 5, rank: 'Platinum', pair: 250, reward: 'Mobile Tab'},
  {id: 6, rank: 'Ruby', pair: 500, reward: 'LED TV'},
  {id: 7, rank: 'Sapphire', pair: 1000, reward: 'Foreign Trip'},
  {id: 8, rank: 'Blue Sapphire', pair: 2500, reward: 'Activa (Full Paid)'},
  {id: 9, rank: 'Diamond', pair: 5000, reward: 'Exter Car (Downpayment)'},
  {id: 10, rank: 'Double Diamond', pair: 10000, reward: '₹5,00,000 Cash'},
  {id: 11, rank: 'Blue Diamond', pair: 25000, reward: '₹10,00,000 Cash'},
  {id: 12, rank: 'Crown Diamond', pair: 50000, reward: 'Mercedes Benz Car'},
  {
    id: 13,
    rank: 'Double Crown Diamond',
    pair: 100000,
    reward: '2BHK Flat (Metro City)',
  },
  {id: 14, rank: 'Triple Crown Diamond', pair: 250000, reward: '₹1 CR Cash'},
];

const AwardReward = () => {
  const {data, isPending, isError} = useFetchCustomerHome();

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  // ✅ API PairCount
  const userPairCount = data?.pairCount || 0;

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Reward Levels</h1>

      <div className="border-gray-300 overflow-x-auto rounded border shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-form-strokedark">
              <th className="border px-4 py-2 text-left">S.N</th>
              <th className="border px-4 py-2 text-left">Rank</th>
              <th className="border px-4 py-2 text-left">Required Pair</th>
              <th className="border px-4 py-2 text-left">Reward</th>
            </tr>
          </thead>
          <tbody>
            {rewardLevels.map((level) => {
              const achieved = userPairCount >= level.pair;
              return (
                <tr
                  key={level.id}
                  className={`${
                    achieved ? 'bg-green-900 font-semibold' : 'bg-gray-200'
                  }`}
                >
                  <td className="border px-4 py-2">{level.id}</td>
                  <td className="border px-4 py-2">{level.rank}</td>
                  <td className="border px-4 py-2">{level.pair}</td>
                  <td className="border px-4 py-2">{level.reward}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <p className="text-lg">
          <strong>Your Current Pairs:</strong>{' '}
          <span className="font-bold text-blue-600">{userPairCount}</span>
        </p>
      </div>
    </div>
  );
};

export default AwardReward;
