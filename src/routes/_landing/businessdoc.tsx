import React from 'react';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_landing/businessdoc')({
  component: () => <div>Hello /_app/navbarroutes/businessdoc!</div>,
});
