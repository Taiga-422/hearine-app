// 1. 統一された組織テーブル（階層構造を一つのテーブルで管理）
export interface Organization {
  id: string;
  name: string;
  parent_id: string | null; // 自己参照外部キー
  organization_type: 'company' | 'department' | 'section' | 'team';
  display_order: number;
  created_at: Date;
  updated_at: Date;
  is_active: boolean; // 論理削除フラグ
}

// 2. 役職テーブル（階層レベルを追加）
export interface Position {
  id: string;
  title: string;
  level: number; // 階層レベル（1が最上位）
  display_order: number;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
}

// 3. 社員テーブル（個人情報を適切に管理）
export interface Employee {
  id: string;
  employee_number: string; // 社員番号（ユニーク）
  last_name_kanji: string;
  first_name_kanji: string;
  last_name_kana: string;
  first_name_kana: string;
  email: string;
  hire_date: Date;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
}

// 4. 組織所属テーブル（履歴管理対応）
export interface OrganizationMembership {
  id: string;
  employee_id: string;
  organization_id: string;
  position_id: string;
  start_date: Date;
  end_date: Date | null; // nullの場合は現在も所属
  is_primary: boolean; // 主たる所属かどうか
  created_at: Date;
  updated_at: Date;
}

// 5. 組織階層パステーブル（クロージャーテーブル）
export interface OrganizationPath {
  ancestor_id: string;
  descendant_id: string;
  depth: number; // 階層の深さ
}

// 業界の型定義
export type IndustryType = 
  | 'information_technology' // IT・情報通信
  | 'manufacturing' // 製造業
  | 'finance' // 金融・保険
  | 'healthcare' // 医療・ヘルスケア
  | 'retail' // 小売・流通
  | 'construction' // 建設・不動産
  | 'education' // 教育・研修
  | 'government' // 官公庁・自治体
  | 'logistics' // 物流・運輸
  | 'media_entertainment' // メディア・エンターテイメント
  | 'energy_utilities' // エネルギー・公共事業
  | 'agriculture' // 農業・食品
  | 'automotive' // 自動車
  | 'telecommunications' // 通信
  | 'consulting' // コンサルティング
  | 'other'; // その他

// 6. プロジェクトテーブル
export interface Project {
  id: string;
  name: string; // プロジェクト名
  description: string; // 概要・目的
  industry: IndustryType; // 業界（選択式）
  client_name: string; // 顧客名
  created_at: Date;
  updated_at: Date;
  is_active: boolean; // 論理削除フラグ
}

// 7. プロジェクトメンバーテーブル（EmployeeとProjectの中間テーブル）
export interface ProjectMembership {
  id: string;
  employee_id: string; // 社員ID
  project_id: string; // プロジェクトID
  role: 'project_manager' | 'team_leader' | 'senior_member' | 'member' | 'support'; // より詳細な役割
  monthly_rate: number; // アサイン単価（月単価）
  allocation_percentage: number; // アサイン率（0-100%）
  start_date: Date; // アサイン開始日
  end_date: Date | null; // アサイン終了日（nullの場合は現在も参加中）
  created_at: Date;
  updated_at: Date;
  is_active: boolean; // 論理削除フラグ
}