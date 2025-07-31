import AwardReward from '@/components/AdminSide/UpdateFeatures/AwardReward';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_app/admin/_updatefeatures/_awardreward/awardreward',
)({
  component: AwardReward,
});
