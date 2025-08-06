import ResultFooter from '@/components/website/MissionVision';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_landing/result&footer')({
  component: ResultFooter,
});
