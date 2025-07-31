import {api} from '@/utils/axios';

export const fukatPage = async (data: {customerId: string}) => {
  try {
    const response = await api.post(`/admin/helping/`, data);
    // console.log('response::', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error in createEPin:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};
export const dusaraFukatPage = async (data: {
  customerId: string;
  leftcount: number;
  rightcount: number;
}) => {
  try {
    const response = await api.post(`/admin/helping/`, data);
    // console.log('response::', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error in createEPin:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};
