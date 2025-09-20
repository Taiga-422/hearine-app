import { Organization, Position, Employee, OrganizationMembership } from '@/app/(private)/companyId/oz_info/schema';

export const improved_organizations: Organization[] = [
  // 会社
  { 
    id: "org-1", 
    name: "株式会社サンプル", 
    parent_id: null, 
    organization_type: "company",
    display_order: 1,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    is_active: true
  },
  
  // 3つの部署
  { 
    id: "org-2", 
    name: "営業部", 
    parent_id: "org-1", 
    organization_type: "department",
    display_order: 1,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    is_active: true
  },
  { 
    id: "org-3", 
    name: "技術部", 
    parent_id: "org-1", 
    organization_type: "department",
    display_order: 2,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    is_active: true
  },
  { 
    id: "org-4", 
    name: "管理部", 
    parent_id: "org-1", 
    organization_type: "department",
    display_order: 3,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    is_active: true
  },
  
  // 6つの課（各部署に2つずつ）
  { 
    id: "org-5", 
    name: "法人営業課", 
    parent_id: "org-2", 
    organization_type: "section",
    display_order: 1,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    is_active: true
  },
  { 
    id: "org-6", 
    name: "個人営業課", 
    parent_id: "org-2", 
    organization_type: "section",
    display_order: 2,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    is_active: true
  },
  { 
    id: "org-7", 
    name: "開発課", 
    parent_id: "org-3", 
    organization_type: "section",
    display_order: 1,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    is_active: true
  },
  { 
    id: "org-8", 
    name: "インフラ課", 
    parent_id: "org-3", 
    organization_type: "section",
    display_order: 2,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    is_active: true
  },
  { 
    id: "org-9", 
    name: "人事課", 
    parent_id: "org-4", 
    organization_type: "section",
    display_order: 1,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    is_active: true
  },
  { 
    id: "org-10", 
    name: "経理課", 
    parent_id: "org-4", 
    organization_type: "section",
    display_order: 2,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    is_active: true
  },
  
  // 12のチーム（各課に2つずつ）
  { 
    id: "org-11", 
    name: "法人営業第1チーム", 
    parent_id: "org-5", 
    organization_type: "team",
    display_order: 1,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    is_active: true
  },
  { 
    id: "org-12", 
    name: "法人営業第2チーム", 
    parent_id: "org-5", 
    organization_type: "team",
    display_order: 2,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    is_active: true
  },
  { 
    id: "org-13", 
    name: "個人営業第1チーム", 
    parent_id: "org-6", 
    organization_type: "team",
    display_order: 1,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    is_active: true
  },
  { 
    id: "org-14", 
    name: "個人営業第2チーム", 
    parent_id: "org-6", 
    organization_type: "team",
    display_order: 2,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    is_active: true
  },
  { 
    id: "org-15", 
    name: "フロントエンド開発チーム", 
    parent_id: "org-7", 
    organization_type: "team",
    display_order: 1,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    is_active: true
  },
  { 
    id: "org-16", 
    name: "バックエンド開発チーム", 
    parent_id: "org-7", 
    organization_type: "team",
    display_order: 2,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    is_active: true
  },
  { 
    id: "org-17", 
    name: "システム運用チーム", 
    parent_id: "org-8", 
    organization_type: "team",
    display_order: 1,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    is_active: true
  },
  { 
    id: "org-18", 
    name: "セキュリティチーム", 
    parent_id: "org-8", 
    organization_type: "team",
    display_order: 2,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    is_active: true
  },
  { 
    id: "org-19", 
    name: "採用チーム", 
    parent_id: "org-9", 
    organization_type: "team",
    display_order: 1,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    is_active: true
  },
  { 
    id: "org-20", 
    name: "労務チーム", 
    parent_id: "org-9", 
    organization_type: "team",
    display_order: 2,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    is_active: true
  },
  { 
    id: "org-21", 
    name: "財務チーム", 
    parent_id: "org-10", 
    organization_type: "team",
    display_order: 1,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    is_active: true
  },
  { 
    id: "org-22", 
    name: "経理チーム", 
    parent_id: "org-10", 
    organization_type: "team",
    display_order: 2,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    is_active: true
  }
];

export const improved_positions: Position[] = [
  { 
    id: "pos-1", 
    title: "取締役", 
    level: 1, 
    display_order: 1,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    is_active: true
  },
  { 
    id: "pos-2", 
    title: "執行役員", 
    level: 2, 
    display_order: 2,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    is_active: true
  },
  { 
    id: "pos-3", 
    title: "部長", 
    level: 3, 
    display_order: 3,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    is_active: true
  },
  { 
    id: "pos-4", 
    title: "課長", 
    level: 4, 
    display_order: 4,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    is_active: true
  },
  { 
    id: "pos-5", 
    title: "チームリーダー", 
    level: 5, 
    display_order: 5,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    is_active: true
  },
  { 
    id: "pos-6", 
    title: "メンバー", 
    level: 6, 
    display_order: 6,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    is_active: true
  }
];

export const improved_employees: Employee[] = [
  // 取締役
  {
    id: "emp-1", employee_number: "EMP001", last_name_kanji: "佐藤", first_name_kanji: "一郎",
    last_name_kana: "さとう", first_name_kana: "いちろう", email: "sato.ichiro@example.com",
    hire_date: new Date('2015-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  
  // 部長クラス
  {
    id: "emp-2", employee_number: "EMP002", last_name_kanji: "田中", first_name_kanji: "次郎",
    last_name_kana: "たなか", first_name_kana: "じろう", email: "tanaka.jiro@example.com",
    hire_date: new Date('2018-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  {
    id: "emp-3", employee_number: "EMP003", last_name_kanji: "鈴木", first_name_kanji: "花子",
    last_name_kana: "すずき", first_name_kana: "はなこ", email: "suzuki.hanako@example.com",
    hire_date: new Date('2017-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  {
    id: "emp-4", employee_number: "EMP004", last_name_kanji: "高橋", first_name_kanji: "三郎",
    last_name_kana: "たかはし", first_name_kana: "さぶろう", email: "takahashi.saburo@example.com",
    hire_date: new Date('2016-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  
  // 課長クラス
  {
    id: "emp-5", employee_number: "EMP005", last_name_kanji: "伊藤", first_name_kanji: "美穂",
    last_name_kana: "いとう", first_name_kana: "みほ", email: "ito.miho@example.com",
    hire_date: new Date('2019-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  {
    id: "emp-6", employee_number: "EMP006", last_name_kanji: "渡辺", first_name_kanji: "健太",
    last_name_kana: "わたなべ", first_name_kana: "けんた", email: "watanabe.kenta@example.com",
    hire_date: new Date('2019-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  {
    id: "emp-7", employee_number: "EMP007", last_name_kanji: "山本", first_name_kanji: "愛子",
    last_name_kana: "やまもと", first_name_kana: "あいこ", email: "yamamoto.aiko@example.com",
    hire_date: new Date('2020-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  {
    id: "emp-8", employee_number: "EMP008", last_name_kanji: "中村", first_name_kanji: "大輔",
    last_name_kana: "なかむら", first_name_kana: "だいすけ", email: "nakamura.daisuke@example.com",
    hire_date: new Date('2020-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  {
    id: "emp-9", employee_number: "EMP009", last_name_kanji: "小林", first_name_kanji: "真美",
    last_name_kana: "こばやし", first_name_kana: "まみ", email: "kobayashi.mami@example.com",
    hire_date: new Date('2020-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  {
    id: "emp-10", employee_number: "EMP010", last_name_kanji: "加藤", first_name_kanji: "雄一",
    last_name_kana: "かとう", first_name_kana: "ゆういち", email: "kato.yuichi@example.com",
    hire_date: new Date('2021-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  
  // チームリーダークラス
  {
    id: "emp-11", employee_number: "EMP011", last_name_kanji: "吉田", first_name_kanji: "直子",
    last_name_kana: "よしだ", first_name_kana: "なおこ", email: "yoshida.naoko@example.com",
    hire_date: new Date('2021-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  {
    id: "emp-12", employee_number: "EMP012", last_name_kanji: "山田", first_name_kanji: "隆司",
    last_name_kana: "やまだ", first_name_kana: "たかし", email: "yamada.takashi@example.com",
    hire_date: new Date('2021-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  {
    id: "emp-13", employee_number: "EMP013", last_name_kanji: "佐々木", first_name_kanji: "優子",
    last_name_kana: "ささき", first_name_kana: "ゆうこ", email: "sasaki.yuko@example.com",
    hire_date: new Date('2022-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  {
    id: "emp-14", employee_number: "EMP014", last_name_kanji: "清水", first_name_kanji: "裕太",
    last_name_kana: "しみず", first_name_kana: "ゆうた", email: "shimizu.yuta@example.com",
    hire_date: new Date('2022-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  {
    id: "emp-15", employee_number: "EMP015", last_name_kanji: "松本", first_name_kanji: "恵美",
    last_name_kana: "まつもと", first_name_kana: "えみ", email: "matsumoto.emi@example.com",
    hire_date: new Date('2022-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  {
    id: "emp-16", employee_number: "EMP016", last_name_kanji: "井上", first_name_kanji: "智也",
    last_name_kana: "いのうえ", first_name_kana: "ともや", email: "inoue.tomoya@example.com",
    hire_date: new Date('2022-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  
  // メンバークラス
  {
    id: "emp-17", employee_number: "EMP017", last_name_kanji: "原", first_name_kanji: "沙織",
    last_name_kana: "はら", first_name_kana: "さおり", email: "hara.saori@example.com",
    hire_date: new Date('2023-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  {
    id: "emp-18", employee_number: "EMP018", last_name_kanji: "石井", first_name_kanji: "拓也",
    last_name_kana: "いしい", first_name_kana: "たくや", email: "ishii.takuya@example.com",
    hire_date: new Date('2023-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  {
    id: "emp-19", employee_number: "EMP019", last_name_kanji: "森", first_name_kanji: "香織",
    last_name_kana: "もり", first_name_kana: "かおり", email: "mori.kaori@example.com",
    hire_date: new Date('2023-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  {
    id: "emp-20", employee_number: "EMP020", last_name_kanji: "橋本", first_name_kanji: "正樹",
    last_name_kana: "はしもと", first_name_kana: "まさき", email: "hashimoto.masaki@example.com",
    hire_date: new Date('2023-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  {
    id: "emp-21", employee_number: "EMP021", last_name_kanji: "岡田", first_name_kanji: "麻衣",
    last_name_kana: "おかだ", first_name_kana: "まい", email: "okada.mai@example.com",
    hire_date: new Date('2023-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  {
    id: "emp-22", employee_number: "EMP022", last_name_kanji: "村上", first_name_kanji: "慎一",
    last_name_kana: "むらかみ", first_name_kana: "しんいち", email: "murakami.shinichi@example.com",
    hire_date: new Date('2023-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  {
    id: "emp-23", employee_number: "EMP023", last_name_kanji: "青木", first_name_kanji: "由美",
    last_name_kana: "あおき", first_name_kana: "ゆみ", email: "aoki.yumi@example.com",
    hire_date: new Date('2024-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  {
    id: "emp-24", employee_number: "EMP024", last_name_kanji: "藤井", first_name_kanji: "健二",
    last_name_kana: "ふじい", first_name_kana: "けんじ", email: "fujii.kenji@example.com",
    hire_date: new Date('2024-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  {
    id: "emp-25", employee_number: "EMP025", last_name_kanji: "藤田", first_name_kanji: "千尋",
    last_name_kana: "ふじた", first_name_kana: "ちひろ", email: "fujita.chihiro@example.com",
    hire_date: new Date('2024-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  {
    id: "emp-26", employee_number: "EMP026", last_name_kanji: "木村", first_name_kanji: "浩二",
    last_name_kana: "きむら", first_name_kana: "こうじ", email: "kimura.koji@example.com",
    hire_date: new Date('2024-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  {
    id: "emp-27", employee_number: "EMP027", last_name_kanji: "林", first_name_kanji: "美和",
    last_name_kana: "はやし", first_name_kana: "みわ", email: "hayashi.miwa@example.com",
    hire_date: new Date('2024-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  {
    id: "emp-28", employee_number: "EMP028", last_name_kanji: "酒井", first_name_kanji: "和也",
    last_name_kana: "さかい", first_name_kana: "かずや", email: "sakai.kazuya@example.com",
    hire_date: new Date('2024-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  {
    id: "emp-29", employee_number: "EMP029", last_name_kanji: "福田", first_name_kanji: "彩子",
    last_name_kana: "ふくだ", first_name_kana: "あやこ", email: "fukuda.ayako@example.com",
    hire_date: new Date('2024-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  },
  {
    id: "emp-30", employee_number: "EMP030", last_name_kanji: "西田", first_name_kanji: "翔太",
    last_name_kana: "にしだ", first_name_kana: "しょうた", email: "nishida.shota@example.com",
    hire_date: new Date('2024-04-01'), created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01'), is_active: true
  }
];

export const improved_memberships: OrganizationMembership[] = [
  // 取締役
  {
    id: "mem-1", employee_id: "emp-1", organization_id: "org-1", position_id: "pos-1",
    start_date: new Date('2015-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  
  // 部長クラス（3つの部署に配置）
  {
    id: "mem-2", employee_id: "emp-2", organization_id: "org-2", position_id: "pos-3",
    start_date: new Date('2018-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  {
    id: "mem-3", employee_id: "emp-3", organization_id: "org-3", position_id: "pos-3",
    start_date: new Date('2017-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  {
    id: "mem-4", employee_id: "emp-4", organization_id: "org-4", position_id: "pos-3",
    start_date: new Date('2016-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  
  // 課長クラス（6つの課に配置）
  {
    id: "mem-5", employee_id: "emp-5", organization_id: "org-5", position_id: "pos-4",
    start_date: new Date('2019-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  {
    id: "mem-6", employee_id: "emp-6", organization_id: "org-6", position_id: "pos-4",
    start_date: new Date('2019-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  {
    id: "mem-7", employee_id: "emp-7", organization_id: "org-7", position_id: "pos-4",
    start_date: new Date('2020-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  {
    id: "mem-8", employee_id: "emp-8", organization_id: "org-8", position_id: "pos-4",
    start_date: new Date('2020-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  {
    id: "mem-9", employee_id: "emp-9", organization_id: "org-9", position_id: "pos-4",
    start_date: new Date('2020-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  {
    id: "mem-10", employee_id: "emp-10", organization_id: "org-10", position_id: "pos-4",
    start_date: new Date('2021-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  
  // チームリーダークラス（12のチームの一部に配置）
  {
    id: "mem-11", employee_id: "emp-11", organization_id: "org-11", position_id: "pos-5",
    start_date: new Date('2021-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  {
    id: "mem-12", employee_id: "emp-12", organization_id: "org-12", position_id: "pos-5",
    start_date: new Date('2021-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  {
    id: "mem-13", employee_id: "emp-13", organization_id: "org-13", position_id: "pos-5",
    start_date: new Date('2022-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  {
    id: "mem-14", employee_id: "emp-14", organization_id: "org-15", position_id: "pos-5",
    start_date: new Date('2022-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  {
    id: "mem-15", employee_id: "emp-15", organization_id: "org-17", position_id: "pos-5",
    start_date: new Date('2022-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  {
    id: "mem-16", employee_id: "emp-16", organization_id: "org-19", position_id: "pos-5",
    start_date: new Date('2022-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  
  // メンバークラス（残りのチームに配置）
  {
    id: "mem-17", employee_id: "emp-17", organization_id: "org-11", position_id: "pos-6",
    start_date: new Date('2023-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  {
    id: "mem-18", employee_id: "emp-18", organization_id: "org-11", position_id: "pos-6",
    start_date: new Date('2023-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  {
    id: "mem-19", employee_id: "emp-19", organization_id: "org-12", position_id: "pos-6",
    start_date: new Date('2023-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  {
    id: "mem-20", employee_id: "emp-20", organization_id: "org-12", position_id: "pos-6",
    start_date: new Date('2023-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  {
    id: "mem-21", employee_id: "emp-21", organization_id: "org-13", position_id: "pos-6",
    start_date: new Date('2023-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  {
    id: "mem-22", employee_id: "emp-22", organization_id: "org-13", position_id: "pos-6",
    start_date: new Date('2023-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  {
    id: "mem-23", employee_id: "emp-23", organization_id: "org-14", position_id: "pos-6",
    start_date: new Date('2024-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  {
    id: "mem-24", employee_id: "emp-24", organization_id: "org-14", position_id: "pos-6",
    start_date: new Date('2024-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  {
    id: "mem-25", employee_id: "emp-25", organization_id: "org-15", position_id: "pos-6",
    start_date: new Date('2024-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  {
    id: "mem-26", employee_id: "emp-26", organization_id: "org-16", position_id: "pos-6",
    start_date: new Date('2024-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  {
    id: "mem-27", employee_id: "emp-27", organization_id: "org-17", position_id: "pos-6",
    start_date: new Date('2024-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  {
    id: "mem-28", employee_id: "emp-28", organization_id: "org-18", position_id: "pos-6",
    start_date: new Date('2024-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  {
    id: "mem-29", employee_id: "emp-29", organization_id: "org-20", position_id: "pos-6",
    start_date: new Date('2024-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  },
  {
    id: "mem-30", employee_id: "emp-30", organization_id: "org-21", position_id: "pos-6",
    start_date: new Date('2024-04-01'), end_date: null, is_primary: true,
    created_at: new Date('2024-01-01'), updated_at: new Date('2024-01-01')
  }
];