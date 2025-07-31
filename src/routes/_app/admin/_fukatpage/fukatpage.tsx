import FukatPage from '@/components/AdminSide/working pages/FukatPage';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/admin/_fukatpage/fukatpage')({
  component: FukatPage,
});
