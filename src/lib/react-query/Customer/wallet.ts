import {createWalletData} from '@/lib/api/Customer/wallet';
import {ApiError, ProductListResponse} from '@/types';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';

// export const useGetWalletData = (id: string) => {
//   return useQuery({
//     queryKey: ['GetWalletData'],
//     queryFn: () => getWalletData(id),
//   });
// };

export const useCreateWalletData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {id: string}) => createWalletData(payload),
    onSuccess: () => {
      toast.success('Wallet transaction created successfully');
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({
        queryKey: ['GetWalletData'],
      });
      queryClient.invalidateQueries({
        queryKey: ['walletBalance'],
      });
    },
    onError: (res) => {
      const errorMessage =
        res?.message || 'Wallet Amount Should Be Greater Than 100';
      toast.error(errorMessage);
      // console.error('Wallet creation error:', error);
    },
  });
};
