import {
  registerCustomer,
  loginCustomer,
  customerLoginByAdmin,
} from '@/lib/api/Auth/auth';
import {useMutation} from '@tanstack/react-query';
import {QUERY_KEYS} from '../QueryKeys';

// Hook for customer registration
export const useCustomerRegistration = () => {
  return useMutation({
    mutationFn: registerCustomer,
    onError: (error: Error) => {
      console.error('Error during registration:', error.message);
    },
  });
};

// Hook for customer login
export const useCustomerLogin = () => {
  return useMutation({
    mutationFn: loginCustomer,
    onSuccess: (res) => {
      localStorage.setItem(QUERY_KEYS.TOKEN, JSON.stringify(res.data.token));
    },
    onError: (error: Error) => {
      console.error('Error during login:', error.message);
    },
  });
};

export const useAdminLogin = () => {
  return useMutation({
    mutationFn: customerLoginByAdmin,
    onSuccess: (res) => {
      console.log('res', res);
      localStorage.removeItem(QUERY_KEYS.TOKEN);
      console.log('token', res.data?.token);
      localStorage.setItem(QUERY_KEYS.TOKEN, JSON.stringify(res.data.token));
    },
    onError: (error: Error) => {
      console.error('Error during login:', error.message);
    },
  });
};
