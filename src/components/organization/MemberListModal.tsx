'use client';

import React from 'react';
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
import { Organization } from '../../app/(private)/companyId/schema';
import { EmployeeInfo } from '../../utils/organizationUtils';

interface MemberListModalProps {
  organization: Organization | null;
  employees: EmployeeInfo[];
  open: boolean;
  onClose: () => void;
}

// 社員情報モーダルコンポーネント
export const MemberListModal: React.FC<MemberListModalProps> = ({ 
  organization, 
  employees,
  open, 
  onClose 
}) => {
  if (!organization) return null;
  
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
                {employees.map(({ employee, position, organization: empOrg }) => (
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