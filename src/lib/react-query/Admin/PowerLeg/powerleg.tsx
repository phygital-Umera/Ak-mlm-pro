import {createPowerLeg, getPowerLeg} from '@/lib/api/Admin/PowerLeg/powerleg';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

export const useCreatePowerLeg = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      side: string;
      crnNo: string;
      isPowerLeg: boolean;
      powerCount: number;
    }) => createPowerLeg(data),
    onSuccess: () => {},
    onError: (error) => {
      console.error('Failed to create banner:', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['powerleg'],
      });
    },
  });
};

export const useGetPowerLeg = () => {
  return useQuery({
    queryKey: ['powerleg'],
    queryFn: getPowerLeg,
  });
};
