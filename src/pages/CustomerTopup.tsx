/*eslint-disable */
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import GenericDropdown from '@/components/Forms/DropDown/GenericDropDown';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import {useCheckEpin, useGetAdminPins} from '@/lib/react-query/Admin/Epin/epin';
import {useGetAllProducts} from '@/lib/react-query/Admin/Product/products';
import {useAddTopUp} from '@/lib/react-query/Admin/TopUp/topup';
import {useGetEpins} from '@/lib/react-query/Customer/epin';
import {unAuthenticatedApi} from '@/utils/axios';
import React, {useState, useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import toast from 'react-hot-toast';

const CustomerTopup = () => {
  const {data: products} = useGetAllProducts();
  const [selectedProducts, setSelectedProducts] = useState<
    Record<string, number>
  >({});
  const [customerName, setCustomerName] = useState<string>('');
  const [verifiedEpin, setVerifiedEpin] = useState<any>(null);
  const [isCheckingCustomer, setIsCheckingCustomer] = useState<boolean>(false);
  const [isCheckingEpin, setIsCheckingEpin] = useState<boolean>(false);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [filteredEpins, setFilteredEpins] = useState([]);

  const {data: epinData, isSuccess, isLoading} = useGetEpins();
  console.log(epinData);

  const methods = useForm();
  const {mutateAsync: checkEpin} = useCheckEpin();
  const {mutateAsync: topUpMutation, isPending: isSubmitting} = useAddTopUp();

  // Watch the CRN and ePIN fields for changes
  const customerCRN = methods.watch('customerCRN');
  const epinValue = methods.watch('epin');

  // Effect to filter ePINs by selected price
  useEffect(() => {
    if (epinData && selectedPrice) {
      const filtered = epinData.filter(
        (epin) => epin.price === parseInt(selectedPrice) && !epin.isUsed,
      );
      setFilteredEpins(filtered);
    } else {
      setFilteredEpins([]);
    }
  }, [selectedPrice, epinData]);

  // Effect to check CRN and get customer name
  useEffect(() => {
    const checkCRN = async () => {
      if (customerCRN && customerCRN.length > 8) {
        setIsCheckingCustomer(true);
        try {
          const response = await unAuthenticatedApi.get(
            `/customerName/${customerCRN}`,
          );
          setCustomerName(response.data.data);
        } catch (error) {
          setCustomerName('Invalid ID');
        } finally {
          setIsCheckingCustomer(false);
        }
      } else {
        setCustomerName('');
      }
    };

    // Add a delay to avoid making too many API calls
    const timeoutId = setTimeout(checkCRN, 500);

    return () => clearTimeout(timeoutId);
  }, [customerCRN]);

  // Effect to verify ePIN automatically
  useEffect(() => {
    const verifyEpin = async () => {
      if (epinValue && epinValue.length > 0) {
        setIsCheckingEpin(true);
        try {
          const response = await checkEpin(epinValue);
          setVerifiedEpin(response);
        } catch (error) {
          console.error('ePIN verification failed:', error);
          setVerifiedEpin(null);
        } finally {
          setIsCheckingEpin(false);
        }
      } else {
        setVerifiedEpin(null);
      }
    };

    // Add a delay to avoid making too many API calls
    const timeoutId = setTimeout(verifyEpin, 500);

    return () => clearTimeout(timeoutId);
  }, [epinValue, checkEpin]);

  // Filter products based on verified ePIN value
  const filteredProducts = verifiedEpin
    ? products?.filter((product) => product.discountedPrice === verifiedEpin)
    : [];

  const getTotalSelectedCount = () =>
    Object.values(selectedProducts).reduce((a, b) => a + b, 0);

  const handleCardClick = (productId: string) => {
    const count = selectedProducts[productId] || 0;
    if (count < 1 && getTotalSelectedCount() < 1) {
      setSelectedProducts((prev) => ({...prev, [productId]: count + 1}));
    }
  };

  const handlePriceChange = (value: string) => {
    setSelectedPrice(value);
    // Reset ePIN and verified ePIN when price changes
    methods.setValue('epin', '');
    setVerifiedEpin(null);
    setSelectedProducts({});
  };

  const onSubmit = async (data: any) => {
    // Get the selected product ID
    const selectedProductId = Object.keys(selectedProducts)[0];

    if (!selectedProductId) {
      toast.error('Please select a product');
      return;
    }

    try {
      // Prepare the payload for top-up
      const payload = {
        productId: selectedProductId,
        epinNo: data.epin,
        crnNo: data.customerCRN,
      };

      // Call the top-up API
      await topUpMutation(payload);

      toast.success('Top-up successful');
      // Reset form after successful submission
      methods.reset();
      setSelectedProducts({});
      setCustomerName('');
      setVerifiedEpin(null);
      setSelectedPrice('');
    } catch (error) {
      console.error('Top-up failed:', error);
      toast.error('Top-up failed');
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="p-6">
        <h1 className="mb-6 text-2xl font-bold">Top-Up Customer Account</h1>

        {/* Customer Verification */}
        <div className="mb-6">
          <GenericInputField
            placeholder="Enter Customer CRN"
            name="customerCRN"
            label="Customer CRN"
            required
          />
          {customerName && (
            <div className="bg-gray-100 mt-2 rounded p-2">
              Customer Name: <strong>{customerName}</strong>
              {isCheckingCustomer && (
                <span className="text-gray-500 ml-2">Checking...</span>
              )}
            </div>
          )}
        </div>

        {/* Price Selection */}
        <div className="col-span-12 mb-6 md:col-span-6">
          <GenericDropdown
            label="Price"
            name="price"
            options={[
              {label: '₹1250', value: '1250'},
              {label: '₹2000', value: '2000'},
              {label: '₹2700', value: '2700'},
              {label: '₹3500', value: '3500'},
            ]}
            onChange={handlePriceChange}
            value={selectedPrice}
          />
        </div>

        {/* ePIN Selection (filtered by price) */}
        {selectedPrice && (
          <div className="mb-6">
            <GenericDropdown
              placeholder="Select ePIN"
              name="epin"
              label="ePIN"
              options={filteredEpins.map((epin) => ({
                label: `${epin.epinNo} (₹${epin.price})`,
                value: epin.epinNo,
              }))}
            />
            {verifiedEpin && (
              <div className="mt-2 rounded bg-green-100 p-2">
                ePIN Verified: <strong>₹{verifiedEpin}</strong> value
                {isCheckingEpin && (
                  <span className="text-gray-500 ml-2">Verifying...</span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Product Selection (only shown after ePIN verification) */}
        {verifiedEpin && filteredProducts && filteredProducts.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-4 text-xl font-semibold">
              Select Product (Value: ₹{verifiedEpin})
              <span className="ml-2 text-sm font-normal">(Tap to select)</span>
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

        {/* Submit Button */}
        {getTotalSelectedCount() > 0 && (
          <div className="mt-6">
            <GenericButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Process Top-Up'}
            </GenericButton>
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default CustomerTopup;
