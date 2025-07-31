/* eslint-disable */
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import GenericTable from '@/components/Forms/Table/GenericTable';
import {useAuthContext} from '@/context/AuthContext';
import {useGetCustomerLevel} from '@/lib/react-query/Customer/home';
import {useCreateWalletData} from '@/lib/react-query/Customer/wallet';
import {error} from 'console';
import React, {useState} from 'react';
import {BsWalletFill} from 'react-icons/bs';

const DisplayHistory = () => {
  const {user} = useAuthContext();
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [error, setError] = useState('');

  const id = user?.id;
  const {data: Datafecth, isPending} = useGetCustomerLevel();

  const {mutateAsync: addWallet, isSuccess: updateSuccess} =
    useCreateWalletData();
  const walletAmount =
    typeof Datafecth?.amount === 'object' && Datafecth?.amount !== null
      ? (Datafecth.amount ?? 0)
      : (Datafecth?.amount ?? 0);

  const handleWalletClick = async () => {
    try {
      // Validate input
      if (!withdrawAmount || isNaN(Number(withdrawAmount))) {
        setError('Please enter a valid amount');
        return;
      }

      const numericAmount = Number(withdrawAmount);
      const walletAmount =
        typeof Datafecth?.wallet === 'object' && Datafecth?.wallet !== null
          ? (Datafecth.wallet.amount ?? 0)
          : (Datafecth?.wallet ?? 0);

      if (numericAmount > walletAmount) {
        setError('Withdrawal amount exceeds wallet balance');
        return;
      }

      setError('');

      const walletData = {
        id: user?.user.id ?? '',
        amount: numericAmount,
      };
      await addWallet(walletData);
      setWithdrawAmount('');
    } catch (error) {
      console.error('Error updating wallet:', error);
      setError('Failed to process withdrawal');
    }
  };

  const columns = [
    {
      header: 'Date',
      accessor: 'createdAt',
      cell: (row: any) =>
        new Date(row.createdAt).toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }),
    },

    {
      header: 'Transaction Type',
      accessor: 'type',
      cell: (row: any) => (
        <span
          className={row.type === 'add' ? 'text-green-500' : 'text-red-500'}
        >
          {row.type === 'add' ? 'Credit' : 'Debit'}
        </span>
      ),
    },
    {
      header: 'Amount',
      accessor: 'amount',
      cell: (row: any) => (
        <span
          className={row.type === 'add' ? 'text-green-500' : 'text-red-500'}
        >
          {row.type === 'add' ? '+' : '-'}
          {row.amount} Rs
        </span>
      ),
    },
    {
      header: 'Details',
      accessor: 'details',
    },
  ];

  if (isPending) return <div>Loading...</div>;

  return (
    <>
      <div className="dark:bg-gray-800 mb-6 rounded-lg p-4 shadow-default dark:shadow-none sm:p-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex w-full items-center gap-4 sm:w-auto">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray dark:bg-primary">
              <BsWalletFill className="text-2xl text-primary dark:text-white" />
            </div>
            <div>
              <p className="text-xl font-semibold dark:text-white">
                {isPending ? 'Loading...' : walletAmount} Rs
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Wallet Balance
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-48">
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Enter amount"
                className="border-gray-300 dark:border-gray-600 dark:bg-gray-700 w-full rounded-md border bg-transparent p-2 pl-3 pr-10 focus:border-primary focus:outline-none dark:text-white"
                disabled={isPending}
              />
              <span className="text-gray-500 absolute right-3 top-2.5">Rs</span>
            </div>
            <GenericButton
              onClick={handleWalletClick}
              type="submit"
              disabled={isPending || !withdrawAmount}
              className="w-full sm:w-auto"
            >
              {isPending ? 'Processing...' : 'Withdraw'}
            </GenericButton>
          </div>
        </div>

        {error && <div className="mt-3 text-sm text-red-500">{error}</div>}
      </div>
      <div>
        <div className="mb-4">
          <h1 className="text-xl font-bold">text-black dark:text-white</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Current Balance: {Datafecth?.amount || 0} Rs
          </p>
        </div>

        <GenericTable columns={columns} data={Datafecth?.walletHistory || []} />
      </div>
    </>
  );
};

export default DisplayHistory;
