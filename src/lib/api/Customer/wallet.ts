import {ApiError} from '@/types';
import {api} from '@/utils/axios';

export const createWalletData = async (payload: {id: string}) => {
  console.log('payload', payload);
  try {
    const response = await api.post('/customers/wallet', payload);
    return response.data;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    console.error(
      'Error creating wallet transaction:',
      apiError.response?.data?.message || apiError.message,
    );
    throw apiError.response?.data || apiError;
  }
};
