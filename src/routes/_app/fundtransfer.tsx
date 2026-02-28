import FundTransfer from '@/pages/FundTransfer';
import {createFileRoute} from '@tanstack/react-router';
import React from 'react';
export const Route = createFileRoute('/_app/fundtransfer')({
  component: () => <FundTransfer />,
});
