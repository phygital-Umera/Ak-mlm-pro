import Leadership from '@/components/AdminSide/UpdateFeatures/Leadership';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_app/admin/_updatefeatures/_leadershipfund/leadership',
)({
  component: Leadership,
});
