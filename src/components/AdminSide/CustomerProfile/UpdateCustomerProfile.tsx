/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import {updateCustomerSchema} from '@/lib/validation/updateCustomerSchema';
import {useGetCustomer} from '@/lib/react-query/Customer/home';
import {useMatch} from '@tanstack/react-router';
import {useUpdateCustomer} from '@/lib/react-query/updateCustomer';
import toast from 'react-hot-toast';
import GenericSearchDropdown from '@/components/Forms/SearchDropDown/GenericSearchDropdown';
import {useNavigate} from '@tanstack/react-router';
import {LockIcon} from 'lucide-react';
import {updateCustomer} from '@/lib/api/updateCustomer';

type FormValues = z.infer<typeof updateCustomerSchema>;
const UpdateCustomerProfile: React.FC = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(updateCustomerSchema),
  });
  const {params} = useMatch('/_app/admin/_edit/UpdateCustomer/$id' as any);
  const {id = ''} = params as {id: string};
  const navigate = useNavigate();
  const [isBankAccNoDisabled, setIsBankAccNoDisabled] = useState(false);
  const [initialData, setInitialData] = useState<any>(null);

  const {data, isSuccess} = useGetCustomer(id);
  const {
    mutate: updateCustomer,
    isSuccess: updateCustomerSuccess,
    isError,
    isPending,
  } = useUpdateCustomer();

  const {setValue} = methods;

  useEffect(() => {
    if (isSuccess && data) {
      setInitialData(data);
      setValue('firstName', data.fullname?.split(' ')[0] || '');
      setValue(
        'dob',
        data.dob ? new Date(data.dob).toISOString().split('T')[0] : '',
      );
      setValue('phone', data.phoneNumber || '');
      setValue('email', data.email || '');
      setValue('flatNo', data.flatNo || '');
      setValue('areaName', data.areaName || '');
      setValue('landMark', data.landMark || '');
      setValue('city', data.city || '');
      setValue('state', data.state || '');
      setValue('pinCode', data.pinCode || '');
      setValue('aadharNo', data.aadharNo || '');
      setValue('panNo', data.panNo || '');
      setValue('bankName', data.bankName || '');
      setValue('bankAccNo', data.bankAccNo || '');
      setValue('bankBranch', data.bankBranch || '');
      setValue('bankIFSC', data.bankIFSC || '');
      setValue('gender', data.gender || '');
      setValue('sponsorId', data.crnNo || '');
      setValue('password', data.password || '');
      setValue('confirmPassword', data.password || '');

      // Disable bank account field if it already has a value
      if (data.bankAccNo) {
        setIsBankAccNoDisabled(true);
      }
    }
  }, [isSuccess, data, setValue]);

  const onSubmit = (formData: FormValues) => {
    const userData: Record<string, any> = {};
    const customerData: Record<string, any> = {};

    // ---------- User Data ----------
    if (formData.firstName || initialData?.fullname) {
      userData.fullname = formData.firstName || initialData?.fullname;
    }

    if (formData.phone || initialData?.phoneNumber) {
      userData.phoneNumber = formData.phone || initialData?.phoneNumber;
    }

    if (formData.email || initialData?.email) {
      userData.email = formData.email || initialData?.email;
    }

    if (formData.password) {
      userData.password = formData.password;
    }

    // ---------- Customer Data ----------
    if (formData.aadharNo || initialData?.aadharNo) {
      customerData.aadharNo = formData.aadharNo || initialData?.aadharNo;
    }

    if (formData.panNo || initialData?.panNo) {
      customerData.panNo = (formData.panNo || initialData?.panNo)
        .toUpperCase()
        .trim();
    }

    if (formData.bankName || initialData?.bankName) {
      customerData.bankName = formData.bankName || initialData?.bankName;
    }

    if (formData.bankAccNo || initialData?.bankAccNo) {
      customerData.bankAccNo = formData.bankAccNo || initialData?.bankAccNo;
    }

    if (formData.bankBranch || initialData?.bankBranch) {
      customerData.bankBranch = formData.bankBranch || initialData?.bankBranch;
    }

    if (formData.bankIFSC || initialData?.bankIFSC) {
      customerData.bankIFSC = formData.bankIFSC || initialData?.bankIFSC;
    }

    if (formData.dob || initialData?.dob) {
      customerData.dob = formData.dob
        ? new Date(formData.dob).toISOString()
        : initialData?.dob;
    }

    if (formData.gender || initialData?.gender) {
      customerData.gender = formData.gender || initialData?.gender;
    }

    if (formData.flatNo || initialData?.flatNo) {
      customerData.flatNo = formData.flatNo || initialData?.flatNo;
    }

    if (formData.areaName || initialData?.areaName) {
      customerData.areaName = formData.areaName || initialData?.areaName;
    }

    if (formData.landMark || initialData?.landMark) {
      customerData.landMark = formData.landMark || initialData?.landMark;
    }

    if (formData.city || initialData?.city) {
      customerData.city = formData.city || initialData?.city;
    }

    if (formData.state || initialData?.state) {
      customerData.state = formData.state || initialData?.state;
    }

    if (formData.pinCode || initialData?.pinCode) {
      customerData.pinCode = formData.pinCode || initialData?.pinCode;
    }

    if (formData.sponsorId || initialData?.crnNo) {
      customerData.crnNo = formData.sponsorId || initialData?.crnNo;
    }

    // ---------- Final Submit ----------
    if (
      Object.keys(userData).length > 0 ||
      Object.keys(customerData).length > 0
    ) {
      updateCustomer({
        id,
        data: {
          ...(Object.keys(userData).length > 0 && {user: userData}),
          ...(Object.keys(customerData).length > 0 && {customer: customerData}),
        },
      });
    } else {
      toast.error('Please fill at least one field');
    }
  };

  useEffect(() => {
    if (updateCustomerSuccess) {
      toast.success('Customer updated successfully');
      navigate({to: '/admin/customerlist'});
    }
    if (isError) {
      toast.error('Error updating customer');
    }
  }, [updateCustomerSuccess, isError, navigate]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 dark:bg-black"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <h1 className="col-span-12 mb-4 text-lg font-semibold">
            Sponser Info
          </h1>

          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="sponsorId"
              label="Sponser ID"
              placeholder="Enter Sponser ID"
              disabled
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
              placeholder="Enter Client Name"
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
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="phone"
              label="Mobile "
              placeholder="Enter Phone No"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="flatNo"
              label="Flat, House No, Company, Apartment"
              placeholder="Enter Address"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="areaName"
              label="Area, Street, Sector, Village"
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
              label="Adhar Card No"
              placeholder="Enter Adhar No"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="panNo"
              label="Pan Card No"
              placeholder="Enter Pan No"
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="bankName"
              label="Bank Name"
              placeholder="Enter Bank Name"
            />
          </div>
          <div className="relative col-span-12 md:col-span-6">
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

        {/* Form Buttons */}
        <div className="flex justify-end space-x-4">
          <GenericButton type="submit">
            {isPending ? 'Updating' : 'Update'}
          </GenericButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default UpdateCustomerProfile;
