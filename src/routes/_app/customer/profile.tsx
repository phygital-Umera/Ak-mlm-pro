import CustomerUpdateProfile from '@/components/Profile/CustomerProfileUpdate';
import {createFileRoute} from '@tanstack/react-router';
import React from 'react';

export const Route = createFileRoute('/_app/customer/profile')({
  component: () => <CustomerUpdateProfile />,
});
