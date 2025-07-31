import DisplayHelping from '@/components/UserSide/Helping/DisplayHelping';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/customer/_helpingdata/helping')({
  component: DisplayHelping,
});
