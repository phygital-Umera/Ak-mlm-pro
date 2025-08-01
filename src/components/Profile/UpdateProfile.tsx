/*eslint-disable*/
import {useEffect} from 'react';
import GenericInputField from '../Forms/Input/GenericInputField';
import {FormProvider, useForm} from 'react-hook-form';
import GenericButton from '../Forms/Buttons/GenericButton';
import {z} from 'zod';
import {updateProfileSchema} from '@/lib/validation/registerCustomerShema';
import {
  useGetProfile,
  useUpdateProfile,
} from '@/lib/react-query/Admin/profile/profile';
import {useAuthContext} from '@/context/AuthContext';
import GenericDropdown from '../Forms/DropDown/GenericDropDown';
import React from 'react';

type formValues = z.infer<typeof updateProfileSchema>;
const UpdateProfile = () => {
  const methods = useForm<formValues>({});

  useEffect(() => {
    if (profileData) {
      methods.reset({
        user: {
          phoneNumber: profileData?.phoneNumber ?? '',
          fullname: profileData?.fullname ?? '',
        },
        customer: {
          gender: profileData?.Customer?.gender ?? undefined,
          pinCode: profileData?.Customer?.pinCode ?? '',
          city: profileData?.Customer?.city ?? '',
          state: profileData?.Customer?.state ?? '',
          aadharNo: profileData?.Customer?.aadharNo ?? '',
          panNo: profileData?.Customer?.panNo ?? '',
          upiId: profileData?.Customer?.upiId ?? '',
          landMark: profileData?.Customer?.landMark ?? '',
          flatNo: profileData?.Customer?.flatNo ?? '',
          areaName: profileData?.Customer?.areaName ?? '',
          bankName: profileData?.Customer?.bankName ?? '',
          bankAccNo: profileData?.Customer?.bankAccNo ?? '',
          bankIFSC: profileData?.Customer?.bankIFSC ?? '',
          bankBranch: profileData?.Customer?.bankBranch ?? '',
        },
      });
    }
  }, []);

  const {user} = useAuthContext();

  const {mutateAsync: updateProfile} = useUpdateProfile();
  const {data: profileData} = useGetProfile();
  console.log('profile data', profileData);

  const onSubmit = (data: formValues) => {
    console.log('form data', data);
    const formattedData = {
      ...data,
      customer: {
        ...data.customer,
        dob: data.customer.dob ? new Date(data.customer.dob) : undefined,
      },
    };

    console.log('Formatted Data:', formattedData);

    updateProfile({
      id: user?.id!,
      data: formattedData,
    });
  };

  const error = (error: any) => {
    console.log('form error', error);
  };

  return (
    <div className="space-y-4 bg-white p-6">
      <h1 className="mb-4 text-lg font-semibold">Update Profile </h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit, error)}>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <GenericInputField name="user.fullname" label="FullName" />
            </div>

            <div className="col-span-6">
              <GenericInputField name="user.phoneNumber" label="Phone" />
            </div>

            <div className="col-span-6">
              <GenericInputField
                name="user.password"
                label="Password"
                type="password"
              />
            </div>

            <div className="col-span-6">
              <GenericInputField type="date" name="customer.dob" label="Dob" />
            </div>

            <div className="col-span-6">
              <GenericDropdown
                label="Gender"
                name="customer.gender"
                options={[
                  {label: 'Male', value: 'MALE'},
                  {label: 'Female', value: 'FEMALE'},
                  {label: 'Other', value: 'OTHER'},
                ]}
              />
            </div>

            <div className="col-span-6">
              <GenericInputField name="customer.pinCode" label="PinCode" />
            </div>

            <div className="col-span-6">
              <GenericInputField name="customer.city" label="City" />
            </div>

            <div className="col-span-6">
              <GenericInputField name="customer.state" label="State" />
            </div>

            <div className="col-span-6">
              <GenericInputField name="customer.aadharNo" label="aadharNo" />
            </div>

            <div className="col-span-6">
              <GenericInputField name="customer.panNo" label="panNo" />
            </div>

            <div className="col-span-6">
              <GenericInputField name="customer.upiId" label="upiId" />
            </div>

            <div className="col-span-6">
              <GenericInputField name="customer.landMark" label="landMark" />
            </div>

            <div className="col-span-6">
              <GenericInputField name="customer.flatNo" label="flatNo" />
            </div>

            <div className="col-span-6">
              <GenericInputField name="customer.areaName" label="areaName" />
            </div>

            <div className="col-span-6">
              <GenericInputField name="customer.bankName" label="bankName" />
            </div>

            <div className="col-span-6">
              <GenericInputField name="customer.bankAccNo" label="bankAccNo" />
            </div>

            <div className="col-span-6">
              <GenericInputField name="customer.bankIFSC" label="bankIFSC" />
            </div>

            <div className="col-span-6">
              <GenericInputField
                name="customer.bankBranch"
                label="bankBranch"
              />
            </div>
          </div>

          <div className="py-4">
            <GenericButton type="submit">save</GenericButton>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default UpdateProfile;
