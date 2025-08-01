import ProductEpin from '@/components/UserSide/E-pinUser/ProductEpin';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/customer/_epin/productepin')({
  component: ProductEpin,
});
