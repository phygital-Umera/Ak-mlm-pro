/* eslint-disable */
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import GenericDropdown from '@/components/Forms/DropDown/GenericDropDown';
import React, {useState, useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {unAuthenticatedApi} from '@/utils/axios';
import {useAddRecallEpin} from '@/lib/react-query/Admin/TopUp/topup';
import toast from 'react-hot-toast';

const RecallEpin = () => {
  const methods = useForm({
    defaultValues: {
      crnNo: '',
      customerName: '',
      price: '',
      count: '',
    },
  });
  const [customerName, setCustomerName] = useState<string>('');
  const [customerData, setCustomerData] = useState<any>(null);
  const [isChecking, setIsChecking] = useState<boolean>(false);

  const {handleSubmit, watch, setValue} = methods;

  // Watch the CRN field for changes
  const crnNo = watch('crnNo');

  const {mutateAsync: recallEpin, isPending} = useAddRecallEpin();

  // Set customer name in form when it changes
  useEffect(() => {
    if (
      customerName &&
      customerName !== 'Invalid ID' &&
      customerName !== 'Invalid format'
    ) {
      setValue('customerName', customerName);
    }
  }, [customerName, setValue]);

  // Effect to check CRN and get customer name
  useEffect(() => {
    const checkCRN = async () => {
      if (crnNo && crnNo.length > 8) {
        setIsChecking(true);
        try {
          const response = await unAuthenticatedApi.get(
            `/customerName/${crnNo}`,
          );
          console.log('Customer Response:', response.data);

          // Extract the name from the nested data structure
          if (response.data && response.data.data && response.data.data.name) {
            setCustomerName(response.data.data.name);
            setCustomerData(response.data.data);
            toast.success('Customer verified successfully');
          } else {
            setCustomerName('Invalid format');
            setCustomerData(null);
          }
        } catch (error) {
          console.error('Error fetching customer:', error);
          setCustomerName('Invalid ID');
          setCustomerData(null);
        } finally {
          setIsChecking(false);
        }
      } else {
        setCustomerName('');
        setCustomerData(null);
      }
    };

    // Add a delay to avoid making too many API calls
    const timeoutId = setTimeout(checkCRN, 500);

    return () => clearTimeout(timeoutId);
  }, [crnNo]);

  const onSubmit = (data: any) => {
    if (
      !customerName ||
      customerName === 'Invalid ID' ||
      customerName === 'Invalid format'
    ) {
      toast.error('Please verify customer first');
      return;
    }

    if (!data.price) {
      toast.error('Please select a price');
      return;
    }

    if (!data.count || Number(data.count) < 1) {
      toast.error('Please enter a valid count');
      return;
    }

    recallEpin({
      crnNo: data.crnNo,
      count: Number(data.count),
      price: Number(data.price),
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        <h1 className="mb-6 text-2xl font-bold">Recall ePIN</h1>

        {/* Main container with horizontal layout */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          {/* Horizontal fields container */}
          <div className="flex flex-wrap items-start gap-4">
            {/* CRN Input Field */}
            <div className="min-w-[200px] flex-1">
              <GenericInputField
                name="crnNo"
                label="CRN No"
                placeholder="Enter CRN No"
              />
            </div>

            {/* Price Dropdown Field */}
            <div className="min-w-[150px] flex-1">
              <GenericDropdown
                name="price"
                label="Price"
                placeholder="Select Price"
                options={[
                  {label: '0', value: '0'},
                  {label: '1000', value: '1000'},
                  // {label: '₹1250', value: '1250'},
                  // {label: '₹2000', value: '2000'},
                  // {label: '₹2700', value: '2700'},
                  // {label: '₹3500', value: '3500'},
                ]}
              />
            </div>

            {/* Count Input Field */}
            <div className="min-w-[150px] flex-1">
              <GenericInputField
                name="count"
                label="Count"
                placeholder="Enter Count"
                type="number"
                min="1"
              />
            </div>
          </div>

          {/* Status messages section - appears below the horizontal fields */}
          <div className="mt-4">
            {/* Checking indicator */}
            {isChecking && (
              <div className="text-sm text-blue-600">Checking customer...</div>
            )}

            {/* Customer name display */}
            {customerName &&
              customerName !== 'Invalid ID' &&
              customerName !== 'Invalid format' && (
                <div className="mt-2">
                  <GenericInputField
                    name="customerName"
                    label="Customer Name"
                    value={customerName}
                    disabled={true}
                    className="bg-gray-100 max-w-md cursor-not-allowed"
                  />
                </div>
              )}

            {/* Error messages */}
            {customerName === 'Invalid ID' && (
              <div className="mt-2 inline-block rounded bg-red-100 p-2 text-red-600">
                Invalid Customer CRN
              </div>
            )}

            {customerName === 'Invalid format' && (
              <div className="mt-2 inline-block rounded bg-yellow-100 p-2 text-yellow-600">
                Unexpected response format
              </div>
            )}
          </div>

          {/* Submit Button - Right Aligned */}
          <div className="mt-6 flex justify-end">
            <GenericButton
              type="submit"
              className="w-32" /* Fixed width for the button */
              disabled={
                isPending ||
                !customerName ||
                customerName === 'Invalid ID' ||
                customerName === 'Invalid format' ||
                isChecking
              }
            >
              {isPending ? 'Submitting...' : 'Recall'}
            </GenericButton>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default RecallEpin;
