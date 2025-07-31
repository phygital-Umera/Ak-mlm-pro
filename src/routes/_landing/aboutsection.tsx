import About from '@/components/website/About';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_landing/aboutsection')({
  component: About,
});
