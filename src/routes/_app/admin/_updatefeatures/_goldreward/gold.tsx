import GoldRewards from '@/components/AdminSide/UpdateFeatures/GoldRewards';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_app/admin/_updatefeatures/_goldreward/gold',
)({
  component: GoldRewards,
});
