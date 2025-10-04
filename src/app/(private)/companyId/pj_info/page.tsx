
"use client";
import { useState, useMemo } from "react";
import { improved_projects, improved_employees, improved_positions, improved_memberships, improved_organizations, improved_project_memberships } from "../dummy_data";
import { Project, IndustryType, ProjectScale } from "../schema";
import { getCurrentProjectMembers, ProjectMemberInfo } from '@/utils/organizationUtils';
import { ProjectMemberListModal } from "@/components/project/ProjectMemberListModal";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Box,
  Typography,
  Stack,
  IconButton,
  Button,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import FilterListIcon from "@mui/icons-material/FilterList";

const industryLabels: Record<IndustryType, string> = {
  information_technology: "IT・情報通信",
  manufacturing: "製造業",
  finance: "金融・保険",
  healthcare: "医療・ヘルスケア",
  retail: "小売・流通",
  construction: "建設・不動産",
  education: "教育・研修",
  government: "官公庁・自治体",
  logistics: "物流・運輸",
  media_entertainment: "メディア・エンターテイメント",
  energy_utilities: "エネルギー・公共事業",
  agriculture: "農業・食品",
  automotive: "自動車",
  telecommunications: "通信",
  consulting: "コンサルティング",
  other: "その他",
};
const scaleLabels: Record<ProjectScale, string> = {
  small: "小規模 (1-5人)",
  medium: "中規模 (6-15人)",
  large: "大規模 (16-50人)",
  enterprise: "超大規模 (51人以上)",
};
const scaleColors: Record<ProjectScale, string> = {
  small: "#a0d5b4",
  medium: "#75bd9c", 
  large: "#4aa584",
  enterprise: "#1f8d6cff",
};

type SortField = "name" | "industry" | "client_name" | "scale" | "start_date" | "end_date" | "status";
type SortOrder = "asc" | "desc";

type ProjectStatus = "not_started" | "in_progress" | "completed";

const statusLabels: Record<ProjectStatus, string> = {
  not_started: "未着手",
  in_progress: "進行中",
  completed: "完了",
};

const statusColors: Record<ProjectStatus, "default" | "info" | "success"> = {
  not_started: "default",
  in_progress: "info",
  completed: "success",
};

export default function ProjectListPage() {
  const [projects] = useState<Project[]>(improved_projects);
  const [employees] = useState(improved_employees);
  const [positions] = useState(improved_positions);
  const [memberships] = useState(improved_memberships);
  const [organizations] = useState(improved_organizations);
  const [projectMemberships] = useState(improved_project_memberships);
  
  const [filterIndustry, setFilterIndustry] = useState<IndustryType | "">("");
  const [filterScale, setFilterScale] = useState<ProjectScale | "">("");
  const [filterClient, setFilterClient] = useState("");
  const [sortField, setSortField] = useState<SortField>("start_date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [showInlineFilters, setShowInlineFilters] = useState({
    name: false,
    industry: false,
    client_name: false,
    scale: false,
    start_date: false,
    status: false,
  });

  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState<ProjectStatus | "">("");
  
  // プロジェクトメンバー表示用のモーダル状態
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProjectMembers, setCurrentProjectMembers] = useState<ProjectMemberInfo[]>([]);

  const getProjectStatus = (project: Project): ProjectStatus => {
    const today = new Date();
    const startDate = new Date(project.start_date);
    const endDate = project.end_date ? new Date(project.end_date) : null;

    if (startDate > today) {
      return "not_started";
    } else if (!endDate || endDate > today) {
      return "in_progress";
    } else {
      return "completed";
    }
  };

  const filteredAndSortedProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      if (filterIndustry && project.industry !== filterIndustry) return false;
      if (filterScale && project.scale !== filterScale) return false;
      if (filterClient && !project.client_name.toLowerCase().includes(filterClient.toLowerCase())) return false;
      if (filterName && !project.name.toLowerCase().includes(filterName.toLowerCase())) return false;
      if (filterStatus && getProjectStatus(project) !== filterStatus) return false;
      return true;
    });
    filtered.sort((a, b) => {
      let valueA: string | number;
      let valueB: string | number;
      
      if (sortField === "status") {
        valueA = getProjectStatus(a);
        valueB = getProjectStatus(b);
      } else {
        const rawValueA = a[sortField];
        const rawValueB = b[sortField];
        
        if (sortField === "start_date" || sortField === "end_date") {
          valueA = rawValueA ? new Date(rawValueA as string).getTime() : 0;
          valueB = rawValueB ? new Date(rawValueB as string).getTime() : 0;
        } else {
          valueA = rawValueA as string;
          valueB = rawValueB as string;
        }
      }
      
      if (typeof valueA === "string") {
        valueA = valueA.toLowerCase();
        valueB = (valueB as string).toLowerCase();
      }
      if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return filtered;
  }, [projects, filterIndustry, filterScale, filterClient, filterName, filterStatus, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const formatDateRange = (startDate: Date, endDate: Date | null) => {
    const start = new Date(startDate).toLocaleDateString("ja-JP");
    const end = endDate ? new Date(endDate).toLocaleDateString("ja-JP") : "継続中";
    return `${start} ～ ${end}`;
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <SortIcon fontSize="small" sx={{ verticalAlign: "middle" }} />;
    return sortOrder === "asc" ? (
      <ArrowUpwardIcon fontSize="small" sx={{ verticalAlign: "middle" }} />
    ) : (
      <ArrowDownwardIcon fontSize="small" sx={{ verticalAlign: "middle" }} />
    );
  };

  const resetFilters = () => {
    setFilterIndustry("");
    setFilterScale("");
    setFilterClient("");
    setFilterName("");
    setFilterStatus("");
    setShowInlineFilters({
      name: false,
      industry: false,
      client_name: false,
      scale: false,
      start_date: false,
      status: false,
    });
  };

  const toggleInlineFilter = (field: keyof typeof showInlineFilters) => {
    setShowInlineFilters(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // プロジェクト名クリック時の処理
  const handleProjectClick = (project: Project) => {
    const members = getCurrentProjectMembers(
      project.id,
      employees,
      positions,
      memberships,
      organizations,
      projectMemberships
    );
    setSelectedProject(project);
    setCurrentProjectMembers(members);
    setModalOpen(true);
  };

  // モーダルを閉じる処理
  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedProject(null);
    setCurrentProjectMembers([]);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={2} textAlign="center">
        プロジェクト一覧
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3} textAlign="center">
        全 {filteredAndSortedProjects.length} 件のプロジェクト
      </Typography>

      {/* 統計情報 */}

      {/* プロジェクト一覧テーブル */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <span>プロジェクト名</span>
                  <IconButton size="small" onClick={() => handleSort("name")}>{getSortIcon("name")}</IconButton>
                  <IconButton size="small" onClick={() => toggleInlineFilter("name")}>
                    <FilterListIcon fontSize="small" color={showInlineFilters.name ? "primary" : "action"} />
                  </IconButton>
                </Stack>
              </TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <span>業界</span>
                  <IconButton size="small" onClick={() => handleSort("industry")}>{getSortIcon("industry")}</IconButton>
                  <IconButton size="small" onClick={() => toggleInlineFilter("industry")}>
                    <FilterListIcon fontSize="small" color={showInlineFilters.industry ? "primary" : "action"} />
                  </IconButton>
                </Stack>
              </TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <span>顧客</span>
                  <IconButton size="small" onClick={() => handleSort("client_name")}>{getSortIcon("client_name")}</IconButton>
                  <IconButton size="small" onClick={() => toggleInlineFilter("client_name")}>
                    <FilterListIcon fontSize="small" color={showInlineFilters.client_name ? "primary" : "action"} />
                  </IconButton>
                </Stack>
              </TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <span>規模</span>
                  <IconButton size="small" onClick={() => handleSort("scale")}>{getSortIcon("scale")}</IconButton>
                  <IconButton size="small" onClick={() => toggleInlineFilter("scale")}>
                    <FilterListIcon fontSize="small" color={showInlineFilters.scale ? "primary" : "action"} />
                  </IconButton>
                </Stack>
              </TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <span>期間</span>
                  <IconButton size="small" onClick={() => handleSort("start_date")}>{getSortIcon("start_date")}</IconButton>
                  <IconButton size="small" onClick={() => toggleInlineFilter("start_date")}>
                    <FilterListIcon fontSize="small" color={showInlineFilters.start_date ? "primary" : "action"} />
                  </IconButton>
                </Stack>
              </TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <span>状況</span>
                  <IconButton size="small" onClick={() => handleSort("status")}>{getSortIcon("status")}</IconButton>
                  <IconButton size="small" onClick={() => toggleInlineFilter("status")}>
                    <FilterListIcon fontSize="small" color={showInlineFilters.status ? "primary" : "action"} />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
            {/* インラインフィルタ行 */}
            {(showInlineFilters.name || showInlineFilters.industry || showInlineFilters.client_name || showInlineFilters.scale || showInlineFilters.start_date || showInlineFilters.status) && (
              <TableRow>
                <TableCell>
                  {showInlineFilters.name && (
                    <TextField
                      size="small"
                      placeholder="プロジェクト名で検索..."
                      fullWidth
                      variant="outlined"
                      value={filterName}
                      onChange={(e) => setFilterName(e.target.value)}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {showInlineFilters.industry && (
                    <FormControl fullWidth size="small">
                      <Select
                        value={filterIndustry}
                        displayEmpty
                        onChange={(e) => setFilterIndustry(e.target.value as IndustryType | "")}
                      >
                        <MenuItem value="">全ての業界</MenuItem>
                        {Object.entries(industryLabels).map(([key, label]) => (
                          <MenuItem key={key} value={key}>{label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </TableCell>
                <TableCell>
                  {showInlineFilters.client_name && (
                    <TextField
                      size="small"
                      placeholder="顧客名で検索..."
                      fullWidth
                      variant="outlined"
                      value={filterClient}
                      onChange={(e) => setFilterClient(e.target.value)}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {showInlineFilters.scale && (
                    <FormControl fullWidth size="small">
                      <Select
                        value={filterScale}
                        displayEmpty
                        onChange={(e) => setFilterScale(e.target.value as ProjectScale | "")}
                      >
                        <MenuItem value="">全ての規模</MenuItem>
                        {Object.entries(scaleLabels).map(([key, label]) => (
                          <MenuItem key={key} value={key}>{label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </TableCell>
                <TableCell>
                  {showInlineFilters.start_date && (
                    <Typography variant="caption" color="text.secondary">
                      期間フィルタ（未実装）
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {showInlineFilters.status && (
                    <FormControl fullWidth size="small">
                      <Select
                        value={filterStatus}
                        displayEmpty
                        onChange={(e) => setFilterStatus(e.target.value as ProjectStatus | "")}
                      >
                        <MenuItem value="">全ての状況</MenuItem>
                        {Object.entries(statusLabels).map(([key, label]) => (
                          <MenuItem key={key} value={key}>{label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {filteredAndSortedProjects.map((project) => (
              <TableRow key={project.id} hover>
                <TableCell>
                  <Typography 
                    fontWeight="bold" 
                    color="primary.main"
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                    onClick={() => handleProjectClick(project)}
                  >
                    {project.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={industryLabels[project.industry]}
                    color="info"
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={project.client_name}
                    color="default"
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={scaleLabels[project.scale]}
                    variant="filled"
                    size="small"
                    sx={{
                      backgroundColor: scaleColors[project.scale],
                      color: 'white',
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography>
                    {formatDateRange(project.start_date, project.end_date)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={statusLabels[getProjectStatus(project)]}
                    color={statusColors[getProjectStatus(project)]}
                    variant="filled"
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredAndSortedProjects.length === 0 && (
          <Box textAlign="center" py={6}>
            <Typography color="text.secondary" mb={2}>
              条件に一致するプロジェクトが見つかりません
            </Typography>
            <Button variant="contained" onClick={resetFilters}>
              フィルタをリセット
            </Button>
          </Box>
        )}
      </TableContainer>
      
      {/* プロジェクトメンバー表示モーダル */}
      <ProjectMemberListModal
        project={selectedProject}
        members={currentProjectMembers}
        open={modalOpen}
        onClose={handleModalClose}
      />
    </Box>
  );
}
