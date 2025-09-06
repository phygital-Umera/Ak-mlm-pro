import {createFileRoute} from '@tanstack/react-router';
import WlcmLetter from '@/pages/WlcmLetter';

export const Route = createFileRoute('/_app/admin/wlcmletter')({
  component: WlcmLetter,
});
