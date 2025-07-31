import AdminZeroEpinManagement from '@/pages/AdminZeroEpinManagement';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/admin/_zeroepin/zeroepin')({
  component: AdminZeroEpinManagement,
});
