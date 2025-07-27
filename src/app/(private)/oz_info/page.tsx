"use client";

import { useState, useMemo } from "react";
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
import type { Department, Section, Team, Employee } from "@/types/organization";

// Map作成
const positionMap = new Map(positions.map((p) => [p.id, p.title]));
const getPositionTitle = (position_id: string) => positionMap.get(position_id) || "";

const createEmployeeMap = (pairs: { employee_id: string; [key: string]: string }[], keyName: string) => {
  const map = new Map<string, Set<string>>();
  for (const pair of pairs) {
    const key = pair[keyName];
    if (!map.has(key)) map.set(key, new Set());
    map.get(key)?.add(pair.employee_id);
  }
  return map;
};

const departmentEmployeeMap = createEmployeeMap(department_employees, "department_id");
const sectionEmployeeMap = createEmployeeMap(section_employees, "section_id");
const teamEmployeeMap = createEmployeeMap(team_employees, "team_id");

const allTeamEmployeeIds = new Set(team_employees.map((te) => te.employee_id));

const sortEmployeesByPosition = (emps: Employee[]) => {
  return [...emps].sort(
    (a, b) =>
      (positions.find((p) => p.id === a.position_id)?.display_order ?? 99) -
      (positions.find((p) => p.id === b.position_id)?.display_order ?? 99)
  );
};

const TeamBox = ({ team }: { team: Team }) => {
  const memberIds = teamEmployeeMap.get(team.id) || new Set();
  const members = sortEmployeesByPosition(
    employees.filter((e) => memberIds.has(e.id))
  );

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

const SectionBox = ({ section }: { section: Section }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded((prev) => !prev);

  const teamsInSection = useMemo(
    () => teams.filter((t) => t.section_id === section.id).sort((a, b) => a.display_order - b.display_order),
    [section.id]
  );

  const sectionMemberIds = sectionEmployeeMap.get(section.id) || new Set();
  const sectionMembers = sortEmployeesByPosition(
    employees.filter((e) => sectionMemberIds.has(e.id))
  );

  const noTeamMembers = sectionMembers.filter((m) => !allTeamEmployeeIds.has(m.id));

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
        <Stack spacing={2} flexWrap="wrap" sx={{ mt: 2, ml: 4 }}>
          {teamsInSection.map((team) => (
            <TeamBox key={team.id} team={team} />
          ))}
        </Stack>
      )}
    </Paper>
  );
};

const DepartmentBox = ({ department }: { department: Department }) => {
  const deptMemberIds = departmentEmployeeMap.get(department.id) || new Set();
  const deptEmployees = sortEmployeesByPosition(
    employees.filter((e) => deptMemberIds.has(e.id))
  );

  const sectionsInDept = useMemo(
    () => sections.filter((s) => s.department_id === department.id).sort((a, b) => a.display_order - b.display_order),
    [department.id]
  );

  const sectionEmpIds = new Set(
    section_employees
      .filter((se) => se.section_id && sectionsInDept.some((s) => s.id === se.section_id))
      .map((se) => se.employee_id)
  );

  const noSectionMembers = deptEmployees.filter((e) => !sectionEmpIds.has(e.id));

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
        {sectionsInDept.map((section) => (
          <SectionBox key={section.id} section={section} />
        ))}
      </Stack>
    </Paper>
  );
};

const computeDepartmentDepths = (): Record<string, number> => {
  const map: Record<string, number> = {};

  const getDepth = (id: string): number => {
    if (map[id] !== undefined) return map[id];
    const dept = departments.find((d) => d.id === id);
    if (!dept) return 0;
    if (!dept.parent_department_id) return (map[id] = 0);
    return (map[id] = getDepth(dept.parent_department_id) + 1);
  };

  for (const dept of departments) getDepth(dept.id);
  return map;
};

export default function HomePage() {
  const deptDepthMap = computeDepartmentDepths();
  const maxDepth = Math.max(...Object.values(deptDepthMap));

  const sortedDepartments = useMemo(
    () => departments.sort((a, b) => a.display_order - b.display_order),
    []
  );

  return (
    <main style={{ padding: "2rem", overflowX: "auto", whiteSpace: "nowrap" }}>
      <Typography variant="h5" gutterBottom>
        体制図
      </Typography>

      {[...Array(maxDepth + 1)].map((_, depth) => (
        <Stack key={depth} spacing={4} direction="row" sx={{ mb: 4 }}>
          {sortedDepartments
            .filter((dep) => deptDepthMap[dep.id] === depth)
            .map((dep) => (
              <DepartmentBox key={dep.id} department={dep} />
            ))}
        </Stack>
      ))}
    </main>
  );
}
