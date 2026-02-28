/*eslint-disable*/
import React, {useState, useEffect} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {api, unAuthenticatedApi} from '@/utils/axios';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import toast from 'react-hot-toast';
import {useGetWalletHistory} from '@/lib/react-query/Admin/WalletHistory/wallethistory';

const FundTransfer = () => {
  const [step, setStep] = useState<number>(1);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerData, setCustomerData] = useState<any>(null);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [isSendingOtp, setIsSendingOtp] = useState<boolean>(false);
  const [isTransferring, setIsTransferring] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');

  const methods = useForm();
  const {handleSubmit, watch, setValue, reset} = methods;
  const crnNo = watch('crnNo');

  const {data: walletHistory} = useGetWalletHistory();

  console.log('Wallet History:', walletHistory);

  // Set customer name in form when it changes
  useEffect(() => {
    if (customerName && customerName !== 'Invalid ID') {
      setValue('customerNameDisplay', customerName);
    }
  }, [customerName, setValue]);

  // Set email in form when it changes
  useEffect(() => {
    if (userEmail && userEmail !== 'No email found') {
      setValue('userEmailDisplay', userEmail);
    }
  }, [userEmail, setValue]);

  // Effect to check CRN and get customer name
  useEffect(() => {
    const checkCRN = async () => {
      if (crnNo && crnNo.length > 8) {
        setIsChecking(true);
        try {
          const response = await unAuthenticatedApi.get(
            `/customerName/${crnNo}`,
          );
          console.log('Customer Response:', response.data);

          if (response.data?.data?.name) {
            setCustomerName(response.data.data.name);
            setCustomerData(response.data.data);

            if (response.data.data.email) {
              setUserEmail(response.data.data.email);
            } else {
              setUserEmail('No email found');
            }
            toast.success('Customer verified successfully');
          } else {
            setCustomerName('Invalid ID');
            setCustomerData(null);
            setUserEmail('');
          }
        } catch (error) {
          console.error('Error fetching customer:', error);
          setCustomerName('Invalid ID');
          setCustomerData(null);
          setUserEmail('');
          toast.error('Failed to verify customer');
        } finally {
          setIsChecking(false);
        }
      } else {
        setCustomerName('');
        setCustomerData(null);
        setUserEmail('');
      }
    };

    const timeoutId = setTimeout(checkCRN, 500);
    return () => clearTimeout(timeoutId);
  }, [crnNo]);

  // Send OTP to email
  const handleSendOtp = async () => {
    if (!userEmail || userEmail === 'No email found') {
      toast.error('No email found for this customer');
      return;
    }

    setIsSendingOtp(true);
    try {
      const otpPayload = {
        email: userEmail,
        crnNo: crnNo,
      };

      console.log('OTP Payload:', otpPayload);

      const response = await api.post('send-otp', otpPayload);

      console.log('OTP Response:', response.data);

      if (response.data) {
        // Check if the request was successful (status code 200-299)
        setStep(2); // Move to step 2
        toast.success(response.data.message || `OTP sent to ${userEmail}`);
      }
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      let errorMessage = 'Failed to send OTP';

      if (error.response?.data) {
        console.log('Error response:', error.response.data);
        if (error.response.data.errors) {
          const validationErrors = error.response.data.errors;
          if (Array.isArray(validationErrors) && validationErrors.length > 0) {
            errorMessage = validationErrors[0].message || errorMessage;
          }
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }

      toast.error(errorMessage);
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Handle fund transfer submission
  const handleFundTransfer = async (data: any) => {
    // Validate amount
    if (!data.amount || data.amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    // Validate OTP
    if (!data.otp || data.otp.length !== 6) {
      toast.error('Please enter valid 6-digit OTP');
      return;
    }

    setIsTransferring(true);
    try {
      // Prepare payload for admin/transfer API
      const transferPayload = {
        crnNo: data.crnNo,
        amount: Number(data.amount),
        otp: data.otp,
        email: userEmail,
      };

      console.log('Transfer Payload:', transferPayload);

      const response = await api.post('/admin/transfer', transferPayload);

      console.log('Transfer Response:', response.data);

      // Check if the response has status true (your API returns this)
      // Also check if we got a successful response (status code 200-299)
      if (response.data) {
        toast.success(response.data.message || 'Fund transferred successfully');

        // Reset form after successful transfer
        reset();
        setStep(1);
        setCustomerName('');
        setCustomerData(null);
        setUserEmail('');
      } else {
        toast.error(response.data?.message || 'Transfer failed');
      }
    } catch (error: any) {
      console.error('Error transferring fund:', error);
      let errorMessage = 'Failed to transfer fund';

      if (error.response?.data) {
        console.log('Error response:', error.response.data);
        if (error.response.data.errors) {
          const validationErrors = error.response.data.errors;
          if (Array.isArray(validationErrors) && validationErrors.length > 0) {
            errorMessage = validationErrors[0].message || errorMessage;
          }
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }

      toast.error(errorMessage);
    } finally {
      setIsTransferring(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Fund Transfer</h1>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleFundTransfer)} className="space-y-6">
          {/* Step 1: CRN Entry */}
          <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-lg font-semibold">
              Step 1: Customer Verification
              {step > 1 && (
                <span className="ml-2 text-sm text-green-600">✓ Completed</span>
              )}
            </h2>

            <div className="w-full md:w-1/2">
              <GenericInputField
                name="crnNo"
                label="CRN Number"
                placeholder="Enter CRN Number"
                disabled={step > 1}
              />

              {/* Customer Info Display */}
              {isChecking && (
                <div className="text-gray-500 mt-2 text-sm">
                  Checking customer...
                </div>
              )}

              {customerName && customerName !== 'Invalid ID' && (
                <div className="mt-4 space-y-4">
                  {/* Customer Name Field */}
                  <GenericInputField
                    placeholder="Customer Name"
                    name="customerNameDisplay"
                    label="Customer Name"
                    disabled={true}
                  />

                  {/* Email Field - Added as disabled input */}
                  {userEmail && userEmail !== 'No email found' && (
                    <GenericInputField
                      placeholder="Email"
                      name="userEmailDisplay"
                      label="Email"
                      disabled={true}
                    />
                  )}

                  {/* Send OTP Button - Only show in step 1 */}
                  {step === 1 &&
                    userEmail &&
                    userEmail !== 'No email found' && (
                      <div className="mt-4">
                        <GenericButton
                          type="button"
                          onClick={handleSendOtp}
                          disabled={isSendingOtp}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {isSendingOtp ? 'Sending OTP...' : 'Send OTP'}
                        </GenericButton>
                      </div>
                    )}

                  {/* Show message if no email found */}
                  {step === 1 &&
                    (!userEmail || userEmail === 'No email found') && (
                      <div className="mt-4 rounded-md bg-yellow-50 p-3 text-sm text-yellow-700">
                        No email found for this customer. Please contact
                        support.
                      </div>
                    )}
                </div>
              )}

              {customerName === 'Invalid ID' && (
                <div className="mt-2 rounded-md bg-red-50 p-3 text-sm text-red-600">
                  Invalid CRN Number. Please check and try again.
                </div>
              )}
            </div>
          </div>

          {/* Step 2: OTP and Amount Entry */}
          {step === 2 && (
            <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-lg font-semibold">
                Step 2: Enter OTP and Amount
              </h2>

              <div className="w-full space-y-4 md:w-1/2">
                {/* OTP Field */}
                <GenericInputField
                  name="otp"
                  label="Enter OTP"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                />

                {/* Resend OTP Button */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">
                    Didn&apos;t receive OTP?
                  </span>
                  <GenericButton
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isSendingOtp}
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    {isSendingOtp ? 'Sending...' : 'Resend OTP'}
                  </GenericButton>
                </div>

                {/* Amount Field */}
                <GenericInputField
                  name="amount"
                  label="Transfer Amount (₹)"
                  placeholder="Enter amount"
                  type="number"
                  min="1"
                  required
                />

                {/* Submit Button */}
                <div className="mt-6">
                  <GenericButton
                    type="submit"
                    disabled={isTransferring}
                    className="w-full bg-blue-600 py-3 text-lg hover:bg-blue-700 md:w-auto md:px-8"
                  >
                    {isTransferring ? 'Processing...' : 'Transfer Fund'}
                  </GenericButton>
                </div>
              </div>
            </div>
          )}

          {/* Progress Indicator */}
          {customerName && customerName !== 'Invalid ID' && (
            <div className="mt-6 flex items-center gap-2">
              <div
                className={`h-2 w-8 rounded-full ${
                  step >= 1 ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              ></div>
              <div
                className={`h-2 w-8 rounded-full ${
                  step >= 2 ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              ></div>
              <span className="text-gray-500 ml-2 text-sm">
                {step === 1
                  ? 'Step 1: Verify Customer'
                  : 'Step 2: Complete Transfer'}
              </span>
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default FundTransfer;
