import NetworkTreeNew from '@/pages/NetworkTreeNew';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/admin/_autopooltree/autopoolnew')({
  component: NetworkTreeNew,
});
