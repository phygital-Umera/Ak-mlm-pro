/*eslint-disable*/
import {useEffect, useMemo, useState} from 'react';
import GenericInputField from '../Forms/Input/GenericInputField';
import {FormProvider, useForm} from 'react-hook-form';
import GenericButton from '../Forms/Buttons/GenericButton';
import {z} from 'zod';
import {useAuthContext} from '@/context/AuthContext';
import GenericDropdown from '../Forms/DropDown/GenericDropDown';
import React from 'react';
import {useNavigate} from '@tanstack/react-router';
import {updateProfileSchema} from '@/lib/validation/customerListSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  useGetCustomerProfile,
  useGetProfile,
  useUpdateCustomerProfile,
  useUpdateProfile,
} from '@/lib/react-query/Admin/profile/profile';
import {useUpdateCustomer} from '@/lib/react-query/updateCustomer';
import toast from 'react-hot-toast';
import {InfoIcon, LockIcon} from 'lucide-react';

type formValues = z.infer<typeof updateProfileSchema>;
const CustomerUpdateProfile: React.FC = () => {
  const methods = useForm<formValues>({
    resolver: zodResolver(updateProfileSchema),
  });
  const navigate = useNavigate();
  const {user, customer} = useAuthContext();
  const [isBankAccNoDisabled, setIsBankAccNoDisabled] = useState(true);
  const {data: profileData} = useGetCustomerProfile();

  // Check if bank account number exists and disable field if it does
  useEffect(() => {
    if (profileData?.bankAccNo) {
      setIsBankAccNoDisabled(true);
    } else {
      setIsBankAccNoDisabled(false);
    }
  }, [profileData]);

  useMemo(() => {
    if (user) {
      methods.reset({
        sponsorId: user?.sponsorId ?? '',
        crn: user?.crnNo ?? '',
      });
    }
  }, [user]);

  const crn = user?.crnNo;
  const {mutateAsync: updateProfile, isSuccess} = useUpdateCustomerProfile();

  useEffect(() => {
    if (profileData) {
      methods.reset({
        phoneNumber: profileData?.phoneNumber ?? '',
        email: profileData?.email ?? '',
        fullname: profileData?.fullname ?? '',
        gender: profileData?.gender ?? undefined,
        dob: profileData?.dob ? profileData.dob.split('T')[0] : '',
        pinCode: profileData?.pinCode ?? '',
        city: profileData?.city ?? '',
        state: profileData?.state ?? '',
        aadharNo: profileData?.aadharNo ?? '',
        panNo: profileData?.panNo ?? '',
        landMark: profileData?.landMark ?? '',
        flatNo: profileData?.flatNo ?? '',
        areaName: profileData?.areaName ?? '',
        bankName: profileData?.bankName ?? '',
        bankAccNo: profileData?.bankAccNo ?? '',
        bankIFSC: profileData?.bankIFSC ?? '',
        bankBranch: profileData?.bankBranch ?? '',
        password: profileData?.password ?? '',
      });
    }
  }, [profileData]);

  const onSubmit = (data: formValues) => {
    // Filter out empty values
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== '' && value !== undefined,
      ),
    );

    // Prepare user data
    const userData: Record<string, any> = {};
    if (filteredData.fullname) userData.fullname = filteredData.fullname;
    if (filteredData.phoneNumber)
      userData.phoneNumber = filteredData.phoneNumber;
    if (filteredData.email) userData.email = filteredData.email;
    if (filteredData.password) userData.password = filteredData.password;

    // Prepare customer data
    const customerData: Record<string, any> = {};
    if (filteredData.aadharNo) customerData.aadharNo = filteredData.aadharNo;
    if (filteredData.bankAccNo) customerData.bankAccNo = filteredData.bankAccNo;
    if (filteredData.bankBranch)
      customerData.bankBranch = filteredData.bankBranch;
    if (filteredData.bankIFSC) customerData.bankIFSC = filteredData.bankIFSC;
    if (filteredData.bankName) customerData.bankName = filteredData.bankName;
    if (filteredData.areaName) customerData.areaName = filteredData.areaName;
    if (filteredData.city) customerData.city = filteredData.city;
    if (filteredData.dob)
      customerData.dob = new Date(filteredData.dob).toISOString();
    if (filteredData.flatNo) customerData.flatNo = filteredData.flatNo;
    if (filteredData.gender) customerData.gender = filteredData.gender;
    if (filteredData.panNo)
      customerData.panNo = filteredData.panNo.toUpperCase().trim();
    if (filteredData.landMark) customerData.landMark = filteredData.landMark;
    if (filteredData.pinCode) customerData.pinCode = filteredData.pinCode;
    if (filteredData.state) customerData.state = filteredData.state;

    // Only send request if there's data to update
    if (
      Object.keys(userData).length > 0 ||
      Object.keys(customerData).length > 0
    ) {
      updateProfile({
        ...(Object.keys(userData).length > 0 && {user: userData}),
        ...(Object.keys(customerData).length > 0 && {customer: customerData}),
      });
    } else {
      toast.error('Please fill at least one field to update');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Profile updated successfully');
      navigate({to: '/customer/dashboard'});
    }
  }, [isSuccess, navigate]);

  const error = (error: any) => {
    console.log('form error', error);
  };

  return (
    <div className="space-y-4 bg-white p-6 dark:bg-black">
      <h1 className="mb-4 text-lg font-semibold">Update Profile </h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit, error)}>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <GenericInputField
                name="sponsorId"
                label="Sponsor ID"
                placeholder="your sponsor ID"
                disabled
              />
            </div>
            <div className="col-span-6">
              <GenericInputField
                name="crn"
                label="Your CRN No"
                placeholder="your CRN No"
                disabled
              />
            </div>

            {/* 🧍 Personal Info */}
            <h2 className="col-span-12 mt-6 border-b pb-2 text-lg font-semibold">
              Personal Info
            </h2>
            <div className="col-span-6">
              <GenericInputField
                name="fullname"
                label="Full Name"
                placeholder="Enter your full name"
              />
            </div>
            <div className="col-span-6">
              <GenericDropdown
                label="Gender"
                name="gender"
                options={[
                  {label: 'Male', value: 'MALE'},
                  {label: 'Female', value: 'FEMALE'},
                  {label: 'Other', value: 'OTHER'},
                ]}
              />
            </div>
            <div className="col-span-6">
              <GenericInputField
                type="date"
                name="dob"
                label="Date of Birth"
                placeholder="Select your date of birth"
              />
            </div>

            {/* ☎️ Contact Info */}
            <h2 className="col-span-12 mt-6 border-b pb-2 text-lg font-semibold">
              Contact Info
            </h2>
            <div className="col-span-6">
              <GenericInputField
                name="phoneNumber"
                label="Phone Number"
                placeholder="Enter your mobile number"
              />
            </div>
            <div className="col-span-6">
              <GenericInputField
                name="email"
                label="Email"
                placeholder="Enter your email"
              />
            </div>

            {/* 🏠 Address Details */}
            <h2 className="col-span-12 mt-6 border-b pb-2 text-lg font-semibold">
              Address Details
            </h2>
            <div className="col-span-6">
              <GenericInputField
                name="flatNo"
                label="Flat Number"
                placeholder="e.g. B-203"
              />
            </div>
            <div className="col-span-6">
              <GenericInputField
                name="landMark"
                label="Landmark"
                placeholder="e.g. Near City Mall"
              />
            </div>
            <div className="col-span-6">
              <GenericInputField
                name="areaName"
                label="Area Name"
                placeholder="e.g. Shivaji Nagar"
              />
            </div>
            <div className="col-span-6">
              <GenericInputField
                name="city"
                label="City"
                placeholder="Enter your city"
              />
            </div>
            <div className="col-span-6">
              <GenericInputField
                name="state"
                label="State"
                placeholder="Enter your state"
              />
            </div>
            <div className="col-span-6">
              <GenericInputField
                name="pinCode"
                label="PIN Code"
                placeholder="e.g. 411001"
              />
            </div>

            {/* 🪪 Identity Proofs */}
            <h2 className="col-span-12 mt-6 border-b pb-2 text-lg font-semibold">
              Identity Documents
            </h2>
            <div className="col-span-6">
              <GenericInputField
                name="aadharNo"
                label="Aadhar Number"
                placeholder="Enter your 12-digit Aadhar number"
              />
            </div>
            <div className="col-span-6">
              <GenericInputField
                name="panNo"
                label="PAN Number"
                placeholder="e.g. ABCDE1234F"
              />
            </div>

            {/* 🏦 Bank Details */}
            <h2 className="col-span-12 mt-6 border-b pb-2 text-lg font-semibold">
              Bank Details
            </h2>
            <div className="col-span-6">
              <GenericInputField
                name="bankName"
                label="Bank Name"
                placeholder="e.g. HDFC Bank"
              />
            </div>
            <div className="relative col-span-6">
              <GenericInputField
                name="bankAccNo"
                label="Account Number"
                placeholder="Enter your bank account number"
                disabled={isBankAccNoDisabled}
              />
              {isBankAccNoDisabled && (
                <div className="mt-1 flex items-center text-xs text-amber-600 dark:text-amber-400">
                  <LockIcon size={12} className="mr-1" />
                  <span>Account number cannot be changed once set</span>
                </div>
              )}
            </div>
            <div className="col-span-6">
              <GenericInputField
                name="bankIFSC"
                label="IFSC Code"
                placeholder="e.g. HDFC0000123"
              />
            </div>
            <div className="col-span-6">
              <GenericInputField
                name="bankBranch"
                label="Branch Name"
                placeholder="e.g. FC Road Branch"
              />
            </div>

            {/* 🔐 Login Info */}
            <h2 className="col-span-12 mt-6 border-b pb-2 text-lg font-semibold">
              Login Info
            </h2>
            <div className="col-span-6">
              <GenericInputField
                type="password"
                name="password"
                label="Password"
                placeholder="Enter new password (optional)"
              />
            </div>
          </div>

          <div className="flex justify-end py-6">
            <GenericButton type="submit">Save</GenericButton>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CustomerUpdateProfile;
