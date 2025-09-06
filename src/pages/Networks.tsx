import React, { useState, useEffect } from 'react';
import '../app.css';
import { TreeNode } from '@/components/Network';
import { useGetNetwotkTree } from '@/lib/react-query/network';
import { useAuthContext } from '@/context/AuthContext';
import Loader from '@/components/common/Loader';

// Recursive function to find node by CRN ID
const findNodeById = (node: any, id: string): any => {
  if (!node) return null;
  if (node.data?.id === id) return node;

  for (const child of node.children || []) {
    const found = findNodeById(child, id);
    if (found) return found;
  }

  return null;
};

const Network = () => {
  const { user } = useAuthContext();
  const { data, isSuccess, isPending, isError } = useGetNetwotkTree();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTree, setFilteredTree] = useState<any>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter the tree whenever searchTerm changes
  useEffect(() => {
    if (searchTerm && data) {
      const node = findNodeById(data, searchTerm);
      setFilteredTree(node);
    } else {
      setFilteredTree(null); // Show full tree if search is empty
    }
  }, [searchTerm, data]);

  if (isPending) return <Loader />;
  if (isError) return <div className="dottedBackground mx-8">Error loading network.</div>;

  return (
    <>
      {/* Search Bar */}
      <div className="mx-8 my-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Enter CRN ID, e.g. CRN0000000"
          className="border px-3 py-2 rounded-md w-full md:w-1/3"
        />
      </div>

      {/* Tree Section */}
      {isSuccess && (
        <div className="dottedBackground mx-8">
          <TreeNode network={filteredTree || data} />
        </div>
      )}
    </>
  );
};

export default Network;
