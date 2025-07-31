import {api} from '@/utils/axios';

// Get Retirement Fund
export const getRetirement = async () => {
  try {
    const response = await api.get('/admin/roi');
    return response.data;
  } catch (error) {
    console.error(
      'Error in getRetirement:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};

// Get Gold Reward
export const getGoldReward = async () => {
  try {
    const response = await api.get('/admin/goldreward');
    return response.data;
  } catch (error) {
    console.error(
      'Error in getGoldReward:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};

// Get Leadership Fund
export const getLeadershipFund = async () => {
  try {
    const response = await api.get('/admin/helping');
    // console.log('response::', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error in getLeadershipFund:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};

// Get Award Reward
export const getAwardReward = async () => {
  try {
    const response = await api.get('/admin/awardreward');
    return response.data;
  } catch (error) {
    console.error(
      'Error in getAwardReward:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};
