import {
  getAdminWalletHistory,
  getWalletHistory,
} from '@/lib/api/Admin/WalletHistory/wallethistory';
import {useQuery} from '@tanstack/react-query';

export const useGetWalletHistory = () => {
  return useQuery({
    queryKey: ['GetWalletHistory'],
    queryFn: getWalletHistory,
  });
};

export const useGetAdminWalletHistory = () => {
  return useQuery({
    queryKey: ['admin_wallet_history'],
    queryFn: () => getAdminWalletHistory(),
  });
};
