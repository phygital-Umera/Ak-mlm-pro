import CustomerList from '@/components/UserSide/CustomerProfileU/CustomerList';
import {createFileRoute} from '@tanstack/react-router';
import React from 'react';

export const Route = createFileRoute(
  '/_app/customer/_customerlist/customerlist',
)({
  component: () => <CustomerList />,
});
