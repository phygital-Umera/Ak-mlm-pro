import React, {useState, useEffect} from 'react';
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

type FormValues = z.infer<typeof sponserInfoSchema>;
interface SponserInfoProps {
  onNext: () => void;
}

export const SponserInfo: React.FC<SponserInfoProps> = ({onNext}) => {
  const {user} = useAuthContext();
  const {setSponsorInfo} = useRegistration();
  const [isEpinValid, setIsEpinValid] = useState<boolean | null>(null);
  const [epinError, setEpinError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [epinData, setEpinData] = useState<any>(null);

  const methods = useForm<FormValues>({
    resolver: zodResolver(sponserInfoSchema),
    defaultValues: {
      sponsorId: user?.crnNo || '',
      side: 'LEFT',
      epin: '',
    },
  });

  const epinValue = methods.watch('epin');

  // Reset validation when epin changes
  useEffect(() => {
    if (epinValue) {
      setIsEpinValid(null);
      setEpinError(null);
    }
  }, [epinValue]);

  const {
    data: checkEpinData,
    isPending: isCheckingEpin,
    refetch,
    error: epinCheckError,
  } = useCheckEpin(epinValue || '');

  const handleEpinCheck = async () => {
    const epin = methods.getValues('epin');
    if (!epin) {
      setEpinError('Please enter an E-Pin');
      setIsEpinValid(false);
      return;
    }

    try {
      const {data} = await refetch();

      if (data) {
        setIsEpinValid(true);
        setEpinData(data);
        setEpinError(null);
      } else {
        setIsEpinValid(false);
        setEpinError('Invalid E-Pin or E-Pin already used');
      }
    } catch (error) {
      setIsEpinValid(false);
      setEpinError(error.response?.data?.message || 'Failed to verify E-Pin');
    }
  };

  const onSubmit = (formValues: FormValues) => {
    if (!isEpinValid) {
      setEpinError('Please verify the E-Pin first');
      return;
    }

    if (!epinData) {
      setEpinError('E-Pin data not available');
      return;
    }

    setSponsorInfo({
      sponsorId: formValues.sponsorId,
      side: formValues.side,
      epin: formValues.epin,
      epinData: epinData,
    });

    console.log('Form submitted:', {
      ...formValues,
      // epinAmount: epinData.amount,
      epinData: epinData,
    });

    onNext();
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
          <div className="col-span-6">
            <GenericInputField
              name="epin"
              label="E-Pin"
              placeholder="Enter E-Pin"
            />
            {epinError && <p className="text-sm text-red-500">{epinError}</p>}
            {isEpinValid && (
              <div className="text-sm text-green-500">
                <p>E-Pin is valid!</p>
                {epinData?.amount && <p>E-Pin Amount: {epinData.amount}</p>}
              </div>
            )}
          </div>
        </div>

        <GenericButton
          type="button"
          onClick={handleEpinCheck}
          disabled={isCheckingEpin || !epinValue}
          className="mt-2 bg-yellow-500 text-white hover:bg-yellow-600"
        >
          {isCheckingEpin ? 'Verifying...' : 'Verify E-Pin'}
        </GenericButton>

        <div className="bg-gray-50 dark:bg-gray-700/30 border-gray-100 dark:border-gray-700 flex justify-end border-t px-6 py-4 sm:px-8">
          <GenericButton
            type="submit"
            disabled={!isEpinValid || isCheckingEpin}
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
