import MyCompanies from '@/components/website/MyCompanies';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_landing/mycompanies')({
  component: MyCompanies,
});
