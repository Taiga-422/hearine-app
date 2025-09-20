'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import dynamic from 'next/dynamic';
import { 
  improved_organizations, 
  improved_employees, 
  improved_positions, 
  improved_memberships 
} from './dummy_data';
import { Organization, Employee, Position, OrganizationMembership } from './schema';

// react-organizational-chartをSSRを無効にして動的インポート
const Tree = dynamic(
  () => import('react-organizational-chart').then(mod => mod.Tree),
  { ssr: false }
);

const TreeNode = dynamic(
  () => import('react-organizational-chart').then(mod => mod.TreeNode),
  { ssr: false }
);

// 社員情報の型定義
interface EmployeeInfo {
  employee: Employee;
  position: Position;
  membership: OrganizationMembership;
  organization: Organization; // 所属組織情報を追加
}

// 指定組織の配下にある全ての組織IDを取得する関数
const getAllDescendantOrganizations = (organizationId: string): string[] => {
  const result = [organizationId]; // 自分自身も含める
  
  const findChildren = (parentId: string) => {
    const children = improved_organizations.filter(org => 
      org.parent_id === parentId && org.is_active
    );
    children.forEach(child => {
      result.push(child.id);
      findChildren(child.id); // 再帰的に子を探す
    });
  };
  
  findChildren(organizationId);
  return result;
};

// 組織とその配下の全組織に所属する社員を取得する関数
const getEmployeesInOrganizationHierarchy = (organizationId: string): EmployeeInfo[] => {
  const allOrgIds = getAllDescendantOrganizations(organizationId);
  
  const allEmployees: EmployeeInfo[] = [];
  
  allOrgIds.forEach(orgId => {
    const memberships = improved_memberships.filter(
      m => m.organization_id === orgId && m.end_date === null
    );
    
    memberships.forEach(membership => {
      const employee = improved_employees.find(e => e.id === membership.employee_id)!;
      const position = improved_positions.find(p => p.id === membership.position_id)!;
      const organization = improved_organizations.find(o => o.id === orgId)!;
      
      allEmployees.push({ employee, position, membership, organization });
    });
  });
  
  // 役職レベル順、同じレベルなら組織の表示順、同じ組織なら氏名順で並び替え
  return allEmployees.sort((a, b) => {
    if (a.position.level !== b.position.level) {
      return a.position.level - b.position.level;
    }
    if (a.organization.id !== b.organization.id) {
      return a.organization.display_order - b.organization.display_order;
    }
    return a.employee.last_name_kana.localeCompare(b.employee.last_name_kana);
  });
};

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

// 社員情報モーダルコンポーネント
const EmployeeModal = ({ 
  organization, 
  open, 
  onClose 
}: { 
  organization: Organization | null;
  open: boolean;
  onClose: () => void;
}) => {
  if (!organization) return null;

  const employees = getEmployeesInOrganizationHierarchy(organization.id);
  
  // 組織タイプに応じたタイトルを生成
  const getModalTitle = () => {
    if (organization.organization_type === 'department') {
      return `${organization.name} とその配下組織の所属メンバー`;
    } else if (organization.organization_type === 'section') {
      return `${organization.name} とその配下チームの所属メンバー`;
    } else {
      return `${organization.name} の所属メンバー`;
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="employee-modal-title"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '95%', sm: '90%', md: '80%' },
          maxWidth: 1000,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          maxHeight: '80vh',
          overflow: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography id="employee-modal-title" variant="h5" component="h2">
            {getModalTitle()}
          </Typography>
          <IconButton onClick={onClose} color="primary">
            <CloseIcon />
          </IconButton>
        </Box>

        {employees.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            所属しているメンバーはいません
          </Typography>
        ) : (
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>役職</strong></TableCell>
                  <TableCell><strong>氏名</strong></TableCell>
                  <TableCell><strong>所属</strong></TableCell>
                  <TableCell><strong>メールアドレス</strong></TableCell>
                  <TableCell><strong>入社日</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map(({ employee, position, membership, organization: empOrg }) => (
                  <TableRow key={`${employee.id}-${empOrg.id}`} hover>
                    <TableCell>
                      <Chip 
                        label={position.title} 
                        color="primary" 
                        variant="outlined" 
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {employee.last_name_kanji} {employee.first_name_kanji}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {employee.last_name_kana} {employee.first_name_kana}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="primary">
                        {empOrg.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {employee.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {employee.hire_date.toLocaleDateString('ja-JP')}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Modal>
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
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
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
      <EmployeeModal
        organization={selectedOrganization}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </Box>
  );
}
