import {
  adminData,
  getCustomerProfile,
  getProfile,
  updateCustomerProfile,
  updateProfile,
} from '@/lib/api/Admin/profile/profile';
import {ApiError} from '@/types';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: adminData) => updateProfile(data),

    onSuccess: () => {
      toast.success('Profile Updated Succesfully');
      queryClient.invalidateQueries({
        queryKey: ['profile'],
      });
    },
    onError: (error) => {
      console.error('Failed to update profile:', error);
    },
  });
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });
};

export const useUpdateCustomerProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: adminData) => updateCustomerProfile(data),

    onSuccess: () => {
      toast.success('Profile Updated Succesfully');
      queryClient.invalidateQueries({
        queryKey: ['custo_profile'],
      });
    },
    onError: (error) => {
      console.error('Failed to update profile:', error);
    },
  });
};

export const useGetCustomerProfile = () => {
  return useQuery({
    queryKey: ['custo_profile'],
    queryFn: getCustomerProfile,
  });
};
