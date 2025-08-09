import DirectCustomerList from '@/pages/DirectCustomerList';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/customer/directcustomer')({
  component: DirectCustomerList,
});
