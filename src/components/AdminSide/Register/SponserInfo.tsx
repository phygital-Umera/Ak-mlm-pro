/* eslint-disable */
import React, {useState} from 'react';
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
import {useRouter} from '@tanstack/react-router';
import {getSponsorNameById} from '@/lib/api/Admin/Register/register';

type FormValues = z.infer<typeof sponserInfoSchema>;

interface SponserInfoProps {
  onNext: () => void;
}

export const SponserInfo: React.FC<SponserInfoProps> = ({onNext}) => {
  const {user} = useAuthContext();
  const {setSponsorInfo, setSkipProduct} = useRegistration();
  const [skipProductSelection, setSkipProductSelection] = useState(false);
  const [sponsorName, setSponsorName] = useState('');
  const [verifyingSponsor, setVerifyingSponsor] = useState(false);

  const {state} = useRouter();
  const location = state?.location?.state?.data;

  const methods = useForm<FormValues>({
    resolver: zodResolver(sponserInfoSchema),
    defaultValues: {
      sponsorId: location?.parentId || user?.crnNo || '',
      side: location?.side || 'LEFT',
      epin: '',
    },
  });

  const {mutateAsync: checkEpin, isPending: isCheckingEpin} = useCheckEpin();

  const verifySponsorId = async () => {
    const sponsorId = methods.getValues('sponsorId');

    if (!sponsorId) {
      toast.error('Please enter Sponsor ID first');
      return;
    }

    // ✅ Validate 10-digit numeric Sponsor ID
    // Validate Sponsor ID format: CRN + 7 digits
    if (!/^[A-Z]{3}\d{7}$/.test(sponsorId)) {
      toast.error(
        'Sponsor ID must be 3 letters followed by 7 digits (e.g., CRN0000001)',
      );
      return;
    }

    try {
      setVerifyingSponsor(true);
      const result = await getSponsorNameById(sponsorId);
      console.log('API response for sponsor:', result);

      const sponsorFullName =
        typeof result === 'string'
          ? result
          : result?.name || result?.data?.name || '';

      console.log('Sponsor Full Name:', sponsorFullName);

      if (!sponsorFullName || sponsorFullName.trim() === '') {
        toast.error('Sponsor name not found');
        return;
      }

      setSponsorName(sponsorFullName);
      toast.success('Sponsor Verified');
    } catch (error) {
      setSponsorName('');
      toast.error('Invalid Sponsor ID');
    } finally {
      setVerifyingSponsor(false);
    }
  };

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
      setSponsorInfo({
        sponsorId: formValues.sponsorId,
        side: formValues.side,
        epin: '',
        epinData: undefined,
      });
      setSkipProduct(true);
      onNext();
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 dark:bg-black"
      >
        <div className="grid grid-cols-12 gap-4">
          {/* Sponsor ID Field with Verify Button */}
          <div className="col-span-6">
            <GenericInputField
              name="sponsorId"
              label="Sponsor ID"
              placeholder="Enter Sponsor ID"
            />
          </div>
          <div className="col-span-2 flex items-end">
            <GenericButton
              type="button"
              onClick={verifySponsorId}
              disabled={verifyingSponsor}
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              {verifyingSponsor ? 'Verifying...' : 'Verify'}
            </GenericButton>
          </div>
          {sponsorName && (
            <div className="col-span-12">
              <p className="font-medium text-green-600">
                Sponsor Name: {sponsorName}
              </p>
            </div>
          )}

          {/* Side Dropdown */}
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

          {/* E-Pin (only if not skipping) */}
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

        <div className="border-gray-200 dark:border-gray-700 flex justify-end gap-4 border-t pt-4">
          <GenericButton
            type="submit"
            onClick={() => setSkipProductSelection(true)}
            className="text-gray-700 hover:bg-gray-100 rounded-lg border px-6 py-3"
          >
            Pay Later
          </GenericButton>
          <GenericButton
            type="submit"
            disabled={isCheckingEpin}
            onClick={() => setSkipProductSelection(false)}
            className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-medium text-white shadow-md hover:from-blue-600 hover:to-blue-700"
          >
            <span className="flex items-center">
              {isCheckingEpin ? 'Verifying...' : 'Continue'}
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
