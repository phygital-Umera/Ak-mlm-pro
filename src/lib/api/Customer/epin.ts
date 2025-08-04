import {ApiError, EpinResponse} from '@/types';
import {api} from '@/utils/axios';

// Create an E-Pin request
import axios from 'axios';

export const createEpinRequest = async (
  paidAmount: number,
  price: number,
  imageFile: File,
) => {
  try {
    // Prepare the form data
    const formData = new FormData();
    formData.append('paidAmount', String(paidAmount));
    formData.append('price', String(price));
    formData.append('imageFile', imageFile);

    // Send the POST request with form data
    const response = await api.post<EpinResponse>(
      'customers/epin/request',
      formData,
    );

    return response.data;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    console.error(
      'Error creating E-Pin request:',
      apiError.response?.data.message || apiError.message,
    );
    throw apiError.response?.data || apiError;
  }
};

// Fetch E-Pin requests by user ID
export const getEpinRequests = async () => {
  try {
    const response = await api.get('customers/epin/request');

    return response.data;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    console.error(
      'Error fetching E-Pin requests:',
      apiError.response?.data.message || apiError.message,
    );
    throw apiError.response?.data || apiError;
  }
};

export const getEpins = async () => {
  try {
    const response = await api.get('customers/epin');

    return response.data;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    console.error(
      'Error fetching E-Pin requests:',
      apiError.response?.data.message || apiError.message,
    );
    throw apiError.response?.data || apiError;
  }
};

export const createEpinProductRequest = async (
  count: number,
  price: number,
) => {
  try {
    // Prepare the form data
    const formData = new FormData();
    formData.append('count', String(count));
    formData.append('price', String(price));

    // Send the POST request with form data
    const response = await api.post<EpinResponse>(
      'customers/epin/product/request',
      formData,
    );

    return response.data;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    console.error(
      'Error creating E-Pin product request:',
      apiError.response?.data.message || apiError.message,
    );
    throw apiError.response?.data || apiError;
  }
};

export const getProductEpins = async () => {
  try {
    const response = await api.get('customers/epin/product');

    return response.data;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    console.error(
      'Error fetching E-Pin requests:',
      apiError.response?.data.message || apiError.message,
    );
    throw apiError.response?.data || apiError;
  }
};
