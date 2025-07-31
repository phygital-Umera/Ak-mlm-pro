import {
  getCustomer,
  getCommission,
  fetchCustomerHome,
  getCustomerLevel,
  getCustomerGoldenIncome,
  getCustomerHelpingData,
  getBDfund,
} from '@/lib/api/Customer/home';
import {Customer, Commission} from '@/types';
import {useQuery} from '@tanstack/react-query';
import {CUSTOMER_QUERY_KEYS} from '../QueryKeys';

// Fetch customer details
export const useGetCustomer = (id: string) => {
  return useQuery({
    queryKey: [CUSTOMER_QUERY_KEYS.CUSTOMER],
    queryFn: () => getCustomer(id),
  });
};

// Fetch customer commissions
export const useGetCommission = (id: string) => {
  return useQuery({
    queryKey: [CUSTOMER_QUERY_KEYS.COMMISSION],
    queryFn: () => getCommission(id),
  });
};

export const useFetchCustomerHome = () => {
  return useQuery({
    queryKey: ['FetchCustomerHome'],
    queryFn: () => fetchCustomerHome(),
  });
};

export const useGetCustomerLevel = () => {
  return useQuery({
    queryKey: ['FetchCustomerHome'],
    queryFn: () => getCustomerLevel(),
  });
};
export const useGetBDfund = (id: string) => {
  return useQuery({
    queryKey: ['FetchCustomerHome'],
    queryFn: () => getBDfund(id),
  });
};

export const useGetCustomerGoldenIncome = (id: string) => {
  return useQuery({
    queryKey: ['FetchCustomerHome'],
    queryFn: () => getCustomerGoldenIncome(id),
  });
};

export const useGetCustomerHelpingData = (id: string) => {
  return useQuery({
    queryKey: ['FetchCustomerHelpingData'],
    queryFn: () => getCustomerHelpingData(id),
  });
};
