import React from 'react';
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import GenericSearchDropdown from '@/components/Forms/SearchDropDown/GenericSearchDropdown';
import {useRegistration} from '@/context/RegisterContext';
import {sponserInfoSchema} from '@/lib/validation/registerCustomerShema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm, FormProvider} from 'react-hook-form';
import {z} from 'zod';
import {useAuthContext} from '@/context/AuthContext';

type FormValues = z.infer<typeof sponserInfoSchema>;
interface SponserInfoProps {
  onNext: () => void;
}

export const SponserInfo: React.FC<SponserInfoProps> = ({onNext}) => {
  const {user} = useAuthContext();

  const methods = useForm<FormValues>({
    resolver: zodResolver(sponserInfoSchema),
    defaultValues: {
      directSponsorId: user?.crnNo,
      sponsorId: user?.crnNo,
    },
  });
  const {setSponsorInfo} = useRegistration();

  const onSubmit = (formValues: FormValues) => {
    setSponsorInfo({
      side: formValues.side,
      sponsorId: formValues.sponsorId,
      directSponsorId: formValues.directSponsorId,
    });
    onNext();
  };

  return (
    // <FormProvider {...methods}>
    //   <div className="from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center bg-gradient-to-br p-4 sm:p-6 lg:p-8">
    //     <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
    //       {/* Header Section */}
    //       <div className="mb-8 text-center">
    //         <h1 className="text-gray-900 mb-2 text-2xl font-bold dark:text-white sm:text-3xl">
    //           Sponsor Information
    //         </h1>
    //         <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
    //           Complete your registration by providing sponsor details
    //         </p>
    //       </div>

    //       {/* Form Card */}
    //       <form
    //         onSubmit={methods.handleSubmit(onSubmit)}
    //         className="dark:bg-gray-800 dark:hover:shadow-gray-700/50 overflow-hidden rounded-xl shadow-2xl transition-all duration-300 hover:shadow-xl"
    //       >
    //         <div className="space-y-6 p-6 sm:p-8 dark:bg-black ">
    //           {/* Sponsor ID */}
    //           <div className="space-y-2">
    //             <label className="text-gray-700 dark:text-gray-300 block text-sm font-medium">
    //               Sponsor ID <span className="text-red-500">*</span>
    //             </label>
    //             <GenericInputField
    //               name="sponsorId"
    //               placeholder="Enter Sponsor ID"
    //               containerClass="relative"
    //               inputClass="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
    //             />
    //           </div>

    //           {/* Preferred Side Dropdown */}
    //           <div className="space-y-2">
    //             <label className="text-gray-700 dark:text-gray-300 block text-sm font-medium">
    //               Preferred Side <span className="text-red-500">*</span>
    //             </label>
    //             <GenericSearchDropdown
    //               name="side"
    //               options={[
    //                 {value: 'A', label: 'Left Side (A)'},
    //                 {value: 'B', label: 'Right Side (B)'},
    //                 {value: 'C', label: 'Center (C)'},
    //               ]}
    //               containerClass="relative"
    //               inputClass="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer"
    //               dropdownClass="mt-1 w-full rounded-lg shadow-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
    //             />
    //           </div>

    //           {/* Direct Sponsor ID (Disabled) */}
    //           <div className="space-y-2">
    //             <label className="text-gray-700 dark:text-gray-300 block text-sm font-medium">
    //               Direct Sponsor ID
    //             </label>
    //             <GenericInputField
    //               name="directSponsorId"
    //               placeholder="Auto-filled with your ID"
    //               disabled
    //               inputClass="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
    //             />
    //             <p className="text-gray-500 dark:text-gray-400 mt-1 text-xs">
    //               This field is automatically populated with your account
    //               information
    //             </p>
    //           </div>
    //         </div>

    //         {/* Form Footer with Submit Button */}
    //         <div className="bg-gray-50 dark:bg-gray-700/30 border-gray-100 dark:border-gray-700 flex justify-end border-t px-6 py-4 sm:px-8">
    //           <GenericButton
    //             type="submit"
    //             className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    //           >
    //             <span className="flex items-center">
    //               Continue
    //               <svg
    //                 className="ml-2 h-4 w-4"
    //                 fill="none"
    //                 stroke="currentColor"
    //                 viewBox="0 0 24 24"
    //                 xmlns="http://www.w3.org/2000/svg"
    //               >
    //                 <path
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   strokeWidth={2}
    //                   d="M14 5l7 7m0 0l-7 7m7-7H3"
    //                 />
    //               </svg>
    //             </span>
    //           </GenericButton>
    //         </div>
    //       </form>

    //       {/* Support Link */}
    //       <div className="mt-6 text-center">
    //         <p className="text-gray-500 dark:text-gray-400 text-sm">
    //           Need help?{' '}
    //           <a
    //             href="#"
    //             className="text-blue-600 transition-colors duration-200 hover:underline dark:text-blue-400"
    //           >
    //             Contact support
    //           </a>
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </FormProvider>

    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-8">
            {/* Pass the `onNext` prop to the current component */}

            <GenericInputField
              name="epin"
              label="E-Pin"
              placeholder="Enter E-Pin"
            />
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/30 border-gray-100 dark:border-gray-700 flex justify-end border-t px-6 py-4 sm:px-8">
          <GenericButton
            type="submit"
            className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className="flex items-center">
              Continue
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </GenericButton>
        </div>
      </form>
    </FormProvider>
  );
};
