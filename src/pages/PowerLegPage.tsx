import GenericButton from '@/components/Forms/Buttons/GenericButton';
import GenericCheckBox from '@/components/Forms/Checkboxes/GenericCheckBox';
import GenericDropdown from '@/components/Forms/DropDown/GenericDropDown';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import {
  useCreatePowerLeg,
  useGetPowerLeg,
} from '@/lib/react-query/Admin/PowerLeg/powerleg';
import {Route} from '@/routes/_app/admin/_powerleg/powerleg.$id';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigate} from '@tanstack/react-router';
import {log} from 'console';
import React, {useEffect, useMemo, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {set, z} from 'zod';

const powerLegSchema = z.object({
  customerId: z.string().min(1, 'Customer ID is required'),
  side: z.string().min(1, 'Side is required'),
  count: z.string().min(1, 'Count is required'),
});

type FormValues = z.infer<typeof powerLegSchema>;

const PowerLegPage = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(powerLegSchema),
  });
  const navigate = useNavigate();
  const {id: crnId} = Route.useParams();
  const [isChecked, setIsChecked] = useState(false);

  const {data} = useGetPowerLeg();
  console.log('data', data);

  const {
    mutate: createPowerLeg,
    isSuccess,
    isPending,
    error,
  } = useCreatePowerLeg();

  const filteredData = useMemo(() => {
    return data?.filter((item) => item.crnNo === crnId);
  }, [data, crnId]);
  console.log('filteredData', filteredData);

  useEffect(() => {
    if (filteredData && filteredData.length > 0) {
      const value = filteredData[0].ispowerLeg;

      setIsChecked(value === true || value === 'true');
      console.log('====================================');
      console.log('value', value);
      console.log('====================================');
    } else {
      setIsChecked(false); // Default to unchecked if no data
    }
  }, [filteredData]);

  const handleChange = () => {
    setIsChecked(!isChecked);
    console.log('isChecked', !isChecked);
  };

  const {reset} = methods;

  useEffect(() => {
    reset({
      customerId: crnId,
      side: filteredData?.[0]?.powerBranch,
      count: filteredData?.[0]?.powerCount.toString(),
    });
  }, [crnId, filteredData, reset]);

  const submit = (data: FormValues) => {
    console.log({...data, powerLeg: isChecked});
    createPowerLeg(
      {
        side: data.side,
        crnNo: data.customerId,
        isPowerLeg: isChecked,
        powerCount: Number(data.count),
      },
      {
        onSuccess: () => {
          navigate({to: `/admin/powerlegcustlist`});
        },
      },
    );
  };

  return (
    <div className="space-y-8 rounded-xl bg-white p-8 shadow-md dark:bg-neutral-900">
      <h1 className="text-gray-800 text-2xl font-semibold dark:text-white">
        Power Leg
      </h1>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            <GenericInputField
              name="customerId"
              label="Customer ID"
              placeholder="Enter Customer ID"
            />

            <div className="flex items-center space-x-3 pt-6">
              <GenericCheckBox
                id="powerLeg"
                labelText="powerLeg"
                isChecked={isChecked}
                onChange={handleChange}
              />
              {/* <label className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                Power Leg
              </label> */}
            </div>

            <GenericDropdown
              name="side"
              label="Side"
              options={[
                {value: 'A', label: 'A'},
                {value: 'B', label: 'B'},
                {value: 'C', label: 'C'},
              ]}
            />

            <GenericInputField
              name="count"
              label="Count"
              placeholder="Enter Count"
              type="number"
            />
          </div>

          <div className="flex justify-end pt-6">
            <GenericButton type="submit" className="w-32">
              Update
            </GenericButton>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default PowerLegPage;
