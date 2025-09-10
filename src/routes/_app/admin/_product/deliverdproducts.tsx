import {createFileRoute} from '@tanstack/react-router';
import DeliveredReport from '@/pages/DeliveredReport';

export const Route = createFileRoute('/_app/admin/_product/deliverdproducts')({
  component: DeliveredReport,
});
