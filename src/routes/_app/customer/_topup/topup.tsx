import CustomerTopup from '@/pages/CustomerTopup';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/customer/_topup/topup')({
  component: CustomerTopup,
});
