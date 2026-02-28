import DownlineList from '@/pages/DownlineList';
import {createFileRoute} from '@tanstack/react-router';
import React from 'react';
export const Route = createFileRoute('/_app/customer/downlinelist')({
  component: () => <DownlineList />,
});
