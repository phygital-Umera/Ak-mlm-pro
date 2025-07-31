import {createFileRoute} from '@tanstack/react-router';
import React from 'react';

export const Route = createFileRoute('/_landing/login')({
  component: () => <div>Hello /_app/navbarroutes/login!</div>,
});
