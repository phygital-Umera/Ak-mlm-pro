/* eslint-disable */

import Loader from '@/components/common/Loader';
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import {useAuthContext} from '@/context/AuthContext';
import {
  useCreateCountsAdmin,
  useFetchCustomerList,
} from '@/lib/react-query/Admin/Home/adminHome';
import {dusaraFukatPageSchema} from '@/lib/validation/fukatpageSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigate} from '@tanstack/react-router';
import React, {useEffect, useRef, useState} from 'react';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  useFieldArray,
} from 'react-hook-form';
import toast from 'react-hot-toast';
import {z} from 'zod';

type FormValues = z.infer<typeof dusaraFukatPageSchema>;

const DusaraFukatPage = () => {
  const [customerData, setCustomerData] = useState<any[]>([]);
  const {data: apiData, isLoading, error} = useFetchCustomerList();
  // console.log(apiData);

  const {mutateAsync: addcounts, isSuccess} = useCreateCountsAdmin();
  const tableRef = useRef<HTMLDivElement>(null);

  const methods = useForm<FormValues>({
    resolver: zodResolver(dusaraFukatPageSchema),
    defaultValues: {
      customers: [],
    },
  });

  const {register, handleSubmit, control, reset} = methods;
  const {fields} = useFieldArray({
    control,
    name: 'customers',
  });

  useEffect(() => {
    if (apiData) {
      const mappedData = apiData.map((customer: any) => ({
        id: customer.id,
        name: customer.name,
        crnNo: customer.crnNo,
        leftCount: customer.leftCount || 0, // Default to 0 if not provided
        rightCount: customer.rightCount || 0, // Default to 0 if not provided
        pairCount: customer.pairCount || 0,
      }));

      const sortedData = mappedData.sort((a, b) =>
        b.crnNo.localeCompare(a.crnNo),
      );
      setCustomerData(sortedData);

      // Initialize form with existing values for each customer
      reset({
        customers: sortedData.map((customer) => ({
          customerId: customer.id,
          leftCount: customer.leftCount?.toString() || '0',
          rightCount: customer.rightCount?.toString() || '0',
          pairCount: customer.pairCount?.toString() || '0', // Initialize pair count to 0
        })),
      });
    }
  }, [apiData, reset]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // Transform data for submission
      const submissionData = data.customers.map((customer) => ({
        id: customer.customerId,
        leftCount: Number(customer.leftCount),
        rightCount: Number(customer.rightCount),
        pairCount: Number(customer.pairCount),
      }));

      await addcounts(submissionData);
      // toast.success('Counts submitted successfully!');
    } catch (err) {
      // toast.error('Failed to submit counts');
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error loading customer data</div>;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <div ref={tableRef} className="w-full">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Name
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      CRN Number
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Left Count
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Right Count
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Pair Count
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customerData.map((customer, index) => (
                    <tr
                      key={customer.id}
                      className="border-b border-stroke dark:border-strokedark"
                    >
                      <td className="px-4 py-4">{customer.name}</td>
                      <td className="px-4 py-4">{customer.crnNo}</td>
                      <td className="px-4 py-4">
                        <input
                          type="number"
                          {...register(`customers.${index}.leftCount`)}
                          defaultValue={customer.leftCount}
                          className="w-full rounded border border-stroke px-3 py-2 dark:border-strokedark dark:bg-meta-4"
                          min="0"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          type="number"
                          {...register(`customers.${index}.rightCount`)}
                          defaultValue={customer.rightCount}
                          className="w-full rounded border border-stroke px-3 py-2 dark:border-strokedark dark:bg-meta-4"
                          min="0"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          type="number"
                          {...register(`customers.${index}.pairCount`)}
                          defaultValue="0"
                          className="w-full rounded border border-stroke px-3 py-2 dark:border-strokedark dark:bg-meta-4"
                          min="0"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <GenericButton type="submit" className="px-6 py-2">
              Submit Counts
            </GenericButton>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default DusaraFukatPage;
