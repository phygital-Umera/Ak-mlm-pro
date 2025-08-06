import ExpertReviews from '@/components/website/AboutUs';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_landing/review')({
  component: ExpertReviews,
});
