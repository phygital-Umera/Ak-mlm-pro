import GenericButton from '@/components/Forms/Buttons/GenericButton';
import GenericDropdown from '@/components/Forms/DropDown/GenericDropDown';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import {useCreateEPin} from '@/lib/react-query/Admin/Epin/epin';
import {epinSchema} from '@/lib/validation/epinSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import React, {useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import toast from 'react-hot-toast';
import {z} from 'zod';

type FormValues = z.infer<typeof epinSchema>;

const ZeroEpin = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(epinSchema),
  });
  const {mutate: createEPin, isSuccess, isPending, error} = useCreateEPin();

  const onSubmit = (data: FormValues) => {
    createEPin({
      epincount: data.count,
      data: {type: data.type}, // Convert usecount to number
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('E-Pin created successfully');
      methods.reset();
    }
    if (error) {
      toast.error('Error creating E-Pin');
    }
  }, [isSuccess, error]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 dark:bg-black"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <h1 className="col-span-12 mb-4 text-lg font-semibold">
            {' '}
            E-Pin Creation
          </h1>

          <div className="col-span-12 md:col-span-6">
            <GenericInputField name="count" label="Count" placeholder="Count" />
          </div>

          <div className="col-span-12 md:col-span-6">
            <GenericDropdown
              name="type"
              label="Type"
              options={[
                {value: 'REGULAR', label: 'REGULAR'},
                {value: 'ZERO', label: 'ZERO'},
              ]}
            />
          </div>
        </div>

        {/* Form Buttons */}
        <div className="flex justify-end space-x-4">
          <GenericButton type="submit">
            {isPending ? 'Creating...' : 'Create'}
          </GenericButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default ZeroEpin;
