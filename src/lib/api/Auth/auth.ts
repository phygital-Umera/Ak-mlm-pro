import {CustomerRegistrationPayload, UserAuthenticationResponse} from '@/types';
import {api, unAuthenticatedApi} from '@/utils/axios';

// Register a new customer
export const registerCustomer = async (
  payload: CustomerRegistrationPayload,
) => {
  const response = await api.post('/register', payload);
  return response.data;
};

// Login a user
// export const loginCustomer = async (credentials: {
//   email: string;
//   password: string;
// }) => {
//   const response = await unAuthenticatedApi.post('/users/login', credentials);
//   return response.data;
// };

export const loginCustomer = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await unAuthenticatedApi.post('/users/login', credentials);
  return response.data;
};

export const customerLoginByAdmin = async (credentials: {email: string}) => {
  const response = await api.post('/users/login/admin', credentials);
  return response;
};
