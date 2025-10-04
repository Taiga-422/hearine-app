import { Organization, Employee, Position, OrganizationMembership, ProjectMembership } from '../app/(private)/companyId/schema';

// 社員情報の型定義
export interface EmployeeInfo {
  employee: Employee;
  position: Position;
  membership: OrganizationMembership;
  organization: Organization;
}

// プロジェクトメンバー情報の型定義
export interface ProjectMemberInfo {
  employee: Employee;
  position: Position;
  membership: OrganizationMembership;
  organization: Organization;
  projectMembership: ProjectMembership;
}

// 指定組織の配下にある全ての組織IDを取得する関数
export const getAllDescendantOrganizations = (
  organizationId: string,
  organizations: Organization[]
): string[] => {
  const result = [organizationId]; // 自分自身も含める
  
  const findChildren = (parentId: string) => {
    const children = organizations.filter(org => 
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
export const getEmployeesInOrganizationHierarchy = (
  organizationId: string,
  organizations: Organization[],
  employees: Employee[],
  positions: Position[],
  memberships: OrganizationMembership[]
): EmployeeInfo[] => {
  const allOrgIds = getAllDescendantOrganizations(organizationId, organizations);
  
  const allEmployees: EmployeeInfo[] = [];
  
  allOrgIds.forEach(orgId => {
    const orgMemberships = memberships.filter(
      m => m.organization_id === orgId && m.end_date === null
    );
    
    orgMemberships.forEach(membership => {
      const employee = employees.find(e => e.id === membership.employee_id);
      const position = positions.find(p => p.id === membership.position_id);
      const organization = organizations.find(o => o.id === orgId);
      
      if (employee && position && organization) {
        allEmployees.push({ employee, position, membership, organization });
      }
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

// 指定プロジェクトに現在アサインされているメンバーを取得する関数
export const getCurrentProjectMembers = (
  projectId: string,
  employees: Employee[],
  positions: Position[],
  memberships: OrganizationMembership[],
  organizations: Organization[],
  projectMemberships: ProjectMembership[]
): ProjectMemberInfo[] => {
  const currentDate = new Date();
  
  // 現在アクティブなプロジェクトメンバーシップを取得
  const activeProjectMemberships = projectMemberships.filter(
    pm => pm.project_id === projectId && 
          pm.is_active && 
          pm.start_date <= currentDate &&
          (pm.end_date === null || pm.end_date >= currentDate)
  );
  
  const projectMembers: ProjectMemberInfo[] = [];
  
  activeProjectMemberships.forEach(projectMembership => {
    const employee = employees.find(e => e.id === projectMembership.employee_id && e.is_active);
    if (!employee) return;
    
    // 従業員の現在の主要な組織所属を取得
    const primaryMembership = memberships.find(
      m => m.employee_id === employee.id &&
           m.is_primary &&
           m.start_date <= currentDate &&
           (m.end_date === null || m.end_date >= currentDate)
    );
    
    if (!primaryMembership) return;
    
    const position = positions.find(p => p.id === primaryMembership.position_id && p.is_active);
    const organization = organizations.find(o => o.id === primaryMembership.organization_id && o.is_active);
    
    if (employee && position && organization) {
      projectMembers.push({
        employee,
        position,
        membership: primaryMembership,
        organization,
        projectMembership
      });
    }
  });
  
  // プロジェクトでの役割順、同じ役割なら役職レベル順、同じレベルなら氏名順で並び替え
  const roleOrder = {
    'project_manager': 1,
    'team_leader': 2,
    'senior_member': 3,
    'member': 4,
    'support': 5
  };
  
  return projectMembers.sort((a, b) => {
    const roleA = roleOrder[a.projectMembership.role];
    const roleB = roleOrder[b.projectMembership.role];
    
    if (roleA !== roleB) {
      return roleA - roleB;
    }
    if (a.position.level !== b.position.level) {
      return a.position.level - b.position.level;
    }
    return a.employee.last_name_kana.localeCompare(b.employee.last_name_kana);
  });
};