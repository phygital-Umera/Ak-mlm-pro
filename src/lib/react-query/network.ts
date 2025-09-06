import {useQuery} from '@tanstack/react-query';
import {
  getnetwork,
  getNewnetwork,
  getNewnetworkCustomer,
  getbinarynetwork,
  getBinaryNetworkById,
} from '../api/network';
import {NETWORK_QUERY_KEYS, NEW_NETWORK_QUERY_KEYS} from './QueryKeys';

export const useGetNetwotkTree = () => {
  return useQuery({
    queryKey: [NETWORK_QUERY_KEYS.NETWORK],
    queryFn: () => getnetwork(),
  });
};

export const useGetNetwotkBinaryTree = () => {
  return useQuery({
    queryKey: [NETWORK_QUERY_KEYS.NETWORK],
    queryFn: () => getbinarynetwork(),
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
