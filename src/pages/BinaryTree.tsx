/*eslint-disable */

import React, {useState, useEffect} from 'react';
import {useGetNetwotkBinaryTree} from '@/lib/react-query/network';
import Loader from '@/components/common/Loader';
import BinaryTreeNode from '@/components/Network/BinaryTreeNode';

// Recursive function to find a node by ID in the tree
const findNodeById = (node: any, id: string): any => {
  if (!node) return null;
  if (node.data?.id === id) return node;

  for (const child of node.children || []) {
    const found = findNodeById(child, id);
    if (found) return found;
  }
  return null;
};

const BinaryTree = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTree, setFilteredTree] = useState<any>(null);

  const {data, isSuccess, isPending, isError} = useGetNetwotkBinaryTree();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filter tree whenever searchTerm changes
  useEffect(() => {
    if (searchTerm && data) {
      const node = findNodeById(data, searchTerm);
      setFilteredTree(node);
    } else {
      setFilteredTree(null); // Show full tree if no search
    }
  }, [searchTerm, data]);

  // if (isPending) return <Loader />;
  // if (isError) return <div className="dottedBackground mx-8">Error loading network.</div>;

  return (
    <>
      {/* Search Bar */}
      <div className="mx-8 my-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Enter CRN ID, e.g. CRN0000000"
          className="w-full rounded-md border px-3 py-2 md:w-1/3"
        />
      </div>

      {/* Tree Section */}
      {isSuccess && (
        <div className="dottedBackground mx-8">
          <BinaryTreeNode network={filteredTree || data} />
        </div>
      )}
    </>
  );
};

export default BinaryTree;
