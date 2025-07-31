import React, {useEffect} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import toast from 'react-hot-toast';
import {useNavigate} from '@tanstack/react-router';
import {FiKey, FiCreditCard, FiLoader, FiCheckCircle} from 'react-icons/fi';

import GenericButton from '@/components/Forms/Buttons/GenericButton';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import GenericSearchDropdown from '@/components/Forms/SearchDropDown/GenericSearchDropdown';

import {useAuthContext} from '@/context/AuthContext';
import {useRegistration} from '@/context/RegisterContext';
import {useCustomerRegistration} from '@/lib/react-query/Auth/auth';
import {userLoginInfoSchema} from '@/lib/validation/registerCustomerShema';

type FormValues = z.infer<typeof userLoginInfoSchema>;

export const LoginInfo: React.FC = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(userLoginInfoSchema),
  });

  const {user} = useAuthContext();
  const role = user?.role;
  const navigate = useNavigate();
  const {setUserLoginInfo, data} = useRegistration();

  const {
    mutate: registerAdmin,
    isPending,
    isSuccess,
    isError,
    data: responseData,
  } = useCustomerRegistration();

  const epinType = methods.watch('epinType');

  const onSubmit = async (formValues: FormValues) => {
    setUserLoginInfo({
      epinType: formValues.epinType,
      epinNo: formValues.epinNo,
      password: formValues.password,
      confirmPassword: formValues.confirmPassword,
    });

    const {contactInfo, personalInfo, selectProduct, sponsorInfo} = data;
    const combinedData = {
      ...contactInfo,
      ...personalInfo,
      ...sponsorInfo,
      ...formValues,
      products: selectProduct?.products ?? [],
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registerAdmin(combinedData as any);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Registration successful! Redirecting...');
      setTimeout(() => {
        navigate({to: role === 'ADMIN' ? '/dashboard' : '/customer/dashboard'});
      }, 1500);
    }
    if (isError) {
      toast.error('Registration failed. Please try again.');
    }
  }, [isSuccess, isError, navigate, role]);

  return (
    <FormProvider {...methods}>
      <div className="from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center bg-gradient-to-br p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-2xl">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <h1 className="text-gray-900 mb-2 text-2xl font-bold dark:text-white sm:text-3xl">
              Account Security
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Set your login credentials and activation method
            </p>
          </div>

          {/* Form Card */}
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="dark:bg-gray-800 border-gray-100 dark:border-gray-700 overflow-hidden rounded-xl border shadow-xl"
          >
            <div className="space-y-6 p-6 sm:p-8 mb-5">
              {/* Password Fields */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <GenericInputField
                    name="password"
                    label="Password"
                    type="text"
                    placeholder="Create strong password"
                    containerClass="group"
                    inputClass="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    labelClass="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    icon={<FiKey className="text-gray-400" />}
                  />
                </div>
                <div className="space-y-2">
                  <GenericInputField
                    name="confirmPassword"
                    label="Confirm Password"
                    type="text"
                    placeholder="Re-enter your password"
                    containerClass="group"
                    inputClass="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    labelClass="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    icon={<FiKey className="text-gray-400" />}
                  />
                </div>
              </div>

              {/* E-Pin Section */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <GenericSearchDropdown
                    name="epinType"
                    label="Activation Method"
                    options={[
                      {value: 'later', label: 'Activate later'},
                      {value: 'e-pin', label: 'Use E-Pin'},
                      {value: 'online', label: 'Online payment'},
                    ]}
                    containerClass="group"
                    inputClass="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer"
                    labelClass="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    dropdownClass="mt-1 w-full rounded-md shadow-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                  />
                </div>

                {epinType === 'e-pin' && (
                  <div className="animate-fadeIn space-y-2">
                    <GenericInputField
                      name="epinNo"
                      label="E-Pin Number"
                      placeholder="Enter your E-Pin code"
                      containerClass="group"
                      inputClass="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      labelClass="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      icon={<FiCreditCard className="text-gray-400" />}
                    />
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      Enter the E-Pin you received for activation
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Form Footer */}
            <div className="bg-gray-50 dark:bg-gray-700/30 border-gray-100 dark:border-gray-700 flex justify-end border-t px-6 py-4 sm:px-8">
              <GenericButton
                type="submit"
                disabled={isPending}
                className={`relative overflow-hidden rounded-lg px-6 py-3 font-medium text-white ${
                  isPending
                    ? 'bg-blue-400'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                } shadow-md transition-all duration-300 hover:shadow-lg`}
              >
                <span className="flex items-center">
                  {isPending ? (
                    <>
                      <FiLoader className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiCheckCircle className="mr-2 h-4 w-4" />
                      Complete Registration
                    </>
                  )}
                </span>
              </GenericButton>
            </div>
          </form>

          {/* Security Note */}
          <div className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Security note:</strong> Your password is encrypted and
              never stored in plain text.
            </p>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};
