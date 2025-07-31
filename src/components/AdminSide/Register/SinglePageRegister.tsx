/* eslint-disable */
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import GenericSearchDropdown from '@/components/Forms/SearchDropDown/GenericSearchDropdown';
import {useAuthContext} from '@/context/AuthContext';
import {useGetAllProducts} from '@/lib/react-query/Admin/Product/products';
import {useCustomerRegistration} from '@/lib/react-query/Auth/auth';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigate} from '@tanstack/react-router';
import React, {useEffect, useState} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import toast from 'react-hot-toast';
import {z} from 'zod';
import {CustomerRegistrationPayload} from '@/types';
import {customerRegistrationSchema} from '@/lib/validation/singlepageregisterSchema';

type FormValues = z.infer<typeof customerRegistrationSchema>;

const SinglePageRegister = () => {
  const {user} = useAuthContext();
  const {data: products} = useGetAllProducts();

  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );

  const methods = useForm<FormValues>({
    resolver: zodResolver(customerRegistrationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: '',
      password: '',
      confirmPassword: '',
      sponsorId: '',
      crnNo: '',
      aadharNo: '',
      panNo: '',
      upiId: '',
      dob: '',
      pinCode: '',
      city: '',
      state: '',
      bankName: '',
      bankAccNo: '',
      bankIFSC: '',
      bankBranch: '',
      productId: '',
      epinNo: '',
      side: undefined,
    },
  });

  const {mutate: registerCustomer, isPending} = useCustomerRegistration();
  const navigate = useNavigate();

  const handleCardSelect = (productId: string) => {
    setSelectedProductId(productId);
    methods.setValue('productId', productId);
  };

  const onSubmit = (formData: FormValues) => {
    console.log('====================================');
    console.log('formData', formData);
    console.log('====================================');
    const payload: CustomerRegistrationPayload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      //   confirmPassword: formData.confirmPassword,
      phone: formData.phone,
      productId: formData.productId,
      dob: formData.dob,
      gender: formData.gender,
      pinCode: formData.pinCode,
      city: formData.city,
      state: formData.state,
      sponsorId: formData.crnNo,
      epinNo: formData.epinNo,
      side: formData.side,
      //   count: formData.count,
    };

    // if (formData.lastName) {
    //   payload.lastName = formData.lastName;
    // }
    if (formData.aadharNo) {
      payload.aadharNo = formData.aadharNo;
    }
    if (formData.panNo) {
      payload.panNo = formData.panNo;
    }
    if (formData.upiId) {
      payload.upiId = formData.upiId;
    }
    if (formData.bankName) {
      payload.bankName = formData.bankName;
    }
    if (formData.bankAccNo) {
      payload.bankAccNo = formData.bankAccNo;
    }
    if (formData.bankIFSC) {
      payload.bankIFSC = formData.bankIFSC;
    }
    if (formData.bankBranch) {
      payload.bankBranch = formData.bankBranch;
    }
    if (formData.flatNo) {
      payload.flatNo = formData.flatNo;
    }
    // if (formData.areaName) {
    //   payload.areaName = formData.areaName;
    // }
    // if (formData.landMark) {
    //   payload.landMark = formData.landMark;
    // }

    registerCustomer(payload as CustomerRegistrationPayload, {
      onSuccess: () => {
        toast.success('Customer Registered Successfully');
        // navigate({to: '/dashboard'});
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });
  };

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
              name="crnNo"
              label="CRN"
              placeholder="CRN"
              disabled
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="sponsorId"
              label="Your Sponsor ID"
              placeholder="Your Sponsor ID"
              disabled
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="availablePositions"
              label="Available Positions"
              placeholder="Available Positions"
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
              label="Full Name"
              placeholder="Enter Full Name"
            />
          </div>
          {/* <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="lastName"
              label="Last Name"
              placeholder="Enter Last Name"
            />
          </div> */}
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
              label="Mobile"
              placeholder="Enter Phone No"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="flatNo"
              label="Address"
              placeholder="Enter Address"
            />
          </div>
          {/* <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="areaName"
              label="Area/Street"
              placeholder="Enter Area/Street"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="landMark"
              label="Landmark"
              placeholder="Enter Landmark"
            />
          </div> */}
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
        <div className="space-y-8">
          <h1 className="mb-4 text-lg font-semibold">Select a Product</h1>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.isArray(products) &&
              products?.map((product) => (
                <div
                  key={product.id}
                  className={`hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer rounded-lg border p-4 shadow ${
                    selectedProductId === product.id
                      ? 'border-blue-500 dark:border-blue-500'
                      : 'border-gray-300 dark:border-gray-700'
                  }`}
                  onClick={() => handleCardSelect(product.id)}
                >
                  <img
                    src={product.images}
                    alt={product.name}
                    className="mb-4 h-40 w-full rounded-lg object-cover"
                  />
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {product.description}
                  </p>
                  <div className="text-gray-700 dark:text-gray-300 mt-2">
                    <span className="text-xl font-bold">
                      ₹{product.discountedPrice}
                    </span>{' '}
                    <span className="text-gray-400 dark:text-gray-600 text-sm line-through">
                      ₹{product.actualPrice}
                    </span>
                  </div>
                </div>
              ))}
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
              placeholder="Confirm Password"
              type="password"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="epinNo"
              label="E-Pin"
              placeholder="Enter E-Pin"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <GenericButton type="submit">
            {isPending ? 'Registering...' : 'Register'}
          </GenericButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default SinglePageRegister;
