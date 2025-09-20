'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// react-organizational-chartをSSRを無効にして動的インポート
const Tree = dynamic(
  () => import('react-organizational-chart').then(mod => mod.Tree),
  { ssr: false }
);

const TreeNode = dynamic(
  () => import('react-organizational-chart').then(mod => mod.TreeNode),
  { ssr: false }
);

export default function ExampleTree() {
  return (
    <Tree label={<div>Root</div>}>
      <TreeNode label={<div>Child 1</div>}>
        <TreeNode label={<div>Grand Child</div>} />
        <TreeNode label={<div>Grand Child</div>} />
      </TreeNode>
    </Tree>
  );
}