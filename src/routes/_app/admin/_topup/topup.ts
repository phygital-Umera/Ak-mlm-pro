import TopUpPage from '@/pages/TopUpPage';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/admin/_topup/topup')({
  component: TopUpPage,
});
