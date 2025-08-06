import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigate} from '@tanstack/react-router';
import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import toast from 'react-hot-toast';
import {FiCheckCircle, FiKey, FiLoader} from 'react-icons/fi';
import {z} from 'zod';
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import {useAuthContext} from '@/context/AuthContext';
import {useRegistration} from '@/context/RegisterContext';
import {useCustomerRegistration} from '@/lib/react-query/Auth/auth';
import {userLoginInfoSchema} from '@/lib/validation/registerCustomerShema';
import {
  ArrowRightIcon,
  KeyIcon,
  LockIcon,
  UserIcon,
  UsersIcon,
} from 'lucide-react';

type FormValues = z.infer<typeof userLoginInfoSchema>;

export const LoginInfo: React.FC = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(userLoginInfoSchema),
  });

  const {user} = useAuthContext();
  const role = user?.role;
  const navigate = useNavigate();
  const {setUserLoginInfo, data, clearRegistrationData} = useRegistration();
  const [showPopup, setShowPopup] = useState(false);

  const {
    mutate: registerAdmin,
    isPending,
    isSuccess,
    isError,
    data: responseData,
  } = useCustomerRegistration();
  console.log('data', responseData);

  const epinType = methods.watch('epinType');

  const onSubmit = async (formValues: FormValues) => {
    setUserLoginInfo({
      password: formValues.password,
      confirmPassword: formValues.confirmPassword,
    });

    const {contactInfo, personalInfo, selectProduct, sponsorInfo} = data;
    const combinedData = {
      ...contactInfo,
      ...personalInfo,
      ...sponsorInfo,
      ...formValues,
      ...(selectProduct?.products?.[0]?.productId && {
        productId: selectProduct.products[0].productId,
      }),
      ...(sponsorInfo?.epin && {
        epinNo: sponsorInfo.epin,
      }),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registerAdmin(combinedData as any);
  };

  useEffect(() => {
    if (isSuccess && responseData?.crnNo && responseData?.password) {
      toast.success('Registration successful!');
      setShowPopup(true); // Show the popup first
    }

    if (isError) {
      toast.error('Registration failed. Please try again.');
    }
  }, [isSuccess, isError, responseData]);

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
            <div className="mb-5 space-y-6 p-6 sm:p-8">
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
      {showPopup && responseData?.crnNo && responseData?.password && (
        <div className="bg-gray-900/70 fixed inset-0 z-999 flex items-center justify-center backdrop-blur-md transition-opacity duration-300 ease-out">
          <div className="mx-4 w-full max-w-md scale-[0.98] transform rounded-xl bg-white p-0 shadow-2xl transition-all duration-300 hover:scale-100">
            {/* Header with gradient */}
            <div
              className={`bg-gradient-to-r ${responseData.purchasedProduct ? 'from-blue-600 to-indigo-700' : 'from-blue-500 to-blue-600'} rounded-t-xl px-6 py-5`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    {responseData.purchasedProduct ? (
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    ) : (
                      <path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a7 7 0 017-7h0a7 7 0 017 7v6a3 3 0 01-3 3H8a3 3 0 01-3-3v-6z" />
                    )}
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {responseData.purchasedProduct
                      ? 'Registration Complete'
                      : 'Free Registration'}
                  </h2>
                  <p className="mt-0.5 text-sm text-blue-100/90">
                    {responseData.purchasedProduct
                      ? 'Your account is ready to use'
                      : 'You now have free access'}
                  </p>
                </div>
              </div>
            </div>

            {/* Data grid */}
            <div className="grid grid-cols-[max-content,1fr] gap-x-5 gap-y-4 px-6 py-5">
              <div className="text-gray-500 flex items-center font-medium">
                <UserIcon className="mr-2 h-4 w-4 opacity-70" /> Name:
              </div>
              <div className="text-gray-800 bg-gray-50 rounded-lg px-3 py-2 text-sm">
                {responseData.fullname}
              </div>
              <div className="text-gray-500 flex items-center font-medium">
                <KeyIcon className="mr-2 h-4 w-4 opacity-70" /> User ID:
              </div>
              <div className="font-mono text-gray-800 bg-gray-50 truncate rounded-lg px-3 py-2 text-sm">
                {responseData.crnNo}
              </div>

              <div className="text-gray-500 flex items-center font-medium">
                <LockIcon className="mr-2 h-4 w-4 opacity-70" /> Password:
              </div>
              <div className="font-mono text-gray-800 bg-gray-50 truncate rounded-lg px-3 py-2 text-sm">
                {responseData.password}
              </div>

              <div className="text-gray-500 flex items-center font-medium">
                <UsersIcon className="mr-2 h-4 w-4 opacity-70" /> Sponsor:
              </div>
              <div className="text-gray-800 bg-gray-50 rounded-lg px-3 py-2 text-sm">
                {responseData.sponsorId}
              </div>
            </div>

            {responseData.purchasedProduct && (
              <div className="border-t px-6 py-5">
                <h3 className="text-gray-600 mb-3 text-sm font-semibold">
                  Purchased Product
                </h3>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <img
                    src={responseData.purchasedProduct.images}
                    alt={responseData.purchasedProduct.name}
                    className="h-24 w-24 rounded-lg border object-cover"
                  />
                  <div className="flex-1 space-y-1 text-sm">
                    <div className="text-gray-800 font-semibold">
                      {responseData.purchasedProduct.name}
                    </div>

                    <div className="text-gray-600">
                      Price: ₹{responseData.purchasedProduct.discountedPrice}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action section */}
            <div className="px-6 pb-5">
              <button
                onClick={() => {
                  setShowPopup(false);
                  clearRegistrationData(); // Clear only after popup is dismissed
                  navigate({
                    to: role === 'ADMIN' ? '/dashboard' : '/customer/dashboard',
                  });
                }}
                className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-3 font-medium text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-lg"
              >
                Continue
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </FormProvider>
  );
};
