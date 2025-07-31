import Loader from '@/components/common/Loader';
import GenericTable, {Column} from '@/components/Forms/Table/GenericTable';
import {useGetAdminPins} from '@/lib/react-query/Admin/Epin/epin';
import React from 'react';
import toast from 'react-hot-toast';

type EpinData = {
  id: string;
  epinNo: string;
  createdAt: string;
  isUsed: boolean;
  usedAt: string | null;
  usedBy: string | null;
  useCount: number;
  type: 'ZERO' | 'REGULAR';
};

const EpinColumn: Column<EpinData>[] = [
  {header: 'Created At', accessor: 'createdAt'},
  {header: 'E-Pin No', accessor: 'epinNo'},
  {header: 'Used', accessor: 'isUsed', sortable: true},
  {header: 'Used By', accessor: 'usedBy'},
  // { header: 'Use Count', accessor: 'useCount', sortable: true },
];

const DisplayZeroEpin: React.FC = () => {
  const {data: epinData, isSuccess, isLoading} = useGetAdminPins();
  console.log('====================================');
  console.log('epinData', epinData);
  console.log('====================================');
  if (isLoading) return <Loader />;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formattedZeroData: EpinData[] =
    isSuccess && Array.isArray(epinData)
      ? epinData
          .filter((epin) => epin.type === 'ZERO')
          .map((epin) => ({
            ...epin,
            createdAt: formatDate(epin.createdAt),
            usedAt: formatDate(epin.usedAt),
            usedBy: epin.usedBy || '-',
            useCount: epin.useCount ?? 0,
          }))
      : [];

  const formattedRegularData: EpinData[] =
    isSuccess && Array.isArray(epinData)
      ? epinData
          .filter((epin) => epin.type === 'REGULAR')
          .map((epin) => ({
            ...epin,
            createdAt: formatDate(epin.createdAt),
            usedAt: formatDate(epin.usedAt),
            usedBy: epin.usedBy || '-',
            useCount: epin.useCount ?? 0,
          }))
      : [];

  const handleCopy = (item: EpinData) => {
    navigator.clipboard.writeText(item.epinNo);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="space-y-8">
      <GenericTable
        data={formattedZeroData}
        columns={EpinColumn}
        itemsPerPage={15}
        searchAble
        title="Zero E-Pins"
        key="zero-epin"
        onCopy={handleCopy}
      />
      <GenericTable
        data={formattedRegularData}
        columns={EpinColumn}
        itemsPerPage={15}
        searchAble
        title="Regular E-Pins"
        key="regular-epin"
        onCopy={handleCopy}
      />
    </div>
  );
};

export default DisplayZeroEpin;
