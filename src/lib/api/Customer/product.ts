import {api} from '@/utils/axios';

export const getCustomerAllProducts = async () => {
  try {
    const response = await api.get('/mlm-product');
    return response.data;
  } catch (error) {
    const err = error.response?.data || error;
    console.error('Error fetching products:', err.message);
    throw err;
  }
};
