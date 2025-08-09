import {getCustomer, getCommission} from '@/lib/api/Customer/home';
import {Customer, Commission} from '@/types';
import {useQuery} from '@tanstack/react-query';
import {CUSTOMER_QUERY_KEYS} from '../QueryKeys';
import {getDirectCustomer} from '@/lib/api/Customer/commission';

// Fetch customer details hook
export const useGetCustomer = (id: string) => {
  return useQuery({
    queryKey: [CUSTOMER_QUERY_KEYS.CUSTOMER],
    queryFn: () => getCustomer(id),
  });
};

// Fetch customer commissions hook
export const useGetCommission = (id: string) => {
  return useQuery({
    queryKey: [CUSTOMER_QUERY_KEYS.COMMISSION],
    queryFn: () => getCommission(id),
  });
};

export const useGetDirectCustomer = () => {
  return useQuery({
    queryKey: ['direct-customer'],
    queryFn: () => getDirectCustomer(),
  });
};
