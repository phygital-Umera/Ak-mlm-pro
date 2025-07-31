import {Customer, Commission, ApiError} from '@/types';
import {api} from '@/utils/axios';

// Fetch customer details
export const getCustomer = async (id: string) => {
  try {
    const response = await api.get(`/customers/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching customer:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};

// Fetch customer commissions
export const getCommission = async (id: string) => {
  try {
    const response = await api.get(`/customers/commission`);
    // console.log("dataaa",response.data)
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching commissions:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};

export const fetchCustomerHome = async () => {
  try {
    const response = await api.get('/customers');
    // console.log( "dataaaa",response.data)
    return response.data;
  } catch (error: unknown) {
    const err = error as ApiError; // Type assertion to ApiError
    console.error(
      'Error fetching customer home data:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};

export const getCustomerLevel = async () => {
  try {
    const response = await api.get(`/customers/wallet`);
    console.log('wallet dataa', response.data);
    return response.data;
  } catch (error: unknown) {
    const err = error as ApiError; // Type assertion to ApiError
    console.error(
      'Error fetching customer home data:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};
export const getBDfund = async (id: string) => {
  try {
    const response = await api.get(`/customer/bussinessfund/${id}`);
    return response.data;
  } catch (error: unknown) {
    const err = error as ApiError; // Type assertion to ApiError
    console.error(
      'Error fetching customer home data:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};

export const getCustomerGoldenIncome = async (id: string) => {
  try {
    const response = await api.get(`/customer/goldenFund/${id}`);
    return response.data;
  } catch (error: unknown) {
    const err = error as ApiError; // Type assertion to ApiError
    console.error(
      'Error fetching customer home data:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};

export const getCustomerHelpingData = async (id: string) => {
  try {
    const response = await api.get(`/customer/helping/income/${id}`);
    return response.data;
  } catch (error: unknown) {
    const err = error as ApiError; // Type assertion to ApiError
    console.error(
      'Error fetching customer home data:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};
