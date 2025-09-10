/*eslint-disable */

import {api} from '@/utils/axios';

export const topUp = async (payload: any) => {
  try {
    const response = await api.put('/customers/active', payload);
    return response.data;
  } catch (error) {
    console.error('Error in topUp:', error);
    throw error;
  }
};

export const recallEpin = async (payload: any) => {
  try {
    console.log('payload', payload);
    const response = await api.put('/admin/recallEpin', payload);
    return response.data;
  } catch (error) {
    console.error('Error in recallEpin:', error);
    throw error;
  }
};
