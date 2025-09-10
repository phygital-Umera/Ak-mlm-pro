/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {useForm, FormProvider, Controller} from 'react-hook-form';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import GenericDropdown from '@/components/Forms/DropDown/GenericDropDown';
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import toast from 'react-hot-toast';
import {useCreateCustomerEPin} from '@/lib/react-query/Admin/Epin/epin';
import {unAuthenticatedApi} from '@/utils/axios';

export const epinCustomerSchema = z.object({
  Count: z.string().nonempty('E-Pin Count is required').transform(Number),
  price: z.string().nonempty('Price is required').transform(Number),
  crnNo: z.string().nonempty('CRN is required'),
});

type FormValues = z.infer<typeof epinCustomerSchema>;

const EpinForm: React.FC = () => {
  const [customerName, setCustomerName] = useState<string>('');
  const [isChecking, setIsChecking] = useState<boolean>(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(epinCustomerSchema),
    defaultValues: {
      Count: 0,
      crnNo: '',
    },
  });

  const {handleSubmit, watch} = methods;
  const crnNo = watch('crnNo'); // Watch the CRN field for changes

  const {mutate: createEPin, isPending} = useCreateCustomerEPin();

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

  const onSubmit = async (data: FormValues) => {
    await createEPin({
      Count: data.Count,
      price: data.price,
      crnNo: data.crnNo,
    });
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 dark:bg-black"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <h1 className="col-span-12 mb-4 text-lg font-semibold">
            Customer E-Pin
          </h1>

          <div className="col-span-12 md:col-span-6">
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

          <div className="col-span-12 md:col-span-6">
            {/* Price */}
            <Controller
              name="price"
              control={methods.control}
              render={({field}) => (
                <GenericDropdown
                  label="Price"
                  name="price"
                  options={[
                    {label: '1250', value: '1250'},
                    {label: '2000', value: '2000'},
                    {label: '2700', value: '2700'},
                    {label: '3500', value: '3500'},
                  ]}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            {/* E-Pin Count */}
            <GenericInputField
              name="Count"
              label="E-Pin Count"
              placeholder="Enter E-Pin Count"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-12 text-right">
            <GenericButton
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors"
            >
              {isPending ? 'Submitting...' : 'Submit'}
            </GenericButton>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default EpinForm;
