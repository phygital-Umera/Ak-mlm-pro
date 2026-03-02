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
  const [customerData, setCustomerData] = useState<any>(null);
  const [isChecking, setIsChecking] = useState<boolean>(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(epinCustomerSchema),
    defaultValues: {
      Count: 0,
      crnNo: '',
    },
  });

  const {handleSubmit, watch, setValue} = methods;
  const crnNo = watch('crnNo'); // Watch the CRN field for changes

  const {mutate: createEPin, isPending} = useCreateCustomerEPin();

  // Effect to set customer name in form when it changes
  useEffect(() => {
    if (
      customerName &&
      customerName !== 'Invalid ID' &&
      customerName !== 'Invalid format'
    ) {
      // Method 1: Set the value in React Hook Form
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
          } else {
            setCustomerName('Invalid format');
          }
        } catch (error) {
          console.error('Error fetching customer:', error);
          setCustomerName('Invalid ID');
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

  const onSubmit = async (data: FormValues) => {
    await createEPin({
      Count: data.Count,
      price: data.price,
      crnNo: data.crnNo,
    });
    methods.reset();
    setCustomerName('');
    setCustomerData(null);
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

            {/* Show checking indicator */}
            {isChecking && (
              <div className="text-gray-500 mt-2 text-sm">
                Checking customer...
              </div>
            )}

            {/* OPTION 1: Using GenericInputField with React Hook Form */}
            {customerName &&
              customerName !== 'Invalid ID' &&
              customerName !== 'Invalid format' && (
                <div className="mt-4">
                  <GenericInputField
                    placeholder="Customer Name"
                    name="customerName"
                    label="Customer Name"
                    disabled={true}
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
                    {label: '0', value: '0'},
                    {label: '1000', value: '1000'},
                    // {label: '1250', value: '1250'},
                    // {label: '2000', value: '2000'},
                    // {label: '2700', value: '2700'},
                    // {label: '3500', value: '3500'},
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
              disabled={
                isPending ||
                !customerName ||
                customerName === 'Invalid ID' ||
                customerName === 'Invalid format'
              }
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
