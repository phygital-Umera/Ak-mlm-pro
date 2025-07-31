import {api} from '@/utils/axios';

export const createPowerLeg = async (data: {
  side: string;
  crnNo: string;
  isPowerLeg: boolean;
  powerCount: number;
}) => {
  try {
    const response = await api.put('/admin/power-leg', data);
    return response.data;
  } catch (error) {
    console.error(
      'Error in createPowerLeg:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};

export const getPowerLeg = async () => {
  try {
    const response = await api.get('/admin/power-leg');
    return response.data;
  } catch (error) {
    console.error(
      'Error in getPowerLeg:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};
