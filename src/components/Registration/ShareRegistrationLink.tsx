// import React, {useEffect} from 'react';
// import GenericButton from '@/components/Forms/Buttons/GenericButton';
// import GenericInputField from '@/components/Forms/Input/GenericInputField';
// import {useRegistration} from '@/context/RegisterContext';
// import {zodResolver} from '@hookform/resolvers/zod';
// import {useForm, FormProvider, useWatch} from 'react-hook-form';
// import {z} from 'zod';
// import {useAuthContext} from '@/context/AuthContext';
// import {toast} from 'react-hot-toast';
// import {FiCopy} from 'react-icons/fi';
// import GenericDropdown from '../Forms/DropDown/GenericDropDown';

// const shareLinkSchema = z.object({
//   sponsorId: z.string().optional(),
//   directSponsorId: z.string().optional(),
//   link: z.string().min(1, 'Link is required'),
//   side: z.enum(['A', 'B', 'C']).optional(),
// });

// type FormValues = z.infer<typeof shareLinkSchema>;

// interface SponsorInfoProps {
//   onNext: () => void;
// }

// export const ShareRegistrationLink: React.FC<SponsorInfoProps> = ({onNext}) => {
//   const {user} = useAuthContext();
//   const {setSponsorInfo} = useRegistration();

//   const methods = useForm<FormValues>({
//     resolver: zodResolver(shareLinkSchema),
//     defaultValues: {
//       sponsorId: user?.crnNo || '',
//       directSponsorId: user?.crnNo || '',
//       link: '',
//       side: 'A',
//     },
//   });

//   const {watch, setValue} = methods;
//   const directSponsorId = watch('sponsorId'); // Watch directSponsorId field
//   const side = watch('side');

//   const fullname = user?.fullname
//     ? user.fullname.replace(/\s/g, '_')
//     : 'unknown_user';
//   const crnNo = user?.crnNo || 'CRN0000000';
//   const registrationLink = `demo.sigmmalyf.com/register/${fullname}/${crnNo}${
//     directSponsorId ? `/${directSponsorId}` : ''
//   }${directSponsorId && side ? `/${side}` : ''}`;

//   useEffect(() => {
//     setValue('link', registrationLink);
//   }, [directSponsorId, user, side, setValue]);

//   const onSubmit = (formValues: FormValues) => {
//     setSponsorInfo({
//       side: formValues.side || 'A',
//       sponsorId: formValues.sponsorId || '',
//       directSponsorId: formValues.directSponsorId || '',
//     });
//     if (onNext) onNext();
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(registrationLink);
//     toast.success('Copied to clipboard');
//   };

//   return (
//     <FormProvider {...methods}>
//       <form
//         onSubmit={methods.handleSubmit(onSubmit)}
//         className="space-y-8 bg-white p-8 dark:bg-black"
//       >
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
//           <h1 className="col-span-12 mb-4 text-lg font-semibold">Share Link</h1>

//           <div className="col-span-4">
//             <GenericInputField
//               name="sponsorId"
//               label="Sponsor ID"
//               placeholder="Enter Sponsor ID"
//             />
//           </div>
//           <div className="col-span-4">
//             <GenericDropdown
//               name="side"
//               label="Side"
//               onChange={(value: string) => {
//                 if (value === 'A' || value === 'B' || value === 'C') {
//                   setValue('side', value);
//                 }
//               }}
//               options={[
//                 {value: 'A', label: 'A'},
//                 {value: 'B', label: 'B'},
//                 {value: 'C', label: 'C'},
//               ]}
//             />
//           </div>

//           <div className="col-span-12 flex items-center gap-2">
//             <GenericInputField name="link" label="Link to Share" disabled />
//             <button
//               type="button"
//               onClick={handleCopy}
//               className="text-gray-600 dark:text-gray-300 mt-8 p-5 hover:text-blue-500"
//               aria-label="Copy link"
//             >
//               <FiCopy size={20} />
//             </button>
//           </div>
//         </div>

//         <div className="col-span-12">
//           <GenericButton type="submit">Submit</GenericButton>
//         </div>
//       </form>
//     </FormProvider>
//   );
// };
import React, {useEffect, useState} from 'react';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import {useRegistration} from '@/context/RegisterContext';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm, FormProvider} from 'react-hook-form';
import {z} from 'zod';
import {useAuthContext} from '@/context/AuthContext';
import {toast} from 'react-hot-toast';
import {FiCopy, FiShare2} from 'react-icons/fi';
import {motion} from 'framer-motion';

const shareLinkSchema = z.object({
  link: z.string().min(1, 'Link is required'),
});

type FormValues = z.infer<typeof shareLinkSchema>;

interface SponsorInfoProps {
  onNext: () => void;
}

export const ShareRegistrationLink: React.FC<SponsorInfoProps> = ({onNext}) => {
  const {user} = useAuthContext();
  const [copied, setCopied] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(shareLinkSchema),
    defaultValues: {
      link: '',
    },
  });

  const {setValue} = methods;

  const fullname = user?.fullname
    ? user.fullname.replace(/\s/g, '_')
    : 'unknown_user';
  const crnNo = user?.crnNo || 'CRN0000000';
  // const registrationLink = `https://demo.sigmmalyf.com/register/${fullname}/${crnNo}`;
  const registrationLink = `http://localhost:5173/register/${fullname}/${crnNo}`;

  useEffect(() => {
    setValue('link', registrationLink);
  }, [user, setValue]);

  const onSubmit = (formValues: FormValues) => {
    console.log(formValues);
    if (onNext) onNext();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(registrationLink);
    toast.success('Copied to clipboard!');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Join My Network',
          text: 'Register using my referral link:',
          url: registrationLink,
        })
        .catch(console.error);
    } else {
      handleCopy();
    }
  };

  return (
    <FormProvider {...methods}>
      <motion.form
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-6 rounded-xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg dark:border-strokedark dark:bg-gradient-to-br dark:from-black dark:to-black"
      >
        <div className="mb-6 text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full dark:bg-meta-4">
            <FiShare2 className="text-2xl text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-gray-800 text-2xl font-bold dark:text-white">
            Share Registration Link
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Generate and share your unique referral link
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="text-gray-700 dark:text-gray-300 mb-1 block text-sm font-medium">
              Your Referral Link
            </label>
            <div className="relative">
              <GenericInputField name="link" disabled />
              <div className="absolute inset-y-0 right-0 flex">
                <motion.button
                  type="button"
                  onClick={handleCopy}
                  className="text-gray-500 flex items-center px-4 hover:text-blue-600 dark:hover:text-blue-400"
                  whileHover={{scale: 1.05}}
                  whileTap={{scale: 0.95}}
                >
                  {copied ? (
                    <motion.span
                      initial={{opacity: 0, scale: 0.8}}
                      animate={{opacity: 1, scale: 1}}
                      className="text-sm font-medium text-green-600"
                    >
                      Copied!
                    </motion.span>
                  ) : (
                    <FiCopy className="text-lg" />
                  )}
                </motion.button>
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-xs">
              Share this link with others to register under your network
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-4 sm:flex-row">
          <motion.button
            type="button"
            onClick={handleShare}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 font-medium text-white shadow-md transition-shadow hover:shadow-lg"
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.98}}
          >
            <FiShare2 className="text-lg" />
            Share Link
          </motion.button>
        </div>

        <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4 dark:border-blue-800/50 dark:bg-blue-900/20">
          <h3 className="flex items-center gap-2 font-medium text-blue-800 dark:text-blue-200">
            <FiShare2 className="text-lg" />
            Sharing Tips
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-blue-700 dark:text-blue-300">
            <li>Share via WhatsApp, Email or Social Media</li>
            <li>Explain the benefits of joining your network</li>
          </ul>
        </div>
      </motion.form>
    </FormProvider>
  );
};
