import PackagePage from '@/components/website/BannerPage';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_landing/packagepage')({
  component: PackagePage,
});
