import React from 'react';

import WalletHistory from '@/components/AdminSide/Wallet/WalletHistory';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/admin/_wallet/wallethistory')({
  component: () => <WalletHistory />,
});
