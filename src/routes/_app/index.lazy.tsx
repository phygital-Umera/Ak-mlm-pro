import React from 'react';
import {useAuthContext} from '@/context/AuthContext';
import LandingPage from '@/pages/LandingPage';
import {createLazyFileRoute, useNavigate} from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_app/')({
  // component: Calendar,
  component: () => {
    const {isAuthenticated} = useAuthContext();
    const navigate = useNavigate();
    if (isAuthenticated) {
      navigate({to: '/dashboard'});
    }

    return (
      <>
        <LandingPage />
      </>
    );
  },
});
