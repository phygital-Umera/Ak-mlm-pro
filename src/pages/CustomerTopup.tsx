/* eslint-disable */
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import {useCheckEpin} from '@/lib/react-query/Admin/Epin/epin';
import {useGetAllProducts} from '@/lib/react-query/Admin/Product/products';
import {useAddTopUp} from '@/lib/react-query/Admin/TopUp/topup';
import {unAuthenticatedApi} from '@/utils/axios';
import React, {useState, useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import toast from 'react-hot-toast';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

// Define types
type Product = {
  id: string;
  name: string;
  description: string;
  images: string;
  discountedPrice: number;
  actualPrice: number;
};

// Define form schema
const topUpSchema = z.object({
  customerCRN: z.string().min(8, 'CRN must be at least 8 characters'),
  epin: z.string().min(1, 'EPIN is required'),
});

type FormValues = z.infer<typeof topUpSchema>;

const CustomerTopup = () => {
  const {data: products} = useGetAllProducts();
  const [selectedProducts, setSelectedProducts] = useState<
    Record<string, number>
  >({});
  const [customerName, setCustomerName] = useState<string>('');
  const [customerData, setCustomerData] = useState<any>(null);
  const [verifiedEpin, setVerifiedEpin] = useState<any>(null);
  const [epinValue, setEpinValue] = useState<number | null>(null);
  const [isVerifyingCustomer, setIsVerifyingCustomer] = useState(false);
  const [isVerifyingEpin, setIsVerifyingEpin] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [topUpData, setTopUpData] = useState<any>(null);

  const methods = useForm<FormValues>({
    resolver: zodResolver(topUpSchema),
    mode: 'onChange',
    defaultValues: {
      customerCRN: '',
      epin: '',
    },
  });

  const {mutateAsync: checkEpin} = useCheckEpin();
  const {
    mutateAsync: topUpMutation,
    isPending: isSubmitting,
    isSuccess,
    data,
  } = useAddTopUp();

  // Watch form values
  const customerCRN = methods.watch('customerCRN');
  const epinNo = methods.watch('epin');

  // Handle successful top-up
  useEffect(() => {
    if (isSuccess && data) {
      setTopUpData(data);
      setShowSuccessPopup(true);
      toast.success('Top-up successful');

      // Reset form after successful top-up
      methods.reset();
      setSelectedProducts({});
      setCustomerName('');
      setCustomerData(null);
      setVerifiedEpin(null);
      setEpinValue(null);
    }
  }, [isSuccess, data, methods]);

  // Reset selections when CRN changes
  useEffect(() => {
    setCustomerName('');
    setCustomerData(null);
    setVerifiedEpin(null);
    setEpinValue(null);
    setSelectedProducts({});
  }, [customerCRN]);

  // Reset product selection when ePIN changes
  useEffect(() => {
    setSelectedProducts({});
  }, [epinNo]);

  // Verify customer
  const verifyCustomer = async () => {
    const CRN = methods.getValues('customerCRN');

    if (!CRN || CRN.length < 8) {
      toast.error('Please enter a valid CRN');
      return;
    }

    setIsVerifyingCustomer(true);
    try {
      const response = await unAuthenticatedApi.get(`/customerName/${CRN}`);

      if (response.data && response.data.data) {
        const {name} = response.data.data;
        setCustomerName(name || '');
        setCustomerData(response.data.data);
        toast.success('Customer verified successfully');
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      setCustomerName('Invalid ID');
      setCustomerData(null);
      toast.error('Invalid Customer CRN');
    } finally {
      setIsVerifyingCustomer(false);
    }
  };

  // Verify ePIN
  const verifyEpin = async () => {
    const epinValue = methods.getValues('epin');

    if (!epinValue) {
      toast.error('Please enter an ePIN');
      return;
    }

    setIsVerifyingEpin(true);
    try {
      const response = await checkEpin(epinValue);

      setVerifiedEpin(response);

      setEpinValue(response);
      toast.success('ePIN verified successfully');
    } catch (error) {
      setVerifiedEpin(null);
      setEpinValue(null);
      toast.error('ePIN verification failed');
    } finally {
      setIsVerifyingEpin(false);
    }
  };

  // Filter products based on verified ePIN value
  const filteredProducts = epinValue
    ? products?.filter((product) => product.discountedPrice === epinValue)
    : [];

  // console.log('filteredProducts', filteredProducts);

  const getTotalSelectedCount = () =>
    Object.values(selectedProducts).reduce((a, b) => a + b, 0);

  const handleCardClick = (productId: string) => {
    const count = selectedProducts[productId] || 0;
    if (count < 1 && getTotalSelectedCount() < 1) {
      setSelectedProducts((prev) => ({...prev, [productId]: count + 1}));
    }
  };

  const onSubmit = async (formData: FormValues) => {
    const selectedProductId = Object.keys(selectedProducts)[0];

    if (!selectedProductId) {
      toast.error('Please select a product');
      return;
    }

    if (!customerData) {
      toast.error('Please verify customer first');
      return;
    }

    if (!verifiedEpin) {
      toast.error('Please verify ePIN first');
      return;
    }

    try {
      const payload = {
        productId: selectedProductId,
        epinNo: formData.epin,
        crnNo: formData.customerCRN,
      };

      await topUpMutation(payload);
    } catch (error) {
      toast.error('Top-up failed');
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="p-6">
        <h1 className="mb-6 text-2xl font-bold">Customer Top-Up</h1>

        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          {/* Customer Verification */}
          <div className="mb-6">
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <GenericInputField
                  placeholder="Enter Customer CRN"
                  name="customerCRN"
                  label="Customer CRN"
                  required
                />
              </div>
              <GenericButton
                type="button"
                onClick={verifyCustomer}
                disabled={isVerifyingCustomer || !customerCRN}
              >
                {isVerifyingCustomer ? 'Verifying...' : 'Verify Customer'}
              </GenericButton>
            </div>

            {/* Display customer name after verification */}
            {customerName && customerName !== 'Invalid ID' && (
              <div className="mt-4">
                <div className="rounded-lg bg-green-50 p-3 text-green-800">
                  <span className="font-semibold">Customer Name:</span>{' '}
                  {customerName}
                </div>
              </div>
            )}

            {/* Show error message if invalid */}
            {customerName === 'Invalid ID' && (
              <div className="mt-2 rounded bg-red-100 p-2 text-red-600">
                Invalid Customer CRN. Please check and try again.
              </div>
            )}
          </div>

          {/* ePIN Verification - Only show if customer is verified */}
          {customerName && customerName !== 'Invalid ID' && (
            <div className="mb-6">
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <GenericInputField
                    placeholder="Enter Epin"
                    name="epin"
                    label="Epin"
                    required
                  />
                </div>
                <GenericButton
                  type="button"
                  onClick={verifyEpin}
                  disabled={isVerifyingEpin || !epinNo}
                >
                  {isVerifyingEpin ? 'Verifying...' : 'Verify Epin'}
                </GenericButton>
              </div>

              {verifiedEpin && (
                <div className="mt-2 rounded bg-green-100 p-2">
                  <span className="font-semibold">✓ ePIN Verified</span>
                  <br />
                  <span>
                    Value: <strong>₹{epinValue}</strong>
                  </span>
                </div>
              )}

              {verifiedEpin === null && epinNo && !isVerifyingEpin && (
                <div className="text-gray-500 mt-2 text-sm">
                  Click "Verify Epin" to check the ePIN
                </div>
              )}
            </div>
          )}

          {/* Product Selection - Only show if ePIN is verified */}
          {verifiedEpin && epinValue && (
            <div className="mb-6">
              {filteredProducts && filteredProducts.length > 0 ? (
                <>
                  <h2 className="mb-4 text-xl font-semibold">
                    Select Product (Value: ₹{epinValue})
                    <span className="ml-2 text-sm font-normal">
                      (Click to select)
                    </span>
                  </h2>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredProducts.map((product: Product) => {
                      const count = selectedProducts[product.id] || 0;

                      return (
                        <div
                          key={product.id}
                          onClick={() => handleCardClick(product.id)}
                          className={`relative cursor-pointer overflow-hidden rounded-2xl border bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-white shadow-lg transition-all duration-300 hover:shadow-xl ${
                            count > 0
                              ? 'border-blue-500 ring-2 ring-blue-300'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          {count > 0 && (
                            <div className="absolute right-3 top-3 rounded-full bg-green-500 px-2 py-1 text-xs font-bold text-white">
                              Selected
                            </div>
                          )}
                          <div className="space-y-4">
                            <h2 className="text-xl font-bold text-white">
                              {product.name}
                            </h2>
                            <p className="text-gray-200 text-sm">
                              {product.description}
                            </p>
                            <div className="mt-3 flex items-center gap-2">
                              <span className="text-2xl font-bold text-green-300">
                                ₹{product.discountedPrice}
                              </span>
                              {product.actualPrice >
                                product.discountedPrice && (
                                <>
                                  <span className="text-gray-300 text-base line-through">
                                    ₹{product.actualPrice}
                                  </span>
                                  <span className="ml-auto rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                                    Save ₹
                                    {product.actualPrice -
                                      product.discountedPrice}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="rounded bg-yellow-100 p-4 text-yellow-800">
                  No products found with value ₹{epinValue}. Please check the
                  ePIN or contact support.
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          {getTotalSelectedCount() > 0 && (
            <div className="mt-6">
              <GenericButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Process Top-Up'}
              </GenericButton>
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default CustomerTopup;
