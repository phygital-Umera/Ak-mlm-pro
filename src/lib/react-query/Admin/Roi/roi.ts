import {getCustomersMlm, getRoiList} from '@/lib/api/Admin/Roi/roi';
import {useQuery} from '@tanstack/react-query';

export const useGetRoiList = () => {
  return useQuery({
    queryKey: ['GetRoiList'],
    queryFn: getRoiList,
  });
};
export const useGetCustomersMlm = () => {
  return useQuery({
    queryKey: ['GetRoiList'],
    queryFn: getCustomersMlm,
  });
};
