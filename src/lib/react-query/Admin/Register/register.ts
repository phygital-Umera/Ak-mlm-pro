import {
  getSponsorNameById,
  registerAdmin,
} from '@/lib/api/Admin/Register/register';
import {
  AdminRegistrationResponse,
  AdminRegistrationInput,
  ApiError,
} from '@/types';
import {useMutation, useQuery} from '@tanstack/react-query';

export const useRegisterAdmin = () => {
  return useMutation<
    AdminRegistrationResponse,
    ApiError,
    AdminRegistrationInput
  >({
    mutationFn: registerAdmin,
    onSuccess: () => {},
    onError: (error: ApiError) => {
      console.error(
        'Failed to register admin:',
        error.response?.data.message || error.message,
      );
    },
  });
};

export const useGetSponsorNameById = (id: string) => {
  return useQuery({
    queryKey: ['getSponsorNameById'],
    queryFn: () => getSponsorNameById(id),
  });
};
