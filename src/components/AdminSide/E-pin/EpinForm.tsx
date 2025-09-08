/* eslint-disable */
import React from 'react';
import {useForm, FormProvider, Controller} from 'react-hook-form';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import GenericDropdown from '@/components/Forms/DropDown/GenericDropDown';
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import toast from 'react-hot-toast';
import {useCreateCustomerEPin} from '@/lib/react-query/Admin/Epin/epin';

export const epinCustomerSchema = z.object({
  Count: z.string().nonempty('E-Pin Count is required').transform(Number),
  price: z.string().nonempty('Price is required').transform(Number),
  crnNo: z.string().nonempty('CRN is required'),
});

type FormValues = z.infer<typeof epinCustomerSchema>;

const EpinForm: React.FC = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(epinCustomerSchema),
    defaultValues: {
      Count: 0,
      crnNo: '',
    },
  });

  const {mutate: createEPin, isPending} = useCreateCustomerEPin();

  const onSubmit = async(data: FormValues) => {
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
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 dark:bg-black"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <h1 className="col-span-12 mb-4 text-lg font-semibold">
            {' '}
            Customer E-Pin
          </h1>

          <div className="col-span-12 md:col-span-6">
            {/* Customer CRN */}
            <GenericInputField
              name="crnNo"
              label="Customer CRN No"
              placeholder="Enter Customer CRN No"
            />
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
