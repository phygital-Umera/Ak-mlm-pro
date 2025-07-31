import MyProducts from '@/components/website/MyProducts';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_landing/myproducts')({
  component: MyProducts,
});
