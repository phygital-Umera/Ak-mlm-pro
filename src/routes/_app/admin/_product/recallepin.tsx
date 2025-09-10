import RecallEpin from '@/pages/RecallEpin';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/admin/_product/recallepin')({
  component: RecallEpin,
});
