/* eslint-disable */
import {ApiError} from '@/types';
import {api} from '@/utils/axios';

export const fetchAdminCommission = async () => {
  try {
    const response = await api.get('/admin/commission');
    return response.data;
  } catch (error: unknown) {
    const err = error as ApiError;
    console.error(
      'Error fetching admin commission data:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};

export const getAdminPaidCommission = async () => {
  try {
    const response = await api.get('/admin/paidCommission');
    return response.data;
  } catch (error: unknown) {
    const err = error as ApiError;
    console.error(
      'Error fetching admin commission data:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};

export const payCommission = async (id: string, data: any) => {
  try {
    console.log('====================================');
    console.log('id', id, data);
    console.log('====================================');
    const response = await api.put(`/admin/commission/${id}`, data);
    return response.data;
  } catch (error: unknown) {
    const err = error as ApiError;
    console.error(
      'Error in payCommission:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};

export const payCommissionAll = async () => {
  try {
    const response = await api.post(`/admin/payAllCommission`);
    return response.data;
  } catch (error: unknown) {
    const err = error as ApiError;
    console.error(
      'Error in payCommissionAll:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};

export const getProductSales = async () => {
  try {
    const response = await api.get(`/admin/product-sale-report`);
    return response.data;
  } catch (error: unknown) {
    const err = error as ApiError;
    console.error(
      'Error in getProductSales:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};
