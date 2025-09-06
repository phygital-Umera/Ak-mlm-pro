import Networks from '@/pages/Networks';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/admin/_Network/network')({
  component: Networks,
});
