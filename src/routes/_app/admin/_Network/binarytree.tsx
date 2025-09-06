import BinaryTree from '@/pages/BinaryTree';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/admin/_Network/binarytree')({
  component: BinaryTree,
});
