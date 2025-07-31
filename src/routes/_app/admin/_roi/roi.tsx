import DisplayRoiList from '@/components/AdminSide/ROI/DisplayRoiList';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/admin/_roi/roi')({
  component: DisplayRoiList,
});
