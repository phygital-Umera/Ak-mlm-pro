import DisplayHistory from '@/components/UserSide/RoyeltyIncome/DisplayHistory';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/customer/_wallet/wallethistory')({
  component: DisplayHistory,
});
