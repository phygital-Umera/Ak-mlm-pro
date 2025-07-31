import DownSide, {Bottombar} from '@/components/website/Bottombar';
import {createFileRoute} from '@tanstack/react-router';
import React from 'react';

export const Route = createFileRoute('/_landing/bottombar')({
  component: Bottombar,
});
