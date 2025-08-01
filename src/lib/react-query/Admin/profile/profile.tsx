import {
  adminData,
  getProfile,
  updateProfile,
} from '@/lib/api/Admin/profile/profile';
import {ApiError} from '@/types';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id, data}: {id: string; data: adminData}) =>
      updateProfile(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profile'],
      });
    },
    onError: (error: unknown) => {
      const err = error as ApiError; // Type assertion to ApiError
      console.error(
        'Failed to update profile',
        err.response?.data.message || err.message,
      );
    },
  });
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });
};
