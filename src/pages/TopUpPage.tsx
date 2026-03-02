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

const TopUpPage = () => {
  const {data: products} = useGetAllProducts();
  const [selectedProducts, setSelectedProducts] = useState<
    Record<string, number>
  >({});
  const [customerName, setCustomerName] = useState<string>('');
  const [customerData, setCustomerData] = useState<any>(null);
  const [verifiedEpin, setVerifiedEpin] = useState<any>(null);
  const [epinValue, setEpinValue] = useState<number | null>(null);

  const methods = useForm();
  const {
    mutateAsync: checkEpin,
    data: checkEpinData,
    isPending: isCheckingEpin,
  } = useCheckEpin();
  const {mutateAsync: topUpMutation, isPending: isSubmitting} = useAddTopUp();

  // Set customer name value in form when it changes
  useEffect(() => {
    if (customerName && customerName !== 'Invalid ID') {
      methods.setValue('customerName', customerName);
    }
  }, [customerName, methods]);

  // Get customer name based on CRN
  const verifyCustomer = async () => {
    const CRN = methods.getValues('customerCRN');

    if (CRN && CRN.length > 8) {
      try {
        const response = await unAuthenticatedApi.get(`/customerName/${CRN}`);

        if (response.data && response.data.data && response.data.data.name) {
          const name = response.data.data.name;

          setCustomerName(name);
          setCustomerData(response.data.data);

          methods.setValue('customerName', name);

          toast.success('Customer verified successfully');
        } else {
          setCustomerName('Invalid ID');
          setCustomerData(null);
          toast.error('Invalid customer data format');
        }
      } catch (error) {
        setCustomerName('Invalid ID');
        setCustomerData(null);
        toast.error('Invalid Customer CRN');
      }
    }
  };

  // Verify ePIN
  const verifyEpin = async () => {
    const epinValue = methods.getValues('epin');
    if (epinValue) {
      try {
        const response = await checkEpin(epinValue);

        setEpinValue(response);
        toast.success('ePIN verified successfully');
      } catch (error) {
        toast.error('ePIN verification failed');
      }
    }
  };

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

  const onSubmit = async (data: any) => {
    const selectedProductId = Object.keys(selectedProducts)[0];

    if (!selectedProductId) {
      toast.error('Please select a product');
      return;
    }

    try {
      const payload = {
        productId: selectedProductId,
        epinNo: data.epin,
        crnNo: data.customerCRN,
      };

      await topUpMutation(payload);

      toast.success('Top-up successful');
      methods.reset();
      setSelectedProducts({});
      setCustomerName('');
      setCustomerData(null);
      setVerifiedEpin(null);
      setEpinValue(null);
    } catch (error) {
      toast.error('Top-up failed');
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="p-6">
        <h1 className="mb-6 text-2xl font-bold">Top-Up Customer Account</h1>

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
              <GenericButton type="button" onClick={verifyCustomer}>
                Verify Customer
              </GenericButton>
            </div>

            {/* Display customer name in disabled field after verification */}
            {customerName && customerName !== 'Invalid ID' && (
              <div className="mt-4">
                <GenericInputField
                  placeholder="Customer Name"
                  name="customerName"
                  label="Customer Name"
                  disabled={true}
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
            )}

            {/* Show error message if invalid */}
            {customerName === 'Invalid ID' && (
              <div className="mt-2 rounded bg-red-100 p-2 text-red-600">
                Invalid Customer CRN
              </div>
            )}
          </div>

          {/* ePIN Verification */}
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
                disabled={isCheckingEpin}
              >
                {isCheckingEpin ? 'Verifying...' : 'Verify Epin'}
              </GenericButton>
            </div>
            {verifiedEpin && (
              <div className="mt-2 rounded bg-green-100 p-2">
                ePIN Verified: <strong>₹{epinValue}</strong> value
              </div>
            )}
          </div>

          {/* Product Selection */}
          {epinValue && filteredProducts && filteredProducts.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-4 text-xl font-semibold">
                Select Product (Value: ₹{epinValue})
                <span className="ml-2 text-sm font-normal">
                  (Tap to select)
                </span>
              </h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => {
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
                          {product.actualPrice > product.discountedPrice && (
                            <>
                              <span className="text-gray-300 text-base line-through">
                                ₹{product.actualPrice}
                              </span>
                              <span className="ml-auto rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                                Save ₹
                                {product.actualPrice - product.discountedPrice}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Show message if no products match */}
          {epinValue && filteredProducts && filteredProducts.length === 0 && (
            <div className="mb-6 rounded bg-yellow-100 p-4 text-yellow-800">
              No products found with value ₹{epinValue}
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

export default TopUpPage;
