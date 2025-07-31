import PowerLegCustomerList from '@/components/AdminSide/Customer/PowerLegCustomerList';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_app/admin/_powerlegcustlist/powerlegcustlist',
)({
  component: PowerLegCustomerList,
});
