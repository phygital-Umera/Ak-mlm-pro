/* eslint-disable */
import {zodResolver} from '@hookform/resolvers/zod';
import {useMatch, useNavigate} from '@tanstack/react-router';
import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import toast from 'react-hot-toast';
import {z} from 'zod';
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import {useAuthContext} from '@/context/AuthContext';
import {useRegistration} from '@/context/RegisterContext';
import {useCheckEpin} from '@/lib/react-query/Admin/Epin/epin';
import {useGetAllProducts} from '@/lib/react-query/Admin/Product/products';
import {useCustomerRegistration} from '@/lib/react-query/Auth/auth';
import {externalRegistrationSchema} from '@/lib/validation/externalRegistratioinSchema';
import {
  ArrowRightIcon,
  KeyIcon,
  LockIcon,
  UserIcon,
  UsersIcon,
} from 'lucide-react';
import GenericDropdown from '../Forms/DropDown/GenericDropDown';
import {unAuthenticatedApi} from '@/utils/axios';
import {Route} from '@/routes/_registration/register/$name/$crnno/$id';

type FormValues = z.infer<typeof externalRegistrationSchema>;

type Product = {
  id: string;
  name: string;
  description: string;
  images: string;
  discountedPrice: number;
  actualPrice: number;
};

const RegistrationForm: React.FC = () => {
  const {params} = useMatch(
    '/_registration/register/$name/$crnno/$id' as any,
  ) as {
    params: {
      crnno: string;
      name: string;
      id: string;
    };
  };

  const methods = useForm<FormValues>({
    resolver: zodResolver(externalRegistrationSchema),
    mode: 'onChange',
    defaultValues: {
      sponsorId: params.crnno || '',
      side: params.id || '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      epinNo: '',
      password: '',
      confirmPassword: '',
      epinType: 'later',
      products: [],
    },
  });
  const [sponsorError, setSponsorError] = useState('');

  const [selectedProducts, setSelectedProducts] = useState<
    Record<string, number>
  >({});
  const [sponcerIDName, setSponcerIDName] = useState<string>('ENTER NAME');
  const [useWithoutEpin, setUseWithoutEpin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const {setSelectProduct} = useRegistration();
  const {data: products} = useGetAllProducts();
  const epinType = methods.watch('epinType');
  // methods.setValue('side', params?.id);

  const {user} = useAuthContext();
  const role = user?.role;
  const navigate = useNavigate();

  const {
    mutate: registerAdmin,
    isPending,
    isSuccess,
    data,
    isError,
    error,
  } = useCustomerRegistration();

  const {
    mutateAsync: checkEpin,
    data: checkEpinData,
    isPending: isCheckingEpin,
  } = useCheckEpin();

  const verifyEpin = () => {
    checkEpin(methods.getValues('epinNo'));
    setUseWithoutEpin(false);
  };

  const filteredProducts = products?.filter(
    (product) => product.discountedPrice === checkEpinData,
  );

  console.log('filteredProducts', filteredProducts);
  const getTotalSelectedCount = () =>
    Object.values(selectedProducts).reduce((a, b) => a + b, 0);

  const handleCardClick = (productId: string) => {
    const count = selectedProducts[productId] || 0;
    if (count < 1 && getTotalSelectedCount() < 1) {
      setSelectedProducts((prev) => ({...prev, [productId]: count + 1}));
    }
  };
  const sponcerValidate = async (CRN: string) => {
    console.log('CRN', CRN);
    if (CRN.length > 8) {
      try {
        const response = await unAuthenticatedApi.get(`/customerName/${CRN}`);
        setSponcerIDName(response.data.data);
        // console.log(response)
      } catch (error) {
        setSponcerIDName('Invalid ID');
      }
    }
  };

  const onSubmit = (formValues: FormValues) => {
    console.log('formValues', formValues);
    let selected = [];

    if (!useWithoutEpin) {
      selected = Object.entries(selectedProducts).map(([id, quantity]) => ({
        productId: id,
        quantity,
      }));
      setSelectProduct({products: selected});
    } else {
      setSelectProduct({products: []});
    }

    const payload: any = {
      sponsorId: formValues.sponsorId,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email || undefined,
      phone: formValues.phone || undefined,
      password: formValues.password,
      confirmPassword: formValues.confirmPassword,
      side: formValues.side,
      epinNo: useWithoutEpin ? undefined : formValues.epinNo,
      productId: useWithoutEpin ? '' : selected[0]?.productId,
    };

    if (!useWithoutEpin) {
      payload.epinNo = formValues.epinNo;
      payload.productId = selected[0]?.productId;
    }

    registerAdmin(payload);
    console.log('payload', payload);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Registered successfully');
      if (data) {
        setShowPopup(true);
      }
    } else if (isError) {
      toast.error(error?.message || 'Registration failed');
    }
  }, [isSuccess, isError, navigate, role]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="bg-gray-100 flex min-h-screen items-center justify-center bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://d18x2uyjeekruj.cloudfront.net/wp-content/uploads/2023/06/nps.jpg)',
        }}
      >
        <div className="m-4 w-full max-w-2xl rounded-lg bg-[#F6F8FA] p-6 shadow-lg">
          {/* Sponsor Info */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
            <h1 className="col-span-12 mb-4 text-lg font-semibold">
              Sponsor Info
            </h1>
            <p className="col-span-12 text-lg font-semibold">
              Name: {sponcerIDName}
            </p>
            <div className="col-span-12 md:col-span-6">
              <GenericInputField
                name="sponsorId"
                label="Sponsor Code"
                placeholder="Enter Sponsor ID"
                onChange={(e) => {
                  // console.log(e);
                  // methods.setValue('sponsorId', e.target.value);
                  // methods.setValue('sponsorId', e.target.value);
                  sponcerValidate(e);
                }}
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <GenericDropdown
                name="side"
                label="Side"
                options={[
                  {value: 'LEFT', label: 'LEFT'},
                  {value: 'RIGHT', label: 'RIGHT'},
                ]}
              />
            </div>
            {/* {!useWithoutEpin && (
              <div className="col-span-12 md:col-span-6">
                <GenericInputField name="epinNo" label="E-Pin" />
              </div>
            )} */}
          </div>

          {/* Verify and Without Epin Buttons */}
          {/* {!useWithoutEpin && (
            <div className="mt-2 flex items-center gap-4">
              <GenericButton type="button" onClick={verifyEpin}>
                Verify Epin
              </GenericButton>

              <GenericButton
                type="button"
                onClick={() => {
                  setUseWithoutEpin(true);
                  setSelectedProducts({});
                  methods.setValue('epinNo', '');
                }}
              >
                Without Epin
              </GenericButton>
            </div>
          )} */}

          {/* Product Selection */}
          {/* {!useWithoutEpin && (
            <>
              <h1 className="text-gray-800 mb-6 mt-2 text-xl font-bold dark:text-white">
                Select 1 Product{' '}
                <span className="text-sm font-normal">(Tap to add/remove)</span>
              </h1>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.isArray(filteredProducts) &&
                  filteredProducts?.map((product: Product) => {
                    const count = selectedProducts[product.id] || 0;

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
                              Save ₹
                              {product.actualPrice - product.discountedPrice}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </>
          )} */}

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
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
            <h1 className="col-span-12 mb-4 text-lg font-semibold">
              Login Info
            </h1>
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
          </div>

          {/* Submit */}
          <div className="mt-2 flex justify-end space-x-4">
            <GenericButton type="submit" disabled={isPending}>
              {isPending ? 'Submitting...' : 'Submit'}
            </GenericButton>
          </div>
        </div>
      </form>

      {showPopup && data?.crnNo && data?.password && (
        <div className="bg-gray-900/70 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md transition-opacity duration-300 ease-out">
          <div className="mx-4 w-full max-w-md scale-[0.98] transform rounded-xl bg-white p-0 shadow-2xl transition-all duration-300 hover:scale-100">
            {/* Header with gradient */}
            <div
              className={`bg-gradient-to-r ${data.purchasedProduct ? 'from-blue-600 to-indigo-700' : 'from-blue-500 to-blue-600'} rounded-t-xl px-6 py-5`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    {data.purchasedProduct ? (
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    ) : (
                      <path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a7 7 0 017-7h0a7 7 0 017 7v6a3 3 0 01-3 3H8a3 3 0 01-3-3v-6z" />
                    )}
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {data.purchasedProduct
                      ? 'Registration Complete'
                      : 'Free Registration'}
                  </h2>
                  <p className="mt-0.5 text-sm text-blue-100/90">
                    {data.purchasedProduct
                      ? 'Your account is ready to use'
                      : 'You now have free access'}
                  </p>
                </div>
              </div>
            </div>

            {/* Data grid */}
            <div className="grid grid-cols-[max-content,1fr] gap-x-5 gap-y-4 px-6 py-5">
              <div className="text-gray-500 flex items-center font-medium">
                <UserIcon className="mr-2 h-4 w-4 opacity-70" /> Name:
              </div>
              <div className="text-gray-800 bg-gray-50 rounded-lg px-3 py-2 text-sm">
                {data.fullname}
              </div>
              <div className="text-gray-500 flex items-center font-medium">
                <KeyIcon className="mr-2 h-4 w-4 opacity-70" /> User ID:
              </div>
              <div className="font-mono text-gray-800 bg-gray-50 truncate rounded-lg px-3 py-2 text-sm">
                {data.crnNo}
              </div>

              <div className="text-gray-500 flex items-center font-medium">
                <LockIcon className="mr-2 h-4 w-4 opacity-70" /> Password:
              </div>
              <div className="font-mono text-gray-800 bg-gray-50 truncate rounded-lg px-3 py-2 text-sm">
                {data.password}
              </div>

              <div className="text-gray-500 flex items-center font-medium">
                <UsersIcon className="mr-2 h-4 w-4 opacity-70" /> Sponsor:
              </div>
              <div className="text-gray-800 bg-gray-50 rounded-lg px-3 py-2 text-sm">
                {data.sponsorId}
              </div>
            </div>

            {data.purchasedProduct && (
              <div className="border-t px-6 py-5">
                <h3 className="text-gray-600 mb-3 text-sm font-semibold">
                  Purchased Product
                </h3>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <img
                    src={data.purchasedProduct.images}
                    alt={data.purchasedProduct.name}
                    className="h-24 w-24 rounded-lg border object-cover"
                  />
                  <div className="flex-1 space-y-1 text-sm">
                    <div className="text-gray-800 font-semibold">
                      {data.purchasedProduct.name}
                    </div>

                    <div className="text-gray-600">
                      Price: ₹{data.purchasedProduct.discountedPrice}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action section */}
            <div className="px-6 pb-5">
              <button
                onClick={() => setShowPopup(false)}
                className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-3 font-medium text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-lg"
              >
                Continue
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </FormProvider>
  );
};
export default RegistrationForm;
