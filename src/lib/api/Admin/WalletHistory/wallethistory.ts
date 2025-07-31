import {api} from '@/utils/axios';

export const getWalletHistory = async () => {
  try {
    const response = await api.get('/customers/wallet');
    return response.data;
  } catch (error) {
    console.error(
      'Error in getAdminEpins:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};

export const getAdminWalletHistory = async () => {
  try {
    const response = await api.get(`admin/history`);
    return response.data;
  } catch (error) {
    console.error(
      'Error in get otp:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};
