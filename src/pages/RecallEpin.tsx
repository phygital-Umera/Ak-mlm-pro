/*eslint-disable */
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import GenericDropdown from '@/components/Forms/DropDown/GenericDropDown';
import React, {useState, useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {unAuthenticatedApi} from '@/utils/axios';
import {useAddRecallEpin} from '@/lib/react-query/Admin/TopUp/topup';

const RecallEpin = () => {
  const methods = useForm();
  const [customerName, setCustomerName] = useState<string>('');
  const [isChecking, setIsChecking] = useState<boolean>(false);

  const {handleSubmit, watch} = methods;

  // Watch the CRN field for changes
  const crnNo = watch('crnNo');

  const {mutateAsync: recallEpin, isPending} = useAddRecallEpin();

  // Effect to check CRN and get customer name
  useEffect(() => {
    const checkCRN = async () => {
      if (crnNo && crnNo.length > 8) {
        setIsChecking(true);
        try {
          const response = await unAuthenticatedApi.get(
            `/customerName/${crnNo}`,
          );
          setCustomerName(response.data.data);
        } catch (error) {
          setCustomerName('Invalid ID');
        } finally {
          setIsChecking(false);
        }
      } else {
        setCustomerName('');
      }
    };

    // Add a delay to avoid making too many API calls
    const timeoutId = setTimeout(checkCRN, 500);

    return () => clearTimeout(timeoutId);
  }, [crnNo]);

  const onSubmit = (data: any) => {
    recallEpin({
      crnNo: data.crnNo,
      count: Number(data.count),
      price: Number(data.price),
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-md p-6">
        <h1 className="mb-6 text-2xl font-bold">Recall ePIN</h1>

        <div className="mb-6">
          <GenericInputField
            name="crnNo"
            label="CRN No"
            placeholder="Enter CRN No"
          />
          {customerName && (
            <div className="bg-gray-100 mt-2 rounded p-2">
              Customer Name: <strong>{customerName}</strong>
              {isChecking && (
                <span className="text-gray-500 ml-2">Checking...</span>
              )}
            </div>
          )}
        </div>

        <GenericInputField
          name="count"
          label="Count"
          placeholder="Enter Count"
          type="number"
          min="1"
        />

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

        <GenericButton type="submit" className="mt-4" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit'}
        </GenericButton>
      </form>
    </FormProvider>
  );
};

export default RecallEpin;
