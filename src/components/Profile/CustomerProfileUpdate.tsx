/*eslint-disable*/
import {useEffect, useMemo} from 'react';
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

type formValues = z.infer<typeof updateProfileSchema>;
const CustomerUpdateProfile: React.FC = () => {
  const methods = useForm<formValues>({
    resolver: zodResolver(updateProfileSchema),
  });
  const navigate = useNavigate();

  const {user, customer} = useAuthContext();
  // console.log('====================================');
  console.log('............sdsdssd', user);
  // console.log('====================================');

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
  const {data: profileData} = useGetCustomerProfile();

  // console.log('profileee', profileData);
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
        // upiId: profileData?.upiId ?? '',
        landMark: profileData?.landMark ?? '',
        flatNo: profileData?.flatNo ?? '',
        areaName: profileData?.areaName ?? '',
        bankName: profileData?.bankName ?? '',
        bankAccNo: profileData?.bankAccNo ?? '',
        bankIFSC: profileData?.bankIFSC ?? '',
        bankBranch: profileData?.bankBranch ?? '',
      });
    }
  }, [profileData]);

  const onSubmit = (data: formValues) => {
    updateProfile({
      user: {
        fullname: data.fullname,
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: data.password,
      },
      customer: {
        aadharNo: data.aadharNo,
        bankAccNo: data.bankAccNo,
        bankBranch: data.bankBranch,
        bankIFSC: data.bankIFSC,
        bankName: data.bankName,
        areaName: data.areaName,
        city: data.city,
        dob: data.dob ? new Date(data.dob).toISOString() : null,
        flatNo: data.flatNo,
        gender: data.gender,
        panNo: data.panNo?.toUpperCase().trim(),
        landMark: data.landMark,
        pinCode: data.pinCode,
        state: data.state,
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      // toast.success('Profile updated successfully');
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
            <div className="col-span-6">
              <GenericInputField
                name="bankAccNo"
                label="Account Number"
                placeholder="Enter your bank account number"
              />
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

// import React from 'react'

// const CustomerProfileUpdate = () => {
//   return (
//     <div>CustomerProfileUpdate</div>
//   )
// }

// export default CustomerProfileUpdate
