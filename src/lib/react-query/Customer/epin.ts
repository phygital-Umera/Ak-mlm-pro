import {
  createEpinRequest,
  getEpinRequests,
  getEpins,
} from '@/lib/api/Customer/epin';
import {EpinResponse} from '@/types';
import {useQueryClient, useMutation, useQuery} from '@tanstack/react-query';
import {CUSTOMER_QUERY_KEYS} from '../QueryKeys';

// Hook to create an E-Pin request
export const useCreateEpinRequest = () => {
  const queryClient = useQueryClient();
  return useMutation<
    EpinResponse,
    unknown,
    {paidAmount: number; imageFile: File}
  >({
    mutationFn: ({paidAmount, imageFile}) =>
      createEpinRequest(paidAmount, imageFile),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CUSTOMER_QUERY_KEYS.EPIN_REQUESTS],
      }); // Invalidate cache after creation
    },
    onError: (error) => {
      console.error('Failed to create E-Pin request:', error);
    },
  });
};

// Hook to fetch E-Pin requests by user ID
export const useGetEpinRequests = () => {
  return useQuery({
    queryKey: [CUSTOMER_QUERY_KEYS.EPIN_REQUESTS],
    queryFn: () => getEpinRequests(),
  });
};

export const useGetEpins = () => {
  return useQuery({
    queryKey: [CUSTOMER_QUERY_KEYS.EPINS],
    queryFn: () => getEpins(),
  });
};
