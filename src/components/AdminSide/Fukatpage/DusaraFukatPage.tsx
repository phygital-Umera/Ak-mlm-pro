// import GenericButton from '@/components/Forms/Buttons/GenericButton';
// import GenericInputField from '@/components/Forms/Input/GenericInputField';
// import {
//   useDusaraFukatPage,
//   useFukatPage,
// } from '@/lib/react-query/Admin/Epin/fukatpage';
// import {dusaraFukatPageSchema} from '@/lib/validation/fukatpageSchema';
// import {zodResolver} from '@hookform/resolvers/zod';
// import React, {useEffect} from 'react';
// import {useForm, FormProvider} from 'react-hook-form';
// import toast from 'react-hot-toast';
// import {z} from 'zod';

// type FormValues = z.infer<typeof dusaraFukatPageSchema>;

// const DusaraFukatPage = () => {
//   const methods = useForm<FormValues>({
//     resolver: zodResolver(dusaraFukatPageSchema),
//   });
//   const {
//     mutate: createEPin,
//     isSuccess,
//     isPending,
//     error,
//   } = useDusaraFukatPage();
//   const onSubmit = (data) => {
//     console.log(data);
//     createEPin({
//       customerId: data.customerId,
//       leftcount: Number(data.leftcount),
//       rightcount: Number(data.rightcount),
//     });
//   };
//   useEffect(() => {
//     if (isSuccess) {
//       toast.success('E-Pin created successfully');
//       methods.reset();
//     }
//     if (error) {
//       toast.error('Error creating E-Pin');
//     }
//   }, [isSuccess, error]);
//   return (
//     <FormProvider {...methods}>
//       <form
//         onSubmit={methods.handleSubmit(onSubmit)}
//         className="space-y-8 bg-white p-8 dark:bg-black"
//       >
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
//           <h1 className="col-span-12 mb-4 text-lg font-semibold">Count</h1>

//           <div className="col-span-12 md:col-span-6">
//             <GenericInputField
//               name="customerId"
//               label="Customer ID"
//               placeholder="Customer Id"
//             />
//           </div>
//           <div className="col-span-12 md:col-span-6">
//             <GenericInputField
//               name="leftcount"
//               label="Left Count "
//               placeholder=" Left Count"
//               type="number"
//             />
//           </div>
//           <div className="col-span-12 md:col-span-6">
//             <GenericInputField
//               name="rightcount"
//               label=" Right Count"
//               placeholder="Right Count"
//               type="number"
//             />
//           </div>
//         </div>

//         {/* Form Buttons */}
//         <div className="flex justify-end space-x-4">
//           <GenericButton type="submit">
//             {isPending ? 'Creating...' : 'Create'}
//           </GenericButton>
//         </div>
//       </form>
//     </FormProvider>
//   );
// };

// export default DusaraFukatPage;

import React from 'react';

const DusaraFukatPage = () => {
  return <div>DusaraFukatPage</div>;
};

export default DusaraFukatPage;
