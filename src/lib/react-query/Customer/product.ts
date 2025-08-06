import {ProductResponse} from '@/types';
import {useQuery} from '@tanstack/react-query';
import {getCustomerAllProducts} from '@/lib/api/Customer/product';

export const useGetCustomerAllProducts = () => {
  return useQuery<ProductResponse>({
    queryKey: ['products'],
    queryFn: getCustomerAllProducts,
  });
};
