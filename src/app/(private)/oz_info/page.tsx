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

// ポジションIDから役職名を取得するためのマップ
const positionMap = new Map(positions.map((p) => [p.id, p.title]));
// ポジションIDから役職名を取得するヘルパー関数
const getPositionTitle = (position_id: string) => positionMap.get(position_id) || "";

/**
 * 部署・セクション・チームと従業員の関連付けデータから、
 * 組織単位IDをキーとして、所属する従業員IDのSetをバリューとするMapを作成
 * @param pairs - 従業員と組織単位の関連付けデータ
 * @param keyName - 組織単位のIDフィールド名 (department_id, section_id, team_id)
 * @returns Map<組織単位ID, Set<従業員ID>>
 */
const createEmployeeMap = (pairs: { employee_id: string; [key: string]: string }[], keyName: string) => {
  const map = new Map<string, Set<string>>();
  for (const pair of pairs) {
    const key = pair[keyName];
    if (!map.has(key)) map.set(key, new Set());
    map.get(key)?.add(pair.employee_id);
  }
  return map;
};

// 部署・セクション・チーム別の従業員マップを作成
const departmentEmployeeMap = createEmployeeMap(department_employees, "department_id");
const sectionEmployeeMap = createEmployeeMap(section_employees, "section_id");
const teamEmployeeMap = createEmployeeMap(team_employees, "team_id");

// どこかのチームに所属している従業員のIDセット（重複排除のため）
const allTeamEmployeeIds = new Set(team_employees.map((te) => te.employee_id));

/**
 * 従業員配列を役職の表示順序でソートする
 * @param emps - ソート対象の従業員配列
 * @returns 役職順でソートされた従業員配列
 */
const sortEmployeesByPosition = (emps: Employee[]) => {
  return [...emps].sort(
    (a, b) =>
      (positions.find((p) => p.id === a.position_id)?.display_order ?? 99) -
      (positions.find((p) => p.id === b.position_id)?.display_order ?? 99)
  );
};

/**
 * チームの情報と所属メンバーを表示するコンポーネント
 * @param team - 表示するチームの情報
 */
const TeamBox = ({ team }: { team: Team }) => {
  // チームに所属する従業員IDを取得
  const memberIds = teamEmployeeMap.get(team.id) || new Set();
  // 従業員情報を取得し、役職順でソート
  const members = sortEmployeesByPosition(
    employees.filter((e) => memberIds.has(e.id))
  );

  return (
    <Paper elevation={1} sx={{ p: 2, minWidth: 200 }}>
      <Typography variant="subtitle2" fontWeight="bold">
        {team.name}
      </Typography>
      {/* 各メンバーの氏名と役職を表示 */}
      {members.map((m) => (
        <Typography key={m.id} variant="body2">
          {m.last_name_kanji} {m.first_name_kanji}（{getPositionTitle(m.position_id)}）
        </Typography>
      ))}
    </Paper>
  );
};

/**
 * セクションの情報と所属メンバー・チームを表示するコンポーネント
 * @param section - 表示するセクションの情報
 */
const SectionBox = ({ section }: { section: Section }) => {
  // セクションの展開/折りたたみ状態を管理
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded((prev) => !prev);

  // セクション内のチームをdisplay_order順で取得（パフォーマンス最適化のためuseMemo使用）
  const teamsInSection = useMemo(
    () => teams.filter((t) => t.section_id === section.id).sort((a, b) => a.display_order - b.display_order),
    [section.id]
  );

  // セクションに所属する従業員IDを取得
  const sectionMemberIds = sectionEmployeeMap.get(section.id) || new Set();
  // セクションメンバーを役職順でソート
  const sectionMembers = sortEmployeesByPosition(
    employees.filter((e) => sectionMemberIds.has(e.id))
  );

  // セクション直属（どのチームにも所属していない）メンバーを抽出
  const noTeamMembers = sectionMembers.filter((m) => !allTeamEmployeeIds.has(m.id));

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      {/* セクション名とアコーディオンの切り替えボタン */}
      <Box display="flex" alignItems="center" sx={{ cursor: "pointer" }} onClick={toggleExpand}>
        <IconButton size="small" sx={{ mr: 1 }}>
          {expanded ? <ExpandMore /> : <ChevronRight />}
        </IconButton>
        <Typography variant="subtitle1" fontWeight="bold">
          {section.name}
        </Typography>
      </Box>

      {/* セクション直属メンバーを表示 */}
      {noTeamMembers.length > 0 && (
        <Box sx={{ ml: 4, mt: 1 }}>
          {noTeamMembers.map((m) => (
            <Typography key={m.id}>
              {m.last_name_kanji} {m.first_name_kanji}（{getPositionTitle(m.position_id)}）
            </Typography>
          ))}
        </Box>
      )}

      {/* セクション内のチームを展開時に表示 */}
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

/**
 * 部署の情報と所属メンバー・セクションを表示するコンポーネント
 * @param department - 表示する部署の情報
 */
const DepartmentBox = ({ department }: { department: Department }) => {
  // 部署に所属する従業員IDを取得
  const deptMemberIds = departmentEmployeeMap.get(department.id) || new Set();
  // 部署の従業員を役職順でソート
  const deptEmployees = sortEmployeesByPosition(
    employees.filter((e) => deptMemberIds.has(e.id))
  );

  // 部署内のセクションをdisplay_order順で取得（パフォーマンス最適化のためuseMemo使用）
  const sectionsInDept = useMemo(
    () => sections.filter((s) => s.department_id === department.id).sort((a, b) => a.display_order - b.display_order),
    [department.id]
  );

  // セクションに所属している従業員のIDセットを作成
  const sectionEmpIds = new Set(
    section_employees
      .filter((se) => se.section_id && sectionsInDept.some((s) => s.id === se.section_id))
      .map((se) => se.employee_id)
  );

  // 部署直属（どのセクションにも所属していない）メンバーを抽出
  const noSectionMembers = deptEmployees.filter((e) => !sectionEmpIds.has(e.id));

  return (
    <Paper elevation={3} sx={{ p: 3, width: "100%" }}>
      <Typography variant="h6" gutterBottom>
        {department.name}
      </Typography>

      {/* 部署直属メンバーを表示 */}
      {noSectionMembers.length > 0 && (
        <Box sx={{ mb: 2 }}>
          {noSectionMembers.map((m) => (
            <Typography key={m.id}>
              {m.last_name_kanji} {m.first_name_kanji}（{getPositionTitle(m.position_id)}）
            </Typography>
          ))}
        </Box>
      )}

      {/* 部署内のセクションを表示 */}
      <Stack spacing={2}>
        {sectionsInDept.map((section) => (
          <SectionBox key={section.id} section={section} />
        ))}
      </Stack>
    </Paper>
  );
};

/**
 * 組織階層の深度を計算する関数
 * 親部署がある場合は再帰的に深度を計算し、メモ化により効率化を図る
 * @returns 部署IDをキー、深度レベルをバリューとするRecord
 */
const computeDepartmentDepths = (): Record<string, number> => {
  const map: Record<string, number> = {};

  // 再帰的に深度を計算する内部関数（メモ化あり）
  const getDepth = (id: string): number => {
    if (map[id] !== undefined) return map[id]; // メモ化された値があれば返す
    const dept = departments.find((d) => d.id === id);
    if (!dept) return 0; // 部署が見つからない場合は0
    if (!dept.parent_department_id) return (map[id] = 0); // 親部署がない場合は0
    return (map[id] = getDepth(dept.parent_department_id) + 1); // 親の深度+1
  };

  // 全部署の深度を計算
  for (const dept of departments) getDepth(dept.id);
  return map;
};

export default function HomePage() {
  // 部署の階層深度マップを取得
  const deptDepthMap = computeDepartmentDepths();
  // 最大深度を計算
  const maxDepth = Math.max(...Object.values(deptDepthMap));

  // 部署をdisplay_order順でソート（useMemoで最適化）
  const sortedDepartments = useMemo(
    () => departments.sort((a, b) => a.display_order - b.display_order),
    []
  );

  return (
    <main style={{ padding: "2rem", overflowX: "auto", whiteSpace: "nowrap" }}>
      <Typography variant="h5" gutterBottom>
        体制図
      </Typography>

      {/* 深度レベルごとに部署を表示 */}
      {[...Array(maxDepth + 1)].map((_, depth) => (
        <Stack key={depth} spacing={4} direction="row" sx={{ mb: 4 }}>
          {/* 現在の深度レベルの部署のみフィルタリングして表示 */}
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
