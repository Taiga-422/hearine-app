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