import {useQueryClient, useMutation} from '@tanstack/react-query';
import {ADMIN_DASHBOARD_QUERY_KEYS} from '../../QueryKeys';
import {payVoucher} from '@/lib/api/Admin/Voucher/voucher';

// export const usePayVoucher = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (id: string) => payVoucher(id),
//     onSuccess: () => {},
//     onError: (error) => {
//       console.error('Failed to pay commission:', error);
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({
//         queryKey: [ADMIN_DASHBOARD_QUERY_KEYS.ADMIN_COMMISSION],
//       });
//     },
//   });
// };

// Updated usePayVoucherAll hook
export const usePayVoucher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {Ids: string[]}) => payVoucher(data.Ids),
    onSuccess: () => {
      // console.log('Vouchers paid successfully');
      queryClient.invalidateQueries({
        queryKey: ['GetAllVouchers'],
      });
    },
    onError: (error) => {
      console.error('Failed to pay vouchers:', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['GetAllVouchers'],
      });
    },
  });
};
