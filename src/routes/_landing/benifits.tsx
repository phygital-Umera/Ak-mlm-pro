import BenefitsSection from '@/components/website/Benefits';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_landing/benifits')({
  component: BenefitsSection,
});
