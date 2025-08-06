/* eslint-disable */
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import {useAuthContext} from '@/context/AuthContext';
import {useNavigate} from '@tanstack/react-router';
import {useGetCustomer} from '@/lib/react-query/Customer/home';
import {useUpdateCustomer} from '@/lib/react-query/updateCustomer';
import {updateCustomerSchema} from '@/lib/validation/updateCustomerSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import React, {useEffect, useState} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {z} from 'zod';
import Loader from '@/components/common/Loader';
import GenericSearchDropdown from '@/components/Forms/SearchDropDown/GenericSearchDropdown';
import toast from 'react-hot-toast';
import {useGetCustomerById} from '@/lib/react-query/updateCustomer';

type FormValues = z.infer<typeof updateCustomerSchema>;
interface Customer {
  dob: string;
  firstName: string;
  email: string;
  phone: string;
  gender: string;
  sponsorId: string;
  crnNo: string;
  aadharNo: string;
  panNo: string;
  bankName: string;
  bankAccNo: string;
  bankIFSC: string;
  bankBranch: string;
  upiId: string;
  flatNo: string;
  areaName: string;
  landMark: string;
  pinCode: string;
  city: string;
  state: string;
  password: string;
  confirmPassword: string;
  lastName: string;
}

const UpdateCustomerProfileU: React.FC = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(updateCustomerSchema),
    defaultValues: {
      // sponsorId: '',
      crnNo: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: '',
      dob: '',
      aadharNo: '',
      panNo: '',
      bankName: '',
      bankAccNo: '',
      bankIFSC: '',
      bankBranch: '',
      upiId: '',
      flatNo: '',
      areaName: '',
      landMark: '',
      pinCode: '',
      city: '',
      state: '',
      password: '',
      confirmPassword: '',
    },
  });

  const {user} = useAuthContext();
  const id = user?.id;
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  const {
    mutate: updateCustomer,
    isSuccess: updateCustomerSuccess,
    isError,
    isPending,
  } = useUpdateCustomer();

  const navigate = useNavigate();
  const {data, isSuccess, isLoading} = useGetCustomerById();

  console.log(data);
  useEffect(() => {
    if (isSuccess && data) {
      // Split fullname into first and last names
      const nameParts = data.fullname?.split(' ') || [];
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Set basic user info
      methods.setValue('firstName', firstName);
      methods.setValue('lastName', lastName);
      methods.setValue('email', data.email || '');
      methods.setValue('phone', data.phoneNumber || '');

      // Set customer-specific info from Customer object or direct properties
      const customerData = data.Customer || data;
      methods.setValue('crnNo', customerData.crnNo || '');
      methods.setValue('gender', customerData.gender || '');
      methods.setValue(
        'dob',
        customerData.dob
          ? new Date(customerData.dob).toISOString().split('T')[0]
          : '',
      );
      methods.setValue('aadharNo', customerData.aadharNo || '');
      methods.setValue('panNo', customerData.panNo || '');
      methods.setValue('bankName', customerData.bankName || '');
      methods.setValue('bankAccNo', customerData.bankAccNo || '');
      methods.setValue('bankIFSC', customerData.bankIFSC || '');
      methods.setValue('bankBranch', customerData.bankBranch || '');
      methods.setValue('upiId', customerData.upiId || '');
      methods.setValue('flatNo', customerData.flatNo || '');
      methods.setValue('areaName', customerData.areaName || '');
      methods.setValue('landMark', customerData.landMark || '');
      methods.setValue('pinCode', customerData.pinCode || '');
      methods.setValue('city', customerData.city || '');
      methods.setValue('state', customerData.state || '');

      setIsDataAvailable(true);
    }
  }, [isSuccess, data, methods]);

  useEffect(() => {
    if (updateCustomerSuccess) {
      toast.success('Customer updated successfully');
      navigate({to: '/customer/dashboard'});
    }

    if (isError) {
      toast.error('Failed to update customer');
    }
  }, [updateCustomerSuccess, isError, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  const onSubmit = (FormValues: FormValues) => {
    console.log(FormValues);
    if (id !== undefined) {
      updateCustomer({
        user: {
          email: FormValues.email,
          phoneNumber: FormValues.phone,
          fullname: FormValues.firstName + ' ' + FormValues.lastName,
          password: FormValues.password,
        },
        customer: {
          crnNo: FormValues.crnNo,
          aadharNo: FormValues.aadharNo || '',
          panNo: FormValues.panNo || '',
          bankName: FormValues.bankName || '',
          bankAccNo: FormValues.bankAccNo || '',
          bankBranch: FormValues.bankBranch || '',
          bankIFSC: FormValues.bankIFSC || '',
          upiId: FormValues.upiId || '',
          dob: FormValues.dob || '',
          gender: FormValues.gender || '',
          flatNo: FormValues.flatNo || '',
          areaName: FormValues.areaName || '',
          landMark: FormValues.landMark || '',
          city: FormValues.city || '',
          state: FormValues.state || '',
          pinCode: FormValues.pinCode || '',
        },
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 dark:bg-black"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <h1 className="col-span-12 mb-4 text-lg font-semibold">
            Sponsor Info
          </h1>

          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="sponsorId"
              label="Sponsor ID"
              placeholder="Enter Sponsor ID"
              disabled={isDataAvailable}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="crnNo"
              label="CRN No"
              placeholder="Enter CRN No"
              disabled={isDataAvailable}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <h1 className="col-span-12 mb-4 text-lg font-semibold">
            Contact Info
          </h1>

          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="firstName"
              label="First Name"
              placeholder="Enter First Name"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="lastName"
              label="Last Name"
              placeholder="Enter Last Name"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField type="date" name="dob" label="Date of Birth" />
          </div>

          <div className="col-span-12 md:col-span-6">
            <GenericSearchDropdown
              name="gender"
              label="Gender"
              options={[
                {label: 'Male', value: 'MALE'},
                {label: 'Female', value: 'FEMALE'},
              ]}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="email"
              label="Email"
              placeholder="Enter Email"
              disabled={isDataAvailable}
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="phone"
              label="Mobile"
              placeholder="Enter Phone No"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="flatNo"
              label="Flat/House No"
              placeholder="Enter Address"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="areaName"
              label="Area/Street"
              placeholder="Enter Area Name"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="landMark"
              label="Landmark"
              placeholder="Enter Landmark"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="pinCode"
              label="Pincode"
              placeholder="Enter Pincode"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="city"
              label="City/Town"
              placeholder="Enter City"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="state"
              label="State"
              placeholder="Enter State"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <h1 className="col-span-12 mb-4 text-lg font-semibold">
            Personal Info
          </h1>

          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="aadharNo"
              label="Aadhar Card No"
              placeholder="Enter Aadhar No"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="panNo"
              label="PAN Card No"
              placeholder="Enter PAN No"
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="bankName"
              label="Bank Name"
              placeholder="Enter Bank Name"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="bankAccNo"
              label="Account Number"
              placeholder="Enter Account No"
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="bankIFSC"
              label="IFSC Code"
              placeholder="Enter IFSC Code"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="bankBranch"
              label="Branch Name"
              placeholder="Enter Branch Name"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="upiId"
              label="UPI ID"
              placeholder="Enter UPI ID"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <h1 className="col-span-12 mb-4 text-lg font-semibold">Login Info</h1>

          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="password"
              label="Password"
              placeholder="Enter Password"
              type="password"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Enter Confirm Password"
              type="password"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <GenericButton type="submit">
            {isPending ? 'Updating...' : 'Update'}
          </GenericButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default UpdateCustomerProfileU;
