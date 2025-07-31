import GoldenIncomeList from '@/components/AdminSide/GoldenIncomeList/GoldenIncomeList';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_app/admin/_goldenIncomeList/goldenlist',
)({
  component: GoldenIncomeList,
});
