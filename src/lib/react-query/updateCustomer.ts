import {
  Customer,
  ApiError,
  UpdateCustomerData,
  GetAllEPinsResponse,
  EditEmails,
} from '@/types';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  assignEpin,
  getAllCustomers,
  getAllEmails,
  getCustomerById,
  updateCustomer,
  updateCustomerActive,
  updateCustomerEmail,
} from '../api/updateCustomer';
import {ADMIN_EPIN_QUERY_KEYS, CUSTOMER_QUERY_KEYS} from './QueryKeys';
import {getAllEPins} from '../api/Admin/Epin/epin';

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({data, id}: {data: UpdateCustomerData; id: string}) =>
      updateCustomer(data, id),
    onSuccess: () => {
      // console.log('Customer updated successfully:', res);
      queryClient.invalidateQueries({
        queryKey: [CUSTOMER_QUERY_KEYS.CUSTOMER],
      });
    },
    onError: (error: unknown) => {
      console.error(error);
    },
  });
};

export const useUpdateCustomerEmail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({data}: {data: EditEmails}) => updateCustomerEmail(data),
    onSuccess: () => {
      // console.log('Customer updated successfully:', res);
      queryClient.invalidateQueries({
        queryKey: [CUSTOMER_QUERY_KEYS.CUSTOMER],
      });
    },
    onError: (error: unknown) => {
      console.error(error);
    },
  });
};

export const useAssignEpin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({crnNo, epinNo}: {crnNo: string; epinNo: string}) =>
      assignEpin(crnNo, epinNo),
    onSuccess: () => {
      // console.log('Customer updated successfully:', res);
      queryClient.invalidateQueries({
        queryKey: ['assign_epin'],
      });
    },
    onError: (error: unknown) => {
      console.error(error);
    },
  });
};

export const useGetAllEmails = () => {
  return useQuery({
    queryKey: ['GetAllEmails'],
    queryFn: getAllEmails,
  });
};

export const useGetAllCustomers = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: getAllCustomers,
  });
};

export const useUpdateCustomerActive = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({data}: {data: {epinNo: string}}) =>
      updateCustomerActive(data),
    onSuccess: () => {
      // console.log('Customer updated successfully:', res);
      queryClient.invalidateQueries({
        queryKey: ['assign_epin'],
      });
    },
    onError: (error: unknown) => {
      console.error(error);
    },
  });
};

export const useGetCustomerById = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getCustomerById,
  });
};
