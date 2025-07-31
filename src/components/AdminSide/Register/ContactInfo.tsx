import GenericButton from '@/components/Forms/Buttons/GenericButton';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import GenericSearchDropdown from '@/components/Forms/SearchDropDown/GenericSearchDropdown';
import {useRegistration} from '@/context/RegisterContext';
import {conatctSchema} from '@/lib/validation/registerCustomerShema';
import {zodResolver} from '@hookform/resolvers/zod';
import React from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {z} from 'zod';
import {FiUser, FiMail, FiPhone, FiArrowRight} from 'react-icons/fi';

type FormValues = z.infer<typeof conatctSchema>;

interface SponserInfoProps {
  onNext: () => void;
}

export const ContactInfo: React.FC<SponserInfoProps> = ({onNext}) => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(conatctSchema),
  });
  const {setContactInfo} = useRegistration();

  const onSubmit = (formValues: FormValues) => {
    setContactInfo({
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      phone: formValues.phone,
      email: formValues.email,
    });
    onNext();
  };

  return (
    <FormProvider {...methods}>
      <div className="from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex  items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-2xl">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <h1 className="text-gray-900 mb-2 text-2xl font-bold dark:text-white sm:text-3xl">
              Contact Information
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Please provide your basic contact details
            </p>
          </div>

          {/* Form Card */}
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="dark:bg-gray-800 border-gray-100 dark:border-gray-700 overflow-hidden rounded-xl border  shadow-xl"
          >
            <div className="space-y-6 p-6 sm:p-8">
              {/* Name Row */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <GenericInputField
                    name="firstName"
                    label="First Name"
                    placeholder="John"
                    containerClass="group"
                    inputClass="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    labelClass="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    icon={<FiUser className="text-gray-400" />}
                  />
                </div>
                <div className="space-y-2">
                  <GenericInputField
                    name="lastName"
                    label="Last Name"
                    placeholder="Doe"
                    containerClass="group"
                    inputClass="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    labelClass="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    icon={<FiUser className="text-gray-400" />}
                  />
                </div>
              </div>

              {/* Contact Row */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <GenericInputField
                    name="email"
                    label="Email Address"
                    placeholder="john@example.com"
                    type="email"
                    containerClass="group"
                    inputClass="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    labelClass="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    icon={<FiMail className="text-gray-400" />}
                  />
                </div>
                <div className="space-y-2">
                  <GenericInputField
                    name="phone"
                    label="Phone Number"
                    placeholder="+1 (555) 123-4567"
                    type="tel"
                    containerClass="group"
                    inputClass="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    labelClass="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    icon={<FiPhone className="text-gray-400" />}
                  />
                </div>
              </div>
            </div>

            {/* Form Footer */}
            <div className="bg-gray-50 dark:bg-gray-700/30 border-gray-100 dark:border-gray-700 flex justify-end border-t px-6 py-4 sm:px-8">
              <GenericButton
                type="submit"
                className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg"
              >
                Continue
                <FiArrowRight className="ml-2 h-4 w-4" />
              </GenericButton>
            </div>
          </form>

          {/* Support Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Need help?{' '}
              <a
                href="#"
                className="text-blue-600 transition-colors duration-200 hover:underline dark:text-blue-400"
              >
                Contact support
              </a>
            </p>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};
