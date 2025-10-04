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
import { Project } from '../../app/(private)/companyId/schema';
import { ProjectMemberInfo } from '../../utils/organizationUtils';

interface ProjectMemberListModalProps {
  project: Project | null;
  members: ProjectMemberInfo[];
  open: boolean;
  onClose: () => void;
}

// プロジェクト役割のラベル定義
const roleLabels = {
  'project_manager': 'プロジェクトマネージャー',
  'team_leader': 'チームリーダー',
  'senior_member': 'シニアメンバー',
  'member': 'メンバー',
  'support': 'サポート'
};

// プロジェクト役割の色定義
const roleColors = {
  'project_manager': 'error',
  'team_leader': 'warning',
  'senior_member': 'info',
  'member': 'primary',
  'support': 'default'
} as const;

// プロジェクトメンバー情報モーダルコンポーネント
export const ProjectMemberListModal: React.FC<ProjectMemberListModalProps> = ({ 
  project, 
  members,
  open, 
  onClose 
}) => {
  if (!project) return null;
  
  // アサイン期間をフォーマットする関数
  const formatAssignmentPeriod = (startDate: Date, endDate: Date | null) => {
    const start = startDate.toLocaleDateString('ja-JP');
    const end = endDate ? endDate.toLocaleDateString('ja-JP') : '継続中';
    return `${start} ～ ${end}`;
  };
  
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="project-member-modal-title"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '95%', sm: '90%', md: '85%' },
          maxWidth: 1200,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          maxHeight: '80vh',
          overflow: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography id="project-member-modal-title" variant="h5" component="h2">
              {project.name} のアサインメンバー
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              {new Date().toLocaleDateString('ja-JP')} 時点
            </Typography>
          </Box>
          <IconButton onClick={onClose} color="primary">
            <CloseIcon />
          </IconButton>
        </Box>

        {members.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            現在アサインされているメンバーはいません
          </Typography>
        ) : (
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>プロジェクト役割</strong></TableCell>
                  <TableCell><strong>氏名</strong></TableCell>
                  <TableCell><strong>組織役職</strong></TableCell>
                  <TableCell><strong>所属組織</strong></TableCell>
                  <TableCell><strong>アサイン率</strong></TableCell>
                  <TableCell><strong>アサイン期間</strong></TableCell>
                  <TableCell><strong>メールアドレス</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map(({ employee, position, organization, projectMembership }) => (
                  <TableRow key={`${employee.id}-${project.id}`} hover>
                    <TableCell>
                      <Chip 
                        label={roleLabels[projectMembership.role]} 
                        color={roleColors[projectMembership.role]}
                        variant="filled" 
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
                      <Chip 
                        label={position.title} 
                        color="primary" 
                        variant="outlined" 
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="primary">
                        {organization.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {projectMembership.allocation_percentage}%
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatAssignmentPeriod(projectMembership.start_date, projectMembership.end_date)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {employee.email}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* 統計情報 */}
        {members.length > 0 && (
          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              プロジェクト統計
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  総メンバー数
                </Typography>
                <Typography variant="h6">
                  {members.length}名
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  アクティブメンバー数
                </Typography>
                <Typography variant="h6">
                  {members.filter(m => m.projectMembership.end_date === null).length}名
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
};