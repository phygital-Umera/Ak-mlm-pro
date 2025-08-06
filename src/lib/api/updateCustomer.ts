import {EditEmails, UpdateCustomerData} from '@/types';
import {api} from '@/utils/axios';

export const updateCustomer = async (data: UpdateCustomerData) => {
  try {
    const response = await api.put(`/customers/profile`, data);
    return response.data;
  } catch (error) {
    console.error(error.response?.data.message || error.message);
  }
};

export const updateCustomerEmail = async (data: EditEmails) => {
  try {
    const response = await api.put(`/admin/emailChange`, data);
    return response.data;
  } catch (error) {
    console.error(error.response?.data.message || error.message);
  }
};

export const getAllEmails = async () => {
  try {
    const response = await api.get('/admin/emails');
    return response.data;
  } catch (error) {
    console.error(
      'Error in getAllEPins:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};

export const getAllCustomers = async () => {
  try {
    const response = await api.get('/customers/customers');
    return response.data;
  } catch (error) {
    console.error(
      'Error in get customers:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};

export const assignEpin = async (crnNo: string, epinNo: string) => {
  try {
    console.log('Type of epinNo:', typeof epinNo);
    const response = await api.put(`/customers/active/${crnNo}`, {
      epinNo: epinNo,
    });
    return response.data;
  } catch (error) {
    console.error(
      'Error in getAllEPins:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};

export const updateCustomerActive = async (data: {epinNo: string}) => {
  try {
    console.log('Type of epinNo:', typeof data.epinNo);
    const response = await api.put(`/customers/active`, data);
    return response.data;
  } catch (error) {
    console.error(
      'Error in getAllEPins:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};

export const getCustomerById = async () => {
  try {
    const response = await api.get('/customers/profile');
    return response.data;
  } catch (error) {
    console.error(
      'Error in get customers:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};
