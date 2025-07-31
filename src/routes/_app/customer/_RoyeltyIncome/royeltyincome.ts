import wallet from '@/components/AdminSide/Wallet/wallet';
import RoyeltyIncome from '@/components/UserSide/RoyeltyIncome/RoyeltyIncome';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_app/customer/_RoyeltyIncome/royeltyincome',
)({
  component: RoyeltyIncome,
});
