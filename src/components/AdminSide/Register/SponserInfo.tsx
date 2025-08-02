/* eslint-disable */
import React from 'react';
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import GenericDropdown from '@/components/Forms/DropDown/GenericDropDown';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import {useRegistration} from '@/context/RegisterContext';
import {sponserInfoSchema} from '@/lib/validation/registerCustomerShema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm, FormProvider} from 'react-hook-form';
import {z} from 'zod';
import {useAuthContext} from '@/context/AuthContext';
import {useCheckEpin} from '@/lib/react-query/Admin/Epin/epin';
import toast from 'react-hot-toast';
import {useState} from 'react';

type FormValues = z.infer<typeof sponserInfoSchema>;
interface SponserInfoProps {
  onNext: () => void;
}

// Add this at the top (or wherever appropriate)

export const SponserInfo: React.FC<SponserInfoProps> = ({onNext}) => {
  const {user} = useAuthContext();
  const {setSponsorInfo, setSkipProduct} = useRegistration();
  const [skipProductSelection, setSkipProductSelection] = useState(false); // NEW

  const methods = useForm<FormValues>({
    resolver: zodResolver(sponserInfoSchema),
    defaultValues: {
      sponsorId: user?.crnNo || '',
      side: 'LEFT',
      epin: '',
    },
  });

  const {mutateAsync: checkEpin, isPending: isCheckingEpin} = useCheckEpin();
  const {mutateAsync: checkEpin, isPending: isCheckingEpin} = useCheckEpin();

  const onSubmit = async (formValues: FormValues) => {
    if (!skipProductSelection) {
      const {epin} = formValues;

      if (!epin) {
        toast.error('Please enter E-Pin');
        return;
      }

      try {
        const toastId = toast.loading('Verifying E-Pin...');
        const epinData = await checkEpin(epin);

        if (!epinData) {
          toast.dismiss(toastId);
          toast.error('Invalid E-Pin or E-Pin already used');
          return;
        }

        toast.dismiss(toastId);
        toast.success('E-Pin verified');

        setSponsorInfo({
          sponsorId: formValues.sponsorId,
          side: formValues.side,
          epin: formValues.epin,
          epinData: epinData,
        });

        onNext();
      } catch (error: any) {
        toast.dismiss();
        toast.error(error?.response?.data?.message || 'Failed to verify E-Pin');
      }
    } else {
      // Pay Later: skip E-Pin and product selection
      setSponsorInfo({
        sponsorId: formValues.sponsorId,
        side: formValues.side,
        epin: '',
        epinData: undefined,
      });
      // Skip one extra step (product)
      setSkipProduct(true);
      onNext(); // Call it twice or have custom logic in parent
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 dark:bg-black"
      >
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-6">
            <GenericInputField
              name="sponsorId"
              label="Sponsor ID"
              placeholder="Enter Sponsor ID"
            />
          </div>
          <div className="col-span-6">
            <GenericDropdown
              name="side"
              label="Side"
              options={[
                {label: 'LEFT', value: 'LEFT'},
                {label: 'RIGHT', value: 'RIGHT'},
              ]}
            />
          </div>
          {!skipProductSelection && (
            <div className="col-span-6">
              <GenericInputField
                name="epin"
                label="E-Pin"
                placeholder="Enter E-Pin"
              />
            </div>
          )}
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/30 border-gray-100 dark:border-gray-700 flex justify-end gap-4 border-t px-6 py-4 sm:px-8">
          <GenericButton
            type="submit"
            onClick={() => setSkipProductSelection(true)}
            className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg border px-6 py-3"
          >
            Pay Later
          </GenericButton>
          <GenericButton
            type="submit"
            disabled={isCheckingEpin}
            onClick={() => setSkipProductSelection(false)}
            className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className="flex items-center">
              {isCheckingEpin ? 'Verifying...' : 'Continue'}
              {isCheckingEpin ? 'Verifying...' : 'Continue'}
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
