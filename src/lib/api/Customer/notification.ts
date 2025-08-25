import {ApiError} from '@/types';
import {api} from '@/utils/axios';

export const getNotification = async () => {
  try {
    const response = await api.get('/customers/commission');
    // console.log( "dataaaa",response.data)
    return response.data;
  } catch (error: unknown) {
    const err = error as ApiError; // Type assertion to ApiError
    console.error(
      'Error fetching customer home data:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};
