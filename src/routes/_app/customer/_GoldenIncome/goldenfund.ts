import GoldenIncome from '@/components/UserSide/GoldIncome/GoldenIncome';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/customer/_GoldenIncome/goldenfund')(
  {
    component: GoldenIncome,
  },
);
