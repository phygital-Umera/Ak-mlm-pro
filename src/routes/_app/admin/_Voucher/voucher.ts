import Vouchers from '@/components/AdminSide/Voucher/Vouchers';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/admin/_Voucher/voucher')({
  component: Vouchers,
});
