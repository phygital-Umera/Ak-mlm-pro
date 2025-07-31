import {useQuery} from '@tanstack/react-query';
import {getnetwork, getNewnetwork, getNewnetworkCustomer} from '../api/network';
import {NETWORK_QUERY_KEYS, NEW_NETWORK_QUERY_KEYS} from './QueryKeys';

export const useGetNetwotkTree = () => {
  return useQuery({
    queryKey: [NETWORK_QUERY_KEYS.NETWORK],
    queryFn: () => getnetwork(),
  });
};

export const useGetNewNetwotkTree = (id: string) => {
  return useQuery({
    queryKey: [NEW_NETWORK_QUERY_KEYS.NewNETWORK],
    queryFn: () => getNewnetwork(id),
  });
};

export const useGetNewNetwotkTreeCustomer = (id: string) => {
  return useQuery({
    queryKey: [NEW_NETWORK_QUERY_KEYS.NewNETWORK],
    queryFn: () => getNewnetworkCustomer(id),
  });
};
