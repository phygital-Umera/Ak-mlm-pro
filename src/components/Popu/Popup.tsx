import React, {useState, useEffect} from 'react';
import {useNavigate} from '@tanstack/react-router';
import GenericInputField from '../Forms/Input/GenericInputField';
import {useForm, FormProvider} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import GenericButton from '../Forms/Buttons/GenericButton';
import toast from 'react-hot-toast';
import {QUERY_KEYS} from '@/lib/react-query/QueryKeys';
import {useUpdateCustomerActive} from '@/lib/react-query/updateCustomer';
// import QrCode from '../../../public/qrcode.jpeg';

interface PopupProps {
  onClose: () => void;
}

const epinSchema = z.object({
  epinNo: z.string().min(1, 'EPIN is required'),
});

const Popup: React.FC<PopupProps> = ({}) => {
  const methods = useForm({
    resolver: zodResolver(epinSchema),
    defaultValues: {
      epinNo: '',
    },
  });

  const {handleSubmit, reset} = methods;
  const navigate = useNavigate();
  const [isModalVisible, setModalVisible] = useState<boolean>(true);

  const {
    mutate: updateProfile,
    isPending,
    isSuccess,
    isError,
    error,
  } = useUpdateCustomerActive();

  const onSubmit = (data: {epinNo: string}) => {
    updateProfile({data: {epinNo: data.epinNo}});
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        toast.success(
          'Logout this account and relogin for epin activated. Redirecting to login page...',
        );
        const timer2 = setTimeout(() => {
          localStorage.removeItem(QUERY_KEYS.TOKEN);
          window.location.reload();
        }, 1500);
        return () => {
          clearTimeout(timer);
          clearTimeout(timer2);
        };
      }, 500);
    }
  }, [isSuccess]);

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm" />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {isModalVisible && (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Modal Card */}
              <div className="border-gray-200 dark:border-gray-600 relative w-full max-w-md rounded-lg border bg-white p-8 shadow-2xl dark:bg-meta-4">
                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-gray-900 mb-4 text-2xl font-bold dark:text-white">
                    Activate Your Account
                  </h2>
                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">
                    Please enter your EPIN to activate your account and access
                    all features.
                  </p>
                </div>

                {/* Input Field */}
                <div className="mb-6">
                  <GenericInputField
                    name="epinNo"
                    label="EPIN"
                    placeholder="Enter your EPIN code"
                    disabled={isPending}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <GenericButton
                    type="submit"
                    disabled={isPending}
                    className="w-full justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    {isPending ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Activating...
                      </span>
                    ) : (
                      'Activate Account'
                    )}
                  </GenericButton>
                </div>
              </div>
            </form>
            {/* <div className="mb-20 flex flex-col items-center sm:mt-10 lg:mt-12">
              <h2 className="text-md mb-2 font-semibold md:text-lg lg:text-xl">
                Scan to Pay
              </h2>
              <img
                src={QrCode}
                alt="SIGGMALYF Ventures QR"
                className="h-40 w-50 rounded-lg border shadow-lg sm:h-48 sm:w-48 md:max-w-[250px] lg:h-80 lg:w-56"
              />
            </div> */}
          </FormProvider>
        )}
      </div>
    </>
  );
};

export default Popup;
