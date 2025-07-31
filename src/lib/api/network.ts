import {api} from '@/utils/axios';

export const getnetwork = async () => {
  try {
    console.log('Fetching network data...');
    const response = await api.get('/tree');

    console.log('Network data fetched', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getNewnetwork = async (id: string) => {
  // console.log(id);

  try {
    const response = await api.get(`admin/helping/tree/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getNewnetworkCustomer = async (id: string) => {
  // console.log(id);

  try {
    const response = await api.get(`/helping/tree/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
