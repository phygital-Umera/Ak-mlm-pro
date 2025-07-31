import {AdminHomeResponse, ApiError, CustomerListResponse} from '@/types';
import {api} from '@/utils/axios';
import {AxiosError} from 'axios';

// Fetch admin dashboard data
export const fetchAdminHome = async () => {
  try {
    const response = await api.get('/admin');
    return response.data;
  } catch (error: unknown) {
    const err = error as ApiError; // Type assertion to ApiError
    console.error(
      'Error fetching admin home data:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};

// Fetch customer list data
export const fetchCustomerList = async () => {
  try {
    const response = await api.get('/admin/customers');
    return response.data;
  } catch (error: unknown) {
    const err = error as ApiError; // Type assertion to ApiError
    console.error(
      'Error fetching customer list:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};

export const createCountsAdmin = async (
  data: {
    leftCount: number;
    rightCount: number;
    pairCount: number;
    id: string;
  }[],
) => {
  // console.log('Sending Data :::::::::::::::::::::::::::::::::', data);
  try {
    const res = await api.post('/admin/customers', data);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to update People',
      );
    }
    throw error;
  }
};

export const goldenIncomeList = async () => {
  try {
    const response = await api.get('/admin/goldenIncome');
    return response.data;
  } catch (error: unknown) {
    const err = error as ApiError; // Type assertion to ApiError
    console.error(
      'Error fetching customer list:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};

export const voucherList = async () => {
  try {
    const response = await api.get('/admin/vouchers');
    return response.data;
  } catch (error: unknown) {
    const err = error as ApiError; // Type assertion to ApiError
    console.error(
      'Error fetching customer list:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};
