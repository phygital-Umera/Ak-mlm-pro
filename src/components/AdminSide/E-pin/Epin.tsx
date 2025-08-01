/* eslint-disable*/
import React, {useEffect, useState} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useAGetOtp, useCreateEPin} from '@/lib/react-query/Admin/Epin/epin';
import toast from 'react-hot-toast';
import GenericDropdown from '@/components/Forms/DropDown/GenericDropDown';
import {epinSchema} from '@/lib/validation/epinSchema';

type FormValues = z.infer<typeof epinSchema>;
export const Epin: React.FC = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(epinSchema),
  });
  const {mutate: createEPin, isSuccess, isPending, error} = useCreateEPin();
  const [selectedType, setSelectedType] = useState('');
  const [countValue, setCountValue] = useState('');
  const {
    mutate: getOtp,
    isPending: isOtpPending,
    isSuccess: isOtpFetched,
  } = useAGetOtp(); // assumes it uses .mutate
  const [isOtpRequested, setIsOtpRequested] = useState(false);

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
  };

  console.log('count', countValue);
  console.log('price', selectedType);

  const onSubmit = (data: FormValues) => {
    console.log('dataaa', data);
    createEPin({
      epincount: data.count,
      price: Number(selectedType),
    });
    setSelectedType('');
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('E-Pin created successfully');
      methods.reset();
    }
    if (error) {
      toast.error('Error creating E-Pin');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('E-Pin created successfully');
      methods.reset();
    }
    if (error) {
      toast.error('Error creating E-Pin');
    }
  }, [isSuccess]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 dark:bg-black"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <h1 className="col-span-12 mb-4 text-lg font-semibold">E-Pin</h1>

          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="count"
              label="Count"
              placeholder="Count"
              onChange={(val: string) => setCountValue(val)}
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <GenericDropdown
              label="Price"
              name="price"
              options={[
                {label: 'Product 1 (3150)', value: '3150'},
                {label: 'Product 2 (3600)', value: '3600'},
              ]}
              onChange={handleTypeChange}
            />
          </div>

          {/* {isOtpRequested && (
            <div className="col-span-12 md:col-span-6">
              <GenericInputField
                name="OTP"
                label="Otp"
                placeholder="Enter OTP"
              />
            </div>
          )} */}
        </div>

        {/* Form Buttons */}
        {/* <div className="flex justify-end space-x-4">
          <GenericButton type="submit">
            {isOtpRequested
              ? isPending
                ? 'creating...'
                : 'create'
              : isOtpPending
                ? 'getting...'
                : 'get otp'}
          </GenericButton>
        </div> */}

        <GenericButton type="submit">Submit</GenericButton>
      </form>
    </FormProvider>
  );
};

export default Epin;
