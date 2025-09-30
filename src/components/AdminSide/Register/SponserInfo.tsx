/* eslint-disable */
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
  const [sponsorName, setSponsorName] = useState('');
  const [isVerifyingSponsor, setIsVerifyingSponsor] = useState(false);
  const [sponsorVerified, setSponsorVerified] = useState(false);

  const {state} = useRouter();
  const location = state?.location?.state?.data;

  const methods = useForm<FormValues>({
    resolver: zodResolver(sponserInfoSchema),
    defaultValues: {
      sponsorId: location?.parentId || user?.crnNo || '',
      side: location?.side || 'LEFT',
    },
  });

  // Watch the sponsorId field for changes
  const sponsorIdValue = methods.watch('sponsorId');

  // Effect to automatically verify sponsor ID when it changes
  useEffect(() => {
    const verifySponsorId = async () => {
      if (!sponsorIdValue) return;

      // Validate Sponsor ID format: 2 letters + 7 digits
      if (!/^[A-Z]{2}\d{7}$/.test(sponsorIdValue)) {
        setSponsorName('');
        setSponsorVerified(false);
        return;
      }

      try {
        setIsVerifyingSponsor(true);
        const result = await getSponsorNameById(sponsorIdValue);
        console.log('API response for sponsor:', result);

        // Handle different possible response formats
        const sponsorFullName =
          typeof result === 'string'
            ? result
            : result?.data?.name || result?.data || result?.name || '';

        console.log('Sponsor Full Name:', sponsorFullName);

        if (!sponsorFullName || sponsorFullName.trim() === '') {
          setSponsorName('');
          setSponsorVerified(false);
          toast.error('Sponsor name not found');
        } else {
          setSponsorName(sponsorFullName);
          setSponsorVerified(true);
          toast.success('Sponsor Verified');
        }
      } catch (error) {
        setSponsorName('');
        setSponsorVerified(false);
        toast.error('Invalid Sponsor ID');
      } finally {
        setIsVerifyingSponsor(false);
      }
    };

    // Add a delay to avoid making too many API calls
    const timeoutId = setTimeout(verifySponsorId, 500);

    return () => clearTimeout(timeoutId);
  }, [sponsorIdValue]);

  const onSubmit = async (formValues: FormValues) => {
    // Don't proceed if sponsor is not verified
    if (!sponsorVerified) {
      toast.error('Please enter a valid Sponsor ID');
      return;
    }

    // Set the sponsor info and mark as skipping product selection
    setSponsorInfo({
      sponsorId: formValues.sponsorId,
      side: formValues.side,
      epin: '',
      epinData: undefined,
    });
    setSkipProduct(true);

    // Proceed to the next step
    onNext();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 dark:bg-black"
      >
        <div className="grid grid-cols-12 gap-4">
          {/* Sponsor ID Field */}
          <div className="col-span-6">
            <GenericInputField
              name="sponsorId"
              label="Sponsor ID"
              placeholder="Enter Sponsor ID"
            />
          </div>

          {/* Sponsor Verification Status */}
          <div className="col-span-6 flex items-end">
            {isVerifyingSponsor && (
              <p className="text-blue-500">Verifying sponsor ID...</p>
            )}
            {sponsorName && (
              <p className="font-medium text-green-600">
                Sponsor Name: {sponsorName}
              </p>
            )}
          </div>
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
        </div>

        <div className="border-gray-200 dark:border-gray-700 flex justify-end gap-4 border-t pt-4">
          <GenericButton
            type="submit"
            disabled={!sponsorVerified}
            className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-medium text-white shadow-md hover:from-blue-600 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="flex items-center">
              Continue
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
