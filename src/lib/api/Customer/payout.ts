import {api} from '@/utils/axios';

export const fetchPayout = () => {
  try {
    return api.get('/payout');
  } catch (error) {
    return error;
  }
};
