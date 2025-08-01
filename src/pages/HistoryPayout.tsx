import React, {useState} from 'react';
import GenericTable from '@/components/Forms/Table/GenericTable';
import {Column} from '@/types';
import {useFetchPayout} from '@/lib/react-query/Customer/payout';

interface PayoutEntry {
  srNo: number;
  crn: string;
  name: string;
  binary: number;
  royalty: number;
  repurchase: number;
  total: number;
}

const HistoryPayout: React.FC = () => {
  const {data: apiData, isLoading, error} = useFetchPayout();
  const [payoutData, setPayoutData] = useState<PayoutEntry[]>([]);
  const [form, setForm] = useState({
    crn: '',
    name: '',
    binary: '',
    royalty: '',
    repurchase: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEntry: PayoutEntry = {
      srNo: payoutData.length + 1,
      crn: form.crn,
      name: form.name,
      binary: Number(form.binary),
      royalty: Number(form.royalty),
      repurchase: Number(form.repurchase),
      total:
        Number(form.binary) + Number(form.royalty) + Number(form.repurchase),
    };

    setPayoutData([...payoutData, newEntry]);

    setForm({
      crn: '',
      name: '',
      binary: '',
      royalty: '',
      repurchase: '',
    });
  };

  const columns: Column<PayoutEntry>[] = [
    {header: 'Sr. No.', accessor: 'srNo'},
    {header: 'CRN', accessor: 'crn'},
    {header: 'Name', accessor: 'name'},
    {header: 'Binary', accessor: 'binary'},
    {header: 'Royalty', accessor: 'royalty'},
    {header: 'Repurchase', accessor: 'repurchase'},
    {header: 'Total', accessor: 'total'},
  ];

  return (
    <div>
      {isLoading ? (
        <p className="text-center">Pending...</p>
      ) : (
        <GenericTable
          title="Payout History"
          data={apiData?.data}
          columns={columns}
          itemsPerPage={5}
        />
      )}
    </div>
  );
};

export default HistoryPayout;
