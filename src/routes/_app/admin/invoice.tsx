import MyInvoice from '@/pages/MyInvoice';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/admin/invoice')({
  component: MyInvoice,
});
