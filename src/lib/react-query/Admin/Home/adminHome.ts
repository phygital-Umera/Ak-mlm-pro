import {
  createCountsAdmin,
  fetchAdminHome,
  fetchCustomerList,
  goldenIncomeList,
  voucherList,
} from '@/lib/api/Admin/Home/adminHome';
import {useMutation, useQuery} from '@tanstack/react-query';
import {ADMIN_DASHBOARD_QUERY_KEYS} from '../../QueryKeys';
import toast from 'react-hot-toast';

export const useFetchAdminHome = () => {
  return useQuery({
    queryKey: [ADMIN_DASHBOARD_QUERY_KEYS.ADMIN_HOME],
    queryFn: fetchAdminHome,
  });
};

// Hook to fetch customer list data
export const useFetchCustomerList = () => {
  return useQuery({
    queryKey: [ADMIN_DASHBOARD_QUERY_KEYS.CUSTOMER_LIST],
    queryFn: fetchCustomerList,
  });
};

export const useCreateCountsAdmin = () => {
  return useMutation({
    mutationFn: createCountsAdmin,
    onSuccess: () => {
      toast.success('Counts submitted successfully!');
    },
    onError: () => {
      toast.error('Failed to submit counts');
    },
  });
};

export const useGoldenIncomeList = () => {
  return useQuery({
    queryKey: ['GoldenIncomeList'],
    queryFn: goldenIncomeList,
  });
};

export const useVoucherList = () => {
  return useQuery({
    queryKey: ['GetAllVouchers'],
    queryFn: voucherList,
  });
};
