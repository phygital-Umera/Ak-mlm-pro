import SecondPage from '@/components/website/ProductPage';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_landing/SecondPage')({
  component: SecondPage,
});
