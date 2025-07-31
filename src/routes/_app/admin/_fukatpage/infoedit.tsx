import DusaraFukatPage from '@/components/AdminSide/working pages/DusaraFukatPage';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/admin/_fukatpage/infoedit')({
  component: DusaraFukatPage,
});
