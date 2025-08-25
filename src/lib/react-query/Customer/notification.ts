import {getNotification} from '@/lib/api/Customer/notification';
import {useQuery} from '@tanstack/react-query';

export const useGetNotification = () => {
  return useQuery({
    queryKey: ['notification'],
    queryFn: () => getNotification(),
  });
};
