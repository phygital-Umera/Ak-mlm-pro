import {ApiError} from '@/types';
import {api} from '@/utils/axios';

// export const payVoucher = async (id: string) => {
//   try {
//     const response = await api.post(`/admin/${id}`);
//     return response.data;
//   } catch (error: unknown) {
//     const err = error as ApiError;
//     console.error(
//       'Error in payCommission:',
//       err.response?.data.message || err.message,
//     );
//     throw err.response?.data || err;
//   }
// };

// Modified payVoucherAll API function
export const payVoucher = async (Ids: string[]) => {
  try {
    // console.log('Paying vouchers with IDs:', Ids);
    const response = await api.post(`/admin/voucher/accept`, {Ids});
    return response.data;
  } catch (error: unknown) {
    const err = error as ApiError;
    console.error(
      'Error in payVoucher:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};
