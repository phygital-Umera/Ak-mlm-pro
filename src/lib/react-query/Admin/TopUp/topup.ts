/*eslint-disable */
import {useMutation} from '@tanstack/react-query';
import {useQueryClient} from '@tanstack/react-query';
import {recallEpin, topUp} from '@/lib/api/Admin/TopUp/topup';
import toast from 'react-hot-toast';

export const useAddTopUp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => topUp(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['topup'],
      });
    },
  });
};

export const useAddRecallEpin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => recallEpin(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['recallEpin'],
      });
      toast.success('E-Pin recall successful');
    },
    onError: (error: any) => {
      const errorMessage =
        error?.data?.message || error?.response?.data?.message;
      console.log('errorMessage', errorMessage);
      toast.error(errorMessage || 'Failed to recall E-Pin');
    },
  });
};
