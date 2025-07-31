import PowerLegPage from '@/pages/PowerLegPage';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/admin/_powerleg/powerleg/$id')({
  component: PowerLegPage,
});
