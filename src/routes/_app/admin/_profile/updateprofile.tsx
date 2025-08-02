import UpdateProfile from '@/components/Profile/UpdateProfile';
import {createFileRoute} from '@tanstack/react-router';
import React from 'react';

export const Route = createFileRoute('/_app/admin/_profile/updateprofile')({
  component: () => <UpdateProfile />,
});
