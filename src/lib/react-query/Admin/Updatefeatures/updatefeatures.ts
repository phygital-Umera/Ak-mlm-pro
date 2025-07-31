import {
  getAwardReward,
  getGoldReward,
  getLeadershipFund,
  getRetirement,
} from '@/lib/api/Admin/UpdateFeatures/updatefeature';
import {useQuery} from '@tanstack/react-query';

//Get Retirement Fund
export const useGetRetirement = () => {
  return useQuery({
    queryKey: ['GetRetirement'],
    queryFn: getRetirement,
  });
};

//Get Gold Reward
export const useGetGoldReward = () => {
  return useQuery({
    queryKey: ['GetGoldReward'],
    queryFn: getGoldReward,
  });
};

//Get Leadership Fund
export const useGetLeadershipFund = () => {
  return useQuery({
    queryKey: ['GetLeadershipFund'],
    queryFn: getLeadershipFund,
  });
};

//Get Award Reward
export const useGetAwardReward = () => {
  return useQuery({
    queryKey: ['GetAwardReward'],
    queryFn: getAwardReward,
  });
};
