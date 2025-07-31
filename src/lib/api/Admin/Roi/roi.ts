import {api} from '@/utils/axios';

export const getRoiList = async () => {
  try {
    const response = await api.get('/admin/customers/roi');
    return response.data;
  } catch (error) {
    console.error(
      'Error in getAdminEpins:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};
export const getCustomersMlm = async () => {
  try {
    const response = await api.get('/admin/customers/mlm');
    return response.data;
  } catch (error) {
    console.error(
      'Error in getAdminEpins:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};
