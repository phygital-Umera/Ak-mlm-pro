import SecondPage from '@/components/website/Secondpage';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_landing/SecondPage')({
  component: SecondPage,
});
