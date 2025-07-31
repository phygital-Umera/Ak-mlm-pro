import CommissionReport from '@/components/UserSide/CommisionReport/CommisionReport';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/customer/_commission/commision')({
  component: CommissionReport,
});
