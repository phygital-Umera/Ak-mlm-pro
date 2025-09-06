import logo from '@/assets2/logo.jpeg';
import {useAuthContext} from '@/context/AuthContext';
import {useCustomerLogin} from '@/lib/react-query/Auth/auth';
import {signInSchema} from '@/lib/validation/signInSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import { Link } from '@tanstack/react-router';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {FiEye, FiMail} from 'react-icons/fi';
import {LuEyeOff} from 'react-icons/lu';
import {z} from 'zod';

type SignInFormValues = z.infer<typeof signInSchema>;
interface DecodedToken extends JwtPayload {
  role: string;
}

const SignIn: React.FC = () => {
  const {mutateAsync: signIn, isError, isPending, error} = useCustomerLogin();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {},
  });

  const {setUser, setIsAuthenticated, setToken, setCustomer} = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (values: SignInFormValues) => {
    try {
      const res = await signIn({
        username: values.identifier,
        password: values.password,
      });
      setUser(jwtDecode(res.data.token.accessToken || ''));
      setCustomer(res.data?.customer);

      setToken(res.data?.token);
      setIsAuthenticated(true);
      const decoded = jwtDecode<DecodedToken>(res.data.token.accessToken || '');
      const role = decoded.role;
      if (role === 'ADMIN') {
        window.location.href = '/dashboard';
      }
      if (role === 'CUSTOMER') {
        window.location.href = '/customer/dashboard';
      }
      if (role === 'SELLER') {
        window.location.href = '/seller/dashboard';
      }
    } catch (error) {
      if (error.response.status === 401) {
      }
    }
  };

  return (
    <>
      {/* <div className="mb-6 flex justify-center">
        <img src={logo} alt="Logo" className="h-16 w-auto" />
      </div> */}
      {/* <p className="text-center text-2xl font-bold text-black dark:text-white">
       SJC Group
      </p> */}
      <h2 className="mb-9 mt-20 text-center text-2xl font-semibold text-black dark:text-white sm:text-title-xl2">
        Sign In
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Enter Your CRN No
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your email or username"
              {...register('identifier')}
              className={`w-full rounded-lg border ${errors.identifier ? 'border-red-500' : 'border-stroke'} bg-transparent py-4 pl-6 pr-10 text-black outline-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            />
            <span className="absolute right-4 top-4">
              <FiMail size={22} />
            </span>
            {errors.identifier && (
              <p className="text-red-500">{errors.identifier.message}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              {...register('password')}
              className={`w-full rounded-lg border ${errors.password ? 'border-red-500' : 'border-stroke'} bg-transparent py-4 pl-6 pr-10 text-black outline-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            />
            <span
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <LuEyeOff size={22} /> : <FiEye size={22} />}
            </span>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
        </div>

        {isError && (
          <div className="mb-4">
            <p className="text-center text-red-500">
              {'Invaliid email or password'}
            </p>
          </div>
        )}

        <div className="mb-5">
          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
          >
            {isPending ? 'Loading...' : 'Sign In'}
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-center text-black dark:text-white font-semibold">
            Don’t have any account?{' '}
            <Link className="text-primary" to="/signup"> 
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default SignIn;
