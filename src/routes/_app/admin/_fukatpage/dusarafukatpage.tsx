import DusaraFukatPage from '@/components/AdminSide/Fukatpage/DusaraFukatPage';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/admin/_fukatpage/dusarafukatpage')({
  component: DusaraFukatPage,
});
