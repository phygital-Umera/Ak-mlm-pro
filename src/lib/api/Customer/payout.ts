import {api} from '@/utils/axios';

export const fetchPayout = () => {
  try {
    return api.get('/customers/payout');
  } catch (error) {
    return error;
  }
};
