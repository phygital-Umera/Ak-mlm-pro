import React from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import GenericDropdown from '@/components/Forms/DropDown/GenericDropDown';
import DisplayProductEpin from './DisplayProductEpin';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import {epinProductSchema} from '@/lib/validation/epinSchema';

type FormValues = z.infer<typeof epinProductSchema>;

const ProductEpin: React.FC = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(epinProductSchema),
  });

  const isLoading = false;

  const onSubmit = async (data: FormValues) => {
    try {
      // Log the data (simulate submission)
      console.log('Submitting data:', data);

      // Show success toast
      toast.success('Form submitted successfully!');

      // Reset the form
      methods.reset();
    } catch (err) {
      console.error('Submit error:', err);
      toast.error('Something went wrong');
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 dark:bg-black"
      >
        <div className="space-y-4">
          <h1 className="mb-4 text-lg font-semibold">Product E-Pin Request</h1>

          <div className="flex flex-wrap items-center gap-4">
            {/* Count Input */}
            <div className="flex-1">
              <GenericInputField
                name="count"
                label="Count"
                placeholder="Enter Count"
              />
              {methods.formState.errors.count && (
                <p className="text-sm text-red-500">
                  {methods.formState.errors.count.message}
                </p>
              )}
            </div>

            {/* Price Dropdown */}
            <div className="flex-1">
              <GenericDropdown
                name="price"
                label="Price"
                options={[
                  {value: '3150', label: '3150'},
                  {value: '3600', label: '3600'},
                ]}
              />
              {methods.formState.errors.price && (
                <p className="text-sm text-red-500">
                  {methods.formState.errors.price.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end space-x-4">
          <GenericButton type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </GenericButton>
        </div>
      </form>

      {/* Optional: Display existing product epins */}
      <div className="mt-8">
        <DisplayProductEpin />
      </div>
    </FormProvider>
  );
};

export default ProductEpin;
