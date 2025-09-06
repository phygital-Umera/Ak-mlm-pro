import CustomerGenNetwork from '@/pages/CustomerGenNetwork';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/customer/_Network/gentree')({
  component: CustomerGenNetwork,
});
