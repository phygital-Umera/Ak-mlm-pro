/*eslint-disable */
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import GenericDropdown from '@/components/Forms/DropDown/GenericDropDown';
import React, {useState, useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {unAuthenticatedApi} from '@/utils/axios';
import {useAddRecallEpin} from '@/lib/react-query/Admin/TopUp/topup';
import toast from 'react-hot-toast';

const RecallEpin = () => {
  const methods = useForm();
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

    recallEpin({
      crnNo: data.crnNo,
      count: Number(data.count),
      price: Number(data.price),
    });

    // Optionally reset form after submission
    // methods.reset();
    // setCustomerName('');
    // setCustomerData(null);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        <h1 className="mb-6 text-2xl font-bold">Recall ePIN</h1>

        <div className="mb-6 flex w-[50%] flex-col gap-2">
          <GenericInputField
            name="crnNo"
            label="CRN No"
            placeholder="Enter CRN No"
          />

          {/* Show checking indicator */}
          {isChecking && (
            <div className="text-gray-500 text-sm">Checking customer...</div>
          )}

          {/* OPTION 1: Show customer name in a disabled input field */}
          {customerName &&
            customerName !== 'Invalid ID' &&
            customerName !== 'Invalid format' && (
              <div className="mt-2">
                <GenericInputField
                  name="customerName"
                  label="Customer Name"
                  value={customerName}
                  disabled={true}
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
            )}

          {/* Show error message if invalid */}
          {customerName === 'Invalid ID' && (
            <div className="mt-2 rounded bg-red-100 p-2 text-red-600">
              Invalid Customer CRN
            </div>
          )}

          {customerName === 'Invalid format' && (
            <div className="mt-2 rounded bg-yellow-100 p-2 text-yellow-600">
              Unexpected response format
            </div>
          )}
        </div>

        <div className="mb-6 flex w-[50%] flex-col gap-2">
          <GenericDropdown
            name="price"
            label="Price"
            options={[
              {label: '1250', value: '1250'},
              {label: '2000', value: '2000'},
              {label: '2700', value: '2700'},
              {label: '3500', value: '3500'},
            ]}
          />
        </div>
        <div className="mb-6 flex w-[50%] flex-col gap-2">
          <GenericInputField
            name="count"
            label="Count"
            placeholder="Enter Count"
            type="number"
            min="1"
          />
        </div>

        <GenericButton
          type="submit"
          className="mt-4"
          disabled={
            isPending ||
            !customerName ||
            customerName === 'Invalid ID' ||
            customerName === 'Invalid format'
          }
        >
          {isPending ? 'Submitting...' : 'Submit'}
        </GenericButton>
      </form>
    </FormProvider>
  );
};

export default RecallEpin;
