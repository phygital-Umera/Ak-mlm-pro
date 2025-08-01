import {api} from '@/utils/axios';

export type adminData = {
  user: {
    phoneNumber?: string;
    password: string;
    fullname?: string;
  };
  customer: {
    dob?: string;
    gender: string;
    pinCode?: string;
    city?: string;
    state?: string;
    aadharNo?: string;
    panNo?: string;
    upiId?: string;
    landMark?: string;
    flatNo?: string;
    areaName?: string;
    bankName?: string;
    bankAccNo?: string;
    bankIFSC?: string;
    bankBranch?: string;
  };
};

export const updateProfile = async (id: string, data: adminData) => {
  try {
    const response = await api.post(`/admin/profile`, data);
    return response.data;
  } catch (error) {
    const err = error; // Type assertion to ApiError
    console.error(
      'Error updatinng admin:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};

export const getProfile = async () => {
  try {
    const response = await api.get('/admin/profile');
    return response.data;
  } catch (error) {
    const err = error; // Type assertion to ApiError
    console.error(
      'Error getting admin:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};
