import {createFileRoute} from '@tanstack/react-router';
import ProductReport from '@/pages/ProductReport';

export const Route = createFileRoute('/_app/admin/_product/productreport')({
  component: ProductReport,
});
