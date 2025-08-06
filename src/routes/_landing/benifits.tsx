import BenefitsSection from '@/components/website/ConnectingPeoplePage';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_landing/benifits')({
  component: BenefitsSection,
});
