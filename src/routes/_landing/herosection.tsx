import HeroSection from '@/components/website/HeroSection';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_landing/herosection')({
  component: HeroSection,
});
