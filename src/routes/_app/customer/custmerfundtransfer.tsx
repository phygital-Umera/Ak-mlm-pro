import CustomerFundTransfer from '@/pages/CustomerFundTransfer';
import {createFileRoute} from '@tanstack/react-router';
import React from 'react';
export const Route = createFileRoute('/_app/customer/custmerfundtransfer')({
  component: () => <CustomerFundTransfer />,
});
