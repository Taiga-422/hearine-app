"use client";

import { useState } from "react";
import { Typography, Box, Paper, Stack, IconButton } from "@mui/material";
import { ExpandMore, ChevronRight } from "@mui/icons-material";
import {
  employees,
  departments,
  sections,
  teams,
  positions,
  department_employees,
  section_employees,
  team_employees,
} from "@/app/(private)/oz_info/dummy_data";

// === ユーティリティ関数 ===
const getPositionTitle = (position_id: string) => {
  return positions.find((p) => p.id === position_id)?.title || "";
};

const sortEmployeesByPosition = (emps: typeof employees) => {
  return emps.sort(
    (a, b) =>
      (positions.find((p) => p.id === a.position_id)?.display_order ?? 99) -
      (positions.find((p) => p.id === b.position_id)?.display_order ?? 99)
  );
};

const getEmployeesByTeam = (team_id: string) => {
  const empIds = team_employees
    .filter((te) => te.team_id === team_id)
    .map((te) => te.employee_id);
  return employees.filter((e) => empIds.includes(e.id));
};

const getTeamsBySection = (section_id: string) => {
  return teams.filter((t) => t.section_id === section_id).sort((a, b) => a.display_order - b.display_order);
};

const getSectionsByDepartment = (department_id: string) => {
  return sections.filter((s) => s.department_id === department_id).sort((a, b) => a.display_order - b.display_order);
};

const getEmployeesBySection = (section_id: string) => {
  const empIds = section_employees
    .filter((se) => se.section_id === section_id)
    .map((se) => se.employee_id);
  return employees.filter((e) => empIds.includes(e.id));
};

const getEmployeesByDepartment = (department_id: string) => {
  const empIds = department_employees
    .filter((de) => de.department_id === department_id)
    .map((de) => de.employee_id);
  return employees.filter((e) => empIds.includes(e.id));
};

// === 表示用コンポーネント ===
const TeamBox = ({ team }: { team: typeof teams[number] }) => {
  const members = sortEmployeesByPosition(getEmployeesByTeam(team.id));

  return (
    <Paper elevation={1} sx={{ p: 2, minWidth: 200 }}>
      <Typography variant="subtitle2" fontWeight="bold">
        {team.name}
      </Typography>
      {members.map((m) => (
        <Typography key={m.id} variant="body2">
          {m.last_name_kanji} {m.first_name_kanji}（{getPositionTitle(m.position_id)}）
        </Typography>
      ))}
    </Paper>
  );
};

const SectionBox = ({ section }: { section: typeof sections[number] }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded((prev) => !prev);

  const teamsInSection = getTeamsBySection(section.id);
  const sectionMembers = sortEmployeesByPosition(getEmployeesBySection(section.id));
  const noTeamMembers = sectionMembers.filter(
    (m) => !team_employees.find((te) => te.employee_id === m.id)
  );

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Box display="flex" alignItems="center" sx={{ cursor: "pointer" }} onClick={toggleExpand}>
        <IconButton size="small" sx={{ mr: 1 }}>
          {expanded ? <ExpandMore /> : <ChevronRight />}
        </IconButton>
        <Typography variant="subtitle1" fontWeight="bold">
          {section.name}
        </Typography>
      </Box>

      {noTeamMembers.length > 0 && (
        <Box sx={{ ml: 4, mt: 1 }}>
          {noTeamMembers.map((m) => (
            <Typography key={m.id}>
              {m.last_name_kanji} {m.first_name_kanji}（{getPositionTitle(m.position_id)}）
            </Typography>
          ))}
        </Box>
      )}

      {expanded && (
        <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mt: 2, ml: 4 }}>
          {teamsInSection.map((team) => (
            <TeamBox key={team.id} team={team} />
          ))}
        </Stack>
      )}
    </Paper>
  );
};

const DepartmentBox = ({ department }: { department: typeof departments[number] }) => {
  const deptEmployees = sortEmployeesByPosition(getEmployeesByDepartment(department.id));
  const sectionList = getSectionsByDepartment(department.id);
  const noSectionMembers = deptEmployees.filter(
    (e) => !section_employees.find((se) => se.employee_id === e.id)
  );

  return (
    <Paper elevation={3} sx={{ p: 3, width: "100%" }}>
      <Typography variant="h6" gutterBottom>
        {department.name}
      </Typography>

      {noSectionMembers.length > 0 && (
        <Box sx={{ mb: 2 }}>
          {noSectionMembers.map((m) => (
            <Typography key={m.id}>
              {m.last_name_kanji} {m.first_name_kanji}（{getPositionTitle(m.position_id)}）
            </Typography>
          ))}
        </Box>
      )}

      <Stack spacing={2}>
        {sectionList.map((section) => (
          <SectionBox key={section.id} section={section} />
        ))}
      </Stack>
    </Paper>
  );
};

export default function HomePage() {
  const sortedDepartments = departments.sort((a, b) => a.display_order - b.display_order);

  return (
    <main style={{ padding: "2rem" }}>
      <Typography variant="h5" gutterBottom>
        体制図
      </Typography>

      <Stack spacing={4}>
        {sortedDepartments.map((dep) => (
          <DepartmentBox key={dep.id} department={dep} />
        ))}
      </Stack>
    </main>
  );
}
