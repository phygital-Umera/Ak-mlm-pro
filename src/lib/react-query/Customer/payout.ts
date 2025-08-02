import {fetchPayout} from '@/lib/api/Customer/payout';
import {useQuery} from '@tanstack/react-query';

export const useFetchPayout = () => {
  return useQuery({
    queryKey: ['payout'],
    queryFn: () => fetchPayout(),
  });
};
