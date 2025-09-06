/* eslint-disable  */
import {
  ApproveEpinRequest,
  checkEpin,
  createCustomerEPin,
  createEPin,
  EpinHistory,
  getAdminEpins,
  getAllEPins,
  getCustomerEpins,
  getEpinRequest,
  getOtp,
  rejectEpinRequest,
} from '@/lib/api/Admin/Epin/epin';
import {
  CreateEPinResponse,
  CreateEPinRequest,
  GetAllEPinsResponse,
  RejectEpinRequestResponse,
  ApiError,
} from '@/types';
import {useQueryClient, useMutation, useQuery} from '@tanstack/react-query';
import {ADMIN_EPIN_QUERY_KEYS} from '../../QueryKeys';
import toast from 'react-hot-toast';

export const useCreateEPin = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CreateEPinResponse,
    ApiError,
    {epincount: number; price: number}
  >({
    mutationFn: ({epincount, price}) => createEPin(epincount, price), // Pass the epincount here
    onSuccess: () => {
      // Additional logic on success if needed
    },
    onError: (error) => {
      console.error('Failed to create E-Pin:', error);
      // Handle errors (e.g., display a toast notification)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_EPIN_QUERY_KEYS.GET_ALL_EPINS], // Replace with the actual query key
      });
    },
  });
};

type CreateEPinInput = {
  Count: number;
  price: number;
  crnNo: string;
  customerId: string;
  package: string;
};

export const useCreateCustomerEPin = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CreateEPinResponse,
    ApiError,
    CreateEPinInput
  >({
    mutationFn: ({ Count, price, crnNo, customerId, package: pkg }) =>
      createCustomerEPin(Count, price, crnNo, customerId, pkg),
    onSuccess: () => {
      toast.success('Customer E-Pin created successfully!');
    },
    onError: (error) => {
      console.error('Failed to create E-Pin:', error);
      toast.error(error.response?.data?.message || 'Failed to create E-Pin');
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_EPIN_QUERY_KEYS.GET_ALL_EPINS],
      });
    },
  });
};
// Hook to fetch all E-Pins
export const useGetAllEPins = () => {
  return useQuery<GetAllEPinsResponse>({
    queryKey: [ADMIN_EPIN_QUERY_KEYS.GET_ALL_EPINS],
    queryFn: getAllEPins,
  });
};

export const useGetAdminPins = () => {
  return useQuery({
    queryKey: [ADMIN_EPIN_QUERY_KEYS.GET_ALL_EPINS],
    queryFn: getAdminEpins,
  });
};

export const useCheckEpin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: checkEpin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_EPIN_QUERY_KEYS.GET_ALL_EPINS],
      });
    },
  });
};

export const useAGetOtp = () => {
  return useMutation({
    mutationFn: ({epincount, type}: {epincount: string; type: string}) =>
      getOtp(epincount, type),
  });
};
export const useGetCustomerEpins = () => {
  return useQuery({
    queryKey: [ADMIN_EPIN_QUERY_KEYS.CUSTOMERS_EPINS],
    queryFn: () => getCustomerEpins(),
  });
};

export const useApproveEpinRequest = () => {
  const queryClient = useQueryClient();
  return useMutation<
    CreateEPinResponse,
    unknown,
    {id: string; data: {epincount: number}}
  >({
    mutationFn: ({id, data}) => ApproveEpinRequest(id, data),
    onSuccess: () => {},
    onError: (error) => {
      console.error('Failed to approve E-Pin request:', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_EPIN_QUERY_KEYS.GET_ALL_EPIN_REQUESTS],
      });
    },
  });
};

// Hook to reject an E-Pin request
export const useRejectEpinRequest = () => {
  const queryClient = useQueryClient();
  return useMutation<RejectEpinRequestResponse, unknown, string>({
    mutationFn: (id) => rejectEpinRequest(id),
    onSuccess: () => {},
    onError: (error) => {
      console.error('Failed to reject E-Pin request:', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_EPIN_QUERY_KEYS.GET_ALL_EPIN_REQUESTS],
      });
    },
  });
};

export const useGetAllEpinRequests = () => {
  return useQuery({
    queryKey: [ADMIN_EPIN_QUERY_KEYS.GET_ALL_EPIN_REQUESTS],
    queryFn: getEpinRequest,
  });
};

export const usegetEpinHistory = () => {
  return useQuery({
    queryKey: [ADMIN_EPIN_QUERY_KEYS.GET_EPIN_HISTORY],
    queryFn: EpinHistory,
  });
};
