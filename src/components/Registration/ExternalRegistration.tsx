// /* eslint-disable */
// import React, {useEffect, useState} from 'react';
// import {FormProvider, useForm} from 'react-hook-form';
// import {zodResolver} from '@hookform/resolvers/zod';
// import toast from 'react-hot-toast';
// import {z} from 'zod';
// import {Navigate, useMatch, useNavigate} from '@tanstack/react-router';

// import GenericButton from '@/components/Forms/Buttons/GenericButton';
// import GenericInputField from '@/components/Forms/Input/GenericInputField';
// import GenericSearchDropdown from '../Forms/SearchDropDown/GenericSearchDropdown';
// import {useAuthContext} from '@/context/AuthContext';
// import {useRegistration} from '@/context/RegisterContext';
// import {useCustomerRegistration} from '@/lib/react-query/Auth/auth';
// import {externalRegistrationSchema} from '@/lib/validation/externalRegistratioinSchema';
// import {useGetAllProducts} from '@/lib/react-query/Admin/Product/products';

// type FormValues = z.infer<typeof externalRegistrationSchema>;

// type Product = {
//   id: string;
//   name: string;
//   description: string;
//   images: string;
//   discountedPrice: number;
//   actualPrice: number;
// };

// export const ExternalRegistration: React.FC = () => {
//   const {params} = useMatch(
//     '/_registration/register/$name/$crnno/$sponsorid/$side' as any,
//   ) as {
//     params: {crnno: string; name: string; sponsorid: string; side: 'A' | 'B' | 'C'};
//   };

//   const methods = useForm<FormValues>({
//     resolver: zodResolver(externalRegistrationSchema),
//     defaultValues: {
//       sponsorId: params.sponsorid || '',
//       directSponsorId: params.crnno || '',
//       side: params.side || 'A',
//       firstName: '',
//       lastName: '',
//       email: '',
//       phone: '',
//       epinNo: '',
//       password: '',
//       confirmPassword: '',
//       epinType: 'later',
//       products: [],
//     },
//   });

//   const [selectedProducts, setSelectedProducts] = useState<
//     Record<string, number>
//   >({});
//   const {setSelectProduct} = useRegistration();
//   const {data: products} = useGetAllProducts();
//   const epinType = methods.watch('epinType');

//   const {user} = useAuthContext();
//   const role = user?.role;
//   const navigate = useNavigate();

//   const {
//     mutate: registerAdmin,
//     isPending,
//     isSuccess,
//     isError,
//   } = useCustomerRegistration();

//   const getTotalSelectedCount = () =>
//     Object.values(selectedProducts).reduce((a, b) => a + b, 0);

//   const handleCardClick = (productId: string) => {
//     const count = selectedProducts[productId] || 0;
//     if (count < 3 && getTotalSelectedCount() < 3) {
//       setSelectedProducts((prev) => ({...prev, [productId]: count + 1}));
//     }
//     console.log("selectedProducts",selectedProducts);
//   };

//   const getTotalPrice = () => {
//     console.log(products);
//     if (!products || !Array.isArray(products)) return ;
//     return Object.entries(selectedProducts).reduce((total, [id, count]) => {
//       const product = products?.find((product) => product.id === id);
//       return total + (product ? product.discountedPrice * count : 0);
//     }, 0);
//   };
//   const onSubmit = (formValues: FormValues) => {
//     const selected = Object.entries(selectedProducts).map(([id, quantity]) => ({
//       productId: id,
//       quantity,
//     }));
//     console.log("formValues",formValues);

//     const payload = {
//       ...formValues,
//       sponsorId: formValues.sponsorId || params.sponsorid,
//       directSponsorId: params.crnno,
//       side: params.side,
//       products: selected || [],
//     };

//     setSelectProduct({products: selected || []});
//     registerAdmin(payload);
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success('Registered successfully');
//       navigate({to: role === 'ADMIN' ? '/dashboard' : '/customer/dashboard'});
//     } else if (isError) {
//       toast.error('Registration failed');
//     }
//   }, [isSuccess, isError, navigate, role]);

//   return (
//     <FormProvider {...methods}>
//       <form
//         onSubmit={methods.handleSubmit(onSubmit)}
//         className="space-y-8 bg-white p-8 dark:bg-black"
//       >
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
//           <h1 className="col-span-12 mb-4 text-lg font-semibold">
//             Sponsor Info
//           </h1>
//           <p className="col-span-12 text-lg font-semibold">
//             Name: &nbsp;{params.name.replace('_', ' ')}
//           </p>
//           <div className="col-span-12 md:col-span-6">
//             <GenericInputField name="sponsorId" label="Sponsor ID" disabled />
//           </div>
//           <div className="col-span-12 md:col-span-6">
//             <GenericInputField
//               name="directSponsorId"
//               label="Direct Sponsor ID"
//               disabled
//             />
//           </div>
//           <div className="col-span-12 md:col-span-6">
//             <GenericInputField name="side" label="Side" disabled />
//           </div>
//         </div>

//         <h1 className="text-gray-800 mb-6 text-xl font-bold dark:text-white">
//           Select up to 3 Products{' '}
//           <span className="text-sm font-normal">(Tap to add/remove)</span>
//         </h1>

//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {Array.isArray(products) &&
//             products.map((product: Product) => {
//               const count = selectedProducts[product.id] || 0;
//               const canAddMore = count < 3 && getTotalSelectedCount() < 3;

//               return (
//                 <div
//                   key={product.id}
//                   onClick={() => handleCardClick(product.id)}
//                   className={`relative cursor-pointer overflow-hidden rounded-2xl border bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-white shadow-lg transition-all duration-300 hover:shadow-xl dark:from-blue-500 dark:to-blue-700 ${
//                     count > 0
//                       ? 'border-blue-500 ring-1 ring-blue-300 dark:ring-blue-500'
//                       : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500'
//                   } dark:bg-gray-800 bg-white`}
//                 >
//                   {/* Selection badge */}
//                   {count > 0 && (
//                     <div className="absolute right-3 top-3 rounded-full bg-blue-500 px-2 py-1 text-xs font-bold text-white">
//                       {count} selected
//                     </div>
//                   )}

//                   <div className="space-y-4">
//                     <div className="flex items-start justify-between">
//                       <h2 className="text-gray-900 text-xl font-bold dark:text-white">
//                         {product.name}
//                       </h2>
//                     </div>

//                     <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
//                       {product.description}
//                     </p>

//                     <div className="mt-3 flex items-center gap-2">
//                       <span className="text-2xl font-bold text-green-400 dark:text-blue-400">
//                         ₹{product.discountedPrice}
//                       </span>
//                       <span className="text-gray-400 dark:text-gray-500 text-base line-through">
//                         ₹{product.actualPrice}
//                       </span>
//                       <span className="ml-auto rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
//                         Save ₹{product.actualPrice - product.discountedPrice}
//                       </span>
//                     </div>

//                     <div className="border-gray-100 dark:border-gray-700 flex items-center justify-between border-t pt-3">
//                       <div className="text-gray-700 dark:text-gray-300 text-sm font-medium">
//                         <span
//                           className={
//                             count > 0 ? 'font-bold text-green-500' : ''
//                           }
//                         >
//                           {count} in cart
//                         </span>
//                       </div>
//                       <div className="flex gap-2">
//                         <button
//                           type="button"
//                           className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 transition-colors duration-200 hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-40"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setSelectedProducts((prev) => {
//                               const current = prev[product.id] || 0;
//                               const updated = {
//                                 ...prev,
//                                 [product.id]: current - 1,
//                               };
//                               if (updated[product.id] <= 0)
//                                 delete updated[product.id];
//                               return updated;
//                             });
//                           }}
//                           disabled={count === 0}
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-5 w-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         </button>
//                         <button
//                           type="button"
//                           className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-colors duration-200 hover:bg-blue-200 disabled:cursor-not-allowed disabled:opacity-40"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             if (canAddMore) {
//                               setSelectedProducts((prev) => ({
//                                 ...prev,
//                                 [product.id]: count + 1,
//                               }));
//                             }
//                           }}
//                           disabled={!canAddMore}
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-5 w-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//         </div>

//         <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
//           <h1 className="col-span-12 mb-4 text-lg font-semibold">
//             Contact Info
//           </h1>
//           <div className="col-span-12 md:col-span-6">
//             <GenericInputField
//               name="firstName"
//               label="First Name"
//               placeholder="Enter First Name"
//             />
//           </div>
//           <div className="col-span-12 md:col-span-6">
//             <GenericInputField
//               name="lastName"
//               label="Last Name"
//               placeholder="Enter Last Name"
//             />
//           </div>
//           <div className="col-span-12 md:col-span-6">
//             <GenericInputField
//               name="email"
//               label="Email"
//               placeholder="Enter Email"
//             />
//           </div>
//           <div className="col-span-12 md:col-span-6">
//             <GenericInputField
//               name="phone"
//               label="Mobile"
//               placeholder="Enter Phone No"
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
//           <h1 className="col-span-12 mb-4 text-lg font-semibold">Login Info</h1>
//           <div className="col-span-12 md:col-span-6">
//             <GenericInputField
//               name="password"
//               label="Password"
//               placeholder="Enter Password"
//             />
//           </div>
//           <div className="col-span-12 md:col-span-6">
//             <GenericInputField
//               name="confirmPassword"
//               label="Confirm Password"
//               placeholder="Enter Confirm Password"
//             />
//           </div>
//           <div className="col-span-12 md:col-span-6">
//             <GenericSearchDropdown
//               name="epinType"
//               label="E-Pin Option"
//               options={[
//                 {value: 'later', label: 'Active later'},
//                 {value: 'e-pin', label: 'With E-pin'},
//                 {value: 'online', label: 'Online'},
//               ]}
//             />
//           </div>
//           {epinType === 'e-pin' && (
//             <div className="col-span-12 md:col-span-6">
//               <GenericInputField
//                 name="epinNo"
//                 label="E-Pin Number"
//                 placeholder="Enter E-Pin Number"
//               />
//             </div>
//           )}
//         </div>
//         <div className="text-gray-900 text-lg font-semibold dark:text-white">
//           Total Price: ₹{getTotalPrice()}
//         </div>
//         <div className="flex justify-end space-x-4">
//           <GenericButton type="submit" disabled={isPending}>
//             {isPending ? 'Submitting...' : 'Submit'}
//           </GenericButton>
//         </div>
//       </form>
//     </FormProvider>
//   );
// };
/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import {z} from 'zod';
import {useMatch, useNavigate} from '@tanstack/react-router';

import GenericButton from '@/components/Forms/Buttons/GenericButton';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import GenericSearchDropdown from '../Forms/SearchDropDown/GenericSearchDropdown';
import {useAuthContext} from '@/context/AuthContext';
import {useRegistration} from '@/context/RegisterContext';
import {useCustomerRegistration} from '@/lib/react-query/Auth/auth';
import {externalRegistrationSchema} from '@/lib/validation/externalRegistratioinSchema';
import {useGetAllProducts} from '@/lib/react-query/Admin/Product/products';

type FormValues = z.infer<typeof externalRegistrationSchema>;

type Product = {
  id: string;
  name: string;
  description: string;
  images: string;
  discountedPrice: number;
  actualPrice: number;
};

export const ExternalRegistration: React.FC = () => {
  const {params} = useMatch(
    '/_registration/register/$name/$crnno/$sponsorid/$side' as any,
  ) as {
    params: {
      crnno: string;
      name: string;
      sponsorid: string;
      side: 'A' | 'B' | 'C';
    };
  };

  const methods = useForm<FormValues>({
    resolver: zodResolver(externalRegistrationSchema),
    defaultValues: {
      sponsorId: params.sponsorid || '',
      directSponsorId: params.crnno || '',
      side: params.side || 'A',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      epinNo: '',
      password: '',
      confirmPassword: '',
      epinType: 'later',
      products: [], // ✅ added for Zod compatibility
    },
  });

  const [selectedProducts, setSelectedProducts] = useState<
    Record<string, number>
  >({});
  const {setSelectProduct} = useRegistration();
  const {data: products} = useGetAllProducts();
  const epinType = methods.watch('epinType');

  const {user} = useAuthContext();
  const role = user?.role;
  const navigate = useNavigate();

  const {
    mutate: registerAdmin,
    isPending,
    isSuccess,
    isError,
  } = useCustomerRegistration();

  const getTotalSelectedCount = () =>
    Object.values(selectedProducts).reduce((a, b) => a + b, 0);

  const handleCardClick = (productId: string) => {
    const count = selectedProducts[productId] || 0;
    if (count < 3 && getTotalSelectedCount() < 3) {
      setSelectedProducts((prev) => ({...prev, [productId]: count + 1}));
    }
  };

  const getTotalPrice = () => {
    if (!products || !Array.isArray(products)) return 0;
    return Object.entries(selectedProducts).reduce((total, [id, count]) => {
      const product = products.find((p) => p.id === id);
      return total + (product ? product.discountedPrice * count : 0);
    }, 0);
  };

  const onSubmit = (formValues: FormValues) => {
    const selected = Object.entries(selectedProducts).map(([id, quantity]) => ({
      productId: id,
      quantity,
    }));

    // ✅ set form field value to satisfy Zod validation
    methods.setValue('products', selected);

    const payload = {
      ...formValues,
      sponsorId: formValues.sponsorId || params.sponsorid,
      directSponsorId: params.crnno,
      side: params.side,
      products: selected,
    };

    setSelectProduct({products: selected});
    registerAdmin(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Registered successfully');
      navigate({to: role === 'ADMIN' ? '/dashboard' : '/customer/dashboard'});
    } else if (isError) {
      toast.error('Registration failed');
    }
  }, [isSuccess, isError, navigate, role]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 dark:bg-black"
      >
        {/* Sponsor Info */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <h1 className="col-span-12 mb-4 text-lg font-semibold">
            Sponsor Info
          </h1>
          <p className="col-span-12 text-lg font-semibold">
            Name: &nbsp;{params.name.replace('_', ' ')}
          </p>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField name="sponsorId" label="Sponsor ID" disabled />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="directSponsorId"
              label="Direct Sponsor ID"
              disabled
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField name="side" label="Side" disabled />
          </div>
        </div>

        {/* Product Selection */}
        <h1 className="text-gray-800 mb-6 text-xl font-bold dark:text-white">
          Select up to 3 Products{' '}
          <span className="text-sm font-normal">(Tap to add/remove)</span>
        </h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(products) &&
            products.map((product: Product) => {
              const count = selectedProducts[product.id] || 0;
              const canAddMore = count < 3 && getTotalSelectedCount() < 3;

              return (
                <div
                  key={product.id}
                  onClick={() => handleCardClick(product.id)}
                  className={`relative cursor-pointer overflow-hidden rounded-2xl border bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-white shadow-lg transition-all duration-300 hover:shadow-xl ${
                    count > 0
                      ? 'border-blue-500 ring-1 ring-blue-300 dark:ring-blue-500'
                      : 'border-gray-200 hover:border-blue-300'
                  } dark:bg-gray-800`}
                >
                  {count > 0 && (
                    <div className="absolute right-3 top-3 rounded-full bg-blue-500 px-2 py-1 text-xs font-bold text-white">
                      {count} selected
                    </div>
                  )}
                  <div className="space-y-4">
                    <h2 className="text-gray-900 text-xl font-bold dark:text-white">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {product.description}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-2xl font-bold text-green-400">
                        ₹{product.discountedPrice}
                      </span>
                      <span className="text-gray-400 text-base line-through">
                        ₹{product.actualPrice}
                      </span>
                      <span className="ml-auto rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                        Save ₹{product.actualPrice - product.discountedPrice}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-t pt-3">
                      <span
                        className={`text-sm font-medium ${count > 0 ? 'text-green-500' : ''}`}
                      >
                        {count} in cart
                      </span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="h-10 w-10 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProducts((prev) => {
                              const current = prev[product.id] || 0;
                              const updated = {
                                ...prev,
                                [product.id]: current - 1,
                              };
                              if (updated[product.id] <= 0)
                                delete updated[product.id];
                              return updated;
                            });
                          }}
                          disabled={count === 0}
                        >
                          −
                        </button>
                        <button
                          type="button"
                          className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (canAddMore) {
                              setSelectedProducts((prev) => ({
                                ...prev,
                                [product.id]: count + 1,
                              }));
                            }
                          }}
                          disabled={!canAddMore}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Contact Info */}
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
        </div>

        {/* Login Info */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <h1 className="col-span-12 mb-4 text-lg font-semibold">Login Info</h1>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="password"
              label="Password"
              placeholder="Enter Password"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Enter Confirm Password"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GenericSearchDropdown
              name="epinType"
              label="E-Pin Option"
              options={[
                {value: 'later', label: 'Active later'},
                {value: 'e-pin', label: 'With E-pin'},
                {value: 'online', label: 'Online'},
              ]}
            />
          </div>
          {epinType === 'e-pin' && (
            <div className="col-span-12 md:col-span-6">
              <GenericInputField
                name="epinNo"
                label="E-Pin Number"
                placeholder="Enter E-Pin Number"
              />
            </div>
          )}
        </div>

        {/* Price + Submit */}
        <div className="text-gray-900 text-lg font-semibold dark:text-white">
          Total Price: ₹{getTotalPrice()}
        </div>
        <div className="flex justify-end space-x-4">
          <GenericButton type="submit" disabled={isPending}>
            {isPending ? 'Submitting...' : 'Submit'}
          </GenericButton>
        </div>
      </form>
    </FormProvider>
  );
};
