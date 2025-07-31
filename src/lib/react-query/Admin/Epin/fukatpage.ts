import {createEPin} from '@/lib/api/Admin/Epin/epin';
import {CreateEPinResponse, ApiError} from '@/types';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {ADMIN_EPIN_QUERY_KEYS} from '../../QueryKeys';
import {dusaraFukatPage, fukatPage} from '@/lib/api/Admin/Epin/fukatpage';

export const useFukatPage = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateEPinResponse, ApiError, {customerId: string}>({
    mutationFn: (data: {customerId: string}) => fukatPage(data), // Pass the epincount here
    onSuccess: () => {
      // Additional logic on success if needed
    },
    onError: (error) => {
      console.error('Failed to create E-Pin:', error);
      // Handle errors (e.g., display a toast notification)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['Fukat Page'], // Replace with the actual query key
      });
    },
  });
};

export const useDusaraFukatPage = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CreateEPinResponse,
    ApiError,
    {customerId: string; leftcount: number; rightcount: number}
  >({
    mutationFn: (data: {
      customerId: string;
      leftcount: number;
      rightcount: number;
    }) => dusaraFukatPage(data), // Pass the epincount here
    onSuccess: () => {
      // Additional logic on success if needed
    },
    onError: (error) => {
      console.error('Failed to create E-Pin:', error);
      // Handle errors (e.g., display a toast notification)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['Fukat Page'], // Replace with the actual query key
      });
    },
  });
};
