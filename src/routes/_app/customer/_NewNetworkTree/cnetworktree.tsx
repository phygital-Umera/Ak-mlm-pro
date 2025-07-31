import CustomerNetworkNew from '@/pages/CustomerNetworkNew';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_app/customer/_NewNetworkTree/cnetworktree',
)({
  component: CustomerNetworkNew,
});
