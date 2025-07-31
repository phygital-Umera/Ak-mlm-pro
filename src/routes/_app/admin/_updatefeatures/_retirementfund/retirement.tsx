import RetirementFund from '@/components/AdminSide/UpdateFeatures/RetirementFund';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_app/admin/_updatefeatures/_retirementfund/retirement',
)({
  component: RetirementFund,
});
