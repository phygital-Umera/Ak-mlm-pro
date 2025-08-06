/* eslint-disable */
import {
  createEpinProductRequest,
  createEpinRequest,
  getEpinRequests,
  getEpins,
  getProductEpins,
} from '@/lib/api/Customer/epin';
import {EpinResponse} from '@/types';
import {useQueryClient, useMutation, useQuery} from '@tanstack/react-query';
import {CUSTOMER_QUERY_KEYS} from '../QueryKeys';
import toast from 'react-hot-toast';

// Hook to create an E-Pin request
export const useCreateEpinRequest = () => {
  const queryClient = useQueryClient();
  return useMutation<
    EpinResponse,
    unknown,
    FormData // Accept FormData directly
  >({
    mutationFn: (formData) => createEpinRequest(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CUSTOMER_QUERY_KEYS.EPIN_REQUESTS],
      });
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

export const useCreateEpinProductRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<EpinResponse, unknown, {count: number; price: number}>({
    mutationFn: ({count, price}) => createEpinProductRequest(count, price),

    onSuccess: (data) => {
      toast.success(data?.message || 'E-Pin request created successfully!');
      queryClient.invalidateQueries({
        queryKey: [CUSTOMER_QUERY_KEYS.EPIN_REQUESTS],
      });
    },

    onError: (error: any) => {
      const message = error?.message || error?.response?.data?.message;
      toast.error(message || 'Failed to create E-Pin request');
      console.error('E-Pin request error:', error);
    },
  });
};

export const useGetProductEpins = () => {
  return useQuery({
    queryKey: [CUSTOMER_QUERY_KEYS.PRODUCT_EPINS],
    queryFn: () => getProductEpins(),
  });
};
