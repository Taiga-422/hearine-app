'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper
} from '@mui/material';
import dynamic from 'next/dynamic';
import { 
  improved_organizations, 
  improved_employees, 
  improved_positions, 
  improved_memberships 
} from '../dummy_data';
import { Organization } from '../schema';
import { MemberListModal } from '../../../../components/organization/MemberListModal';
import { getEmployeesInOrganizationHierarchy } from '../../../../utils/organizationUtils';

// react-organizational-chartをSSRを無効にして動的インポート
const Tree = dynamic(
  () => import('react-organizational-chart').then(mod => mod.Tree),
  { ssr: false }
);

const TreeNode = dynamic(
  () => import('react-organizational-chart').then(mod => mod.TreeNode),
  { ssr: false }
);



// 組織ノードのコンポーネント
const OrganizationNode = ({ 
  organization, 
  onNodeClick 
}: { 
  organization: Organization;
  onNodeClick: (org: Organization) => void;
}) => {
  const getNodeColor = (type: string) => {
    switch (type) {
      case 'company': return "#1f8d6cff";
      case 'department': return "#4aa584";
      case 'section': return "#75bd9c";
      case 'team': return "#a0d5b4";
      default: return "#1f8d6cff";
    }
  };

  const getNodeLabel = (type: string) => {
    switch (type) {
      case 'company': return '会社';
      case 'department': return '部';
      case 'section': return '課';
      case 'team': return 'チーム';
      default: return '';
    }
  };

  const handleClick = () => {
    // 会社以外の組織でクリック処理を実行
    if (organization.organization_type !== 'company') {
      onNodeClick(organization);
    }
  };

  return (
    <Paper
      elevation={2}
      onClick={handleClick}
      sx={{
        p: 2,
        backgroundColor: getNodeColor(organization.organization_type),
        color: 'white',
        borderRadius: 2,
        minWidth: 120,
        textAlign: 'center',
        cursor: organization.organization_type !== 'company' ? 'pointer' : 'default',
        '&:hover': organization.organization_type !== 'company' ? {
          elevation: 4,
          transform: 'scale(1.05)',
        } : {},
        transition: 'all 0.2s ease-in-out',
      }}
    >
      <Typography variant="caption" sx={{ display: 'block', opacity: 0.8 }}>
        {getNodeLabel(organization.organization_type)}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
        {organization.name}
      </Typography>
    </Paper>
  );
};



// 再帰的に組織ツリーを構築する関数
const buildOrgTree = (
  parentId: string | null, 
  organizations: Organization[], 
  onNodeClick: (org: Organization) => void
) => {
  const children = organizations
    .filter(org => org.parent_id === parentId && org.is_active)
    .sort((a, b) => a.display_order - b.display_order);

  if (children.length === 0) {
    return null;
  }

  return children.map(child => (
    <TreeNode key={child.id} label={<OrganizationNode organization={child} onNodeClick={onNodeClick} />}>
      {buildOrgTree(child.id, organizations, onNodeClick)}
    </TreeNode>
  ));
};

export default function OrganizationChart() {
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // 組織ノードクリック時の処理
  const handleNodeClick = (organization: Organization) => {
    setSelectedOrganization(organization);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOrganization(null);
  };

  // 選択された組織の社員情報を取得
  const employeesData = selectedOrganization 
    ? getEmployeesInOrganizationHierarchy(
        selectedOrganization.id,
        improved_organizations,
        improved_employees,
        improved_positions,
        improved_memberships
      )
    : [];

  // 会社（ルートノード）を取得
  const rootOrganization = improved_organizations.find(
    org => org.organization_type === 'company' && org.parent_id === null && org.is_active
  );

  if (!rootOrganization) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" color="error">
          組織データが見つかりません
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" fontWeight="bold" mb={2} textAlign='center'>
        組織図
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
        部・課・チームをクリックすると所属メンバーを確認できます
      </Typography>
      
      <Box 
        sx={{ 
          overflow: 'auto',
          backgroundColor: 'white',
          borderRadius: 2,
          p: 3,
          border: '1px solid #e0e0e0'
        }}
      >
        <Tree label={<OrganizationNode organization={rootOrganization} onNodeClick={handleNodeClick} />}>
          {buildOrgTree(rootOrganization.id, improved_organizations, handleNodeClick)}
        </Tree>
      </Box>

      {/* 社員情報モーダル */}
      <MemberListModal
        organization={selectedOrganization}
        employees={employeesData}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </Box>
  );
}
