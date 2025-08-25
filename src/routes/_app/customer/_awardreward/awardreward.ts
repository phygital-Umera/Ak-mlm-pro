import AwardReward from '@/components/AdminSide/UpdateFeatures/AwardReward';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/customer/_awardreward/awardreward')(
  {
    component: AwardReward,
  },
);
