import CustomerMlm from '@/components/AdminSide/CustomerMlm/CustomerMlm';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/admin/_customermlm/customermlm')({
  component: CustomerMlm,
});
