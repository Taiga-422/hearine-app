export const positions = [
  { id: "pos-1", title: "取締役", display_order: 1 },
  { id: "pos-2", title: "執行役員", display_order: 2 },
  { id: "pos-3", title: "部長", display_order: 3 },
  { id: "pos-4", title: "課長", display_order: 4 },
  { id: "pos-5", title: "リーダー", display_order: 5 },
  { id: "pos-6", title: "メンバー", display_order: 6 },
];

export const departments = [
  { id: "dep-1", name: "取締役会", parent_department_id: null, display_order: 1 },
  { id: "dep-2", name: "営業部", parent_department_id: "dep-1", display_order: 2 },
  { id: "dep-3", name: "企画部", parent_department_id: "dep-1", display_order: 3 },
  { id: "dep-4", name: "IT部", parent_department_id: "dep-1", display_order: 4 },
];

export const sections = [
  { id: "sec-1", name: "to Business", department_id: "dep-2", display_order: 1 },
  { id: "sec-2", name: "to Customer", department_id: "dep-2", display_order: 2 },
  { id: "sec-3", name: "営業側", department_id: "dep-3", display_order: 1 },
  { id: "sec-4", name: "企画側", department_id: "dep-3", display_order: 2 },
  { id: "sec-5", name: "フロントエンド", department_id: "dep-4", display_order: 1 },
  { id: "sec-6", name: "バックエンド", department_id: "dep-4", display_order: 2 },
  { id: "sec-7", name: "運用保守", department_id: "dep-4", display_order: 2 },
];

export const teams = [
  { id: "team-1", name: "法人営業第1チーム", section_id: "sec-1", display_order: 1 },
  { id: "team-2", name: "法人営業第2チーム", section_id: "sec-1", display_order: 2 },
  { id: "team-3", name: "個人営業第1チーム", section_id: "sec-2", display_order: 1 },
  { id: "team-4", name: "個人営業第2チーム", section_id: "sec-2", display_order: 2 },
  { id: "team-5", name: "企画営業第1チーム", section_id: "sec-3", display_order: 1 },
  { id: "team-6", name: "企画営業第2チーム", section_id: "sec-3", display_order: 2 },
  { id: "team-14", name: "企画営業第3チーム", section_id: "sec-3", display_order: 4 },
  { id: "team-7", name: "商品企画第1チーム", section_id: "sec-4", display_order: 1 },
  { id: "team-8", name: "商品企画第2チーム", section_id: "sec-4", display_order: 2 },
  { id: "team-9", name: "UI開発チーム", section_id: "sec-5", display_order: 1 },
  { id: "team-10", name: "UX改善チーム", section_id: "sec-5", display_order: 2 },
  { id: "team-11", name: "API開発チーム", section_id: "sec-6", display_order: 1 },
  { id: "team-12", name: "データ基盤チーム", section_id: "sec-6", display_order: 2 },
  { id: "team-13", name: "法規対応", section_id: "sec-7", display_order: 4 },
];

export const employees = [
  { id: "emp-1", last_name_kanji: "佐藤", first_name_kanji: "一郎", last_name_kana: "さとう", first_name_kana: "いちろう", position_id: "pos-1" },
  { id: "emp-2", last_name_kanji: "田中", first_name_kanji: "次郎", last_name_kana: "たなか", first_name_kana: "じろう", position_id: "pos-2" },
  { id: "emp-3", last_name_kanji: "鈴木", first_name_kanji: "三郎", last_name_kana: "すずき", first_name_kana: "さぶろう", position_id: "pos-2" },
  { id: "emp-4", last_name_kanji: "高橋", first_name_kanji: "花子", last_name_kana: "たかはし", first_name_kana: "はなこ", position_id: "pos-2" },
  { id: "emp-5", last_name_kanji: "伊藤", first_name_kanji: "四郎", last_name_kana: "いとう", first_name_kana: "しろう", position_id: "pos-3" },
  { id: "emp-6", last_name_kanji: "渡辺", first_name_kanji: "五郎", last_name_kana: "わたなべ", first_name_kana: "ごろう", position_id: "pos-3" },
  { id: "emp-7", last_name_kanji: "山本", first_name_kanji: "六郎", last_name_kana: "やまもと", first_name_kana: "ろくろう", position_id: "pos-3" },
  { id: "emp-8", last_name_kanji: "中村", first_name_kanji: "七子", last_name_kana: "なかむら", first_name_kana: "ななこ", position_id: "pos-4" },
  { id: "emp-9", last_name_kanji: "小林", first_name_kanji: "八男", last_name_kana: "こばやし", first_name_kana: "はちお", position_id: "pos-4" },
  { id: "emp-10", last_name_kanji: "加藤", first_name_kanji: "九美", last_name_kana: "かとう", first_name_kana: "くみ", position_id: "pos-4" },
  { id: "emp-11", last_name_kanji: "吉田", first_name_kanji: "十郎", last_name_kana: "よしだ", first_name_kana: "じゅうろう", position_id: "pos-4" },
  { id: "emp-12", last_name_kanji: "山田", first_name_kanji: "花子", last_name_kana: "やまだ", first_name_kana: "はなこ", position_id: "pos-5" },
  { id: "emp-13", last_name_kanji: "佐々木", first_name_kanji: "正男", last_name_kana: "ささき", first_name_kana: "まさお", position_id: "pos-5" },
  { id: "emp-14", last_name_kanji: "清水", first_name_kanji: "京子", last_name_kana: "しみず", first_name_kana: "きょうこ", position_id: "pos-5" },
  { id: "emp-15", last_name_kanji: "松本", first_name_kanji: "太郎", last_name_kana: "まつもと", first_name_kana: "たろう", position_id: "pos-5" },
  { id: "emp-16", last_name_kanji: "井上", first_name_kanji: "陽子", last_name_kana: "いのうえ", first_name_kana: "ようこ", position_id: "pos-6" },
  { id: "emp-17", last_name_kanji: "原", first_name_kanji: "和夫", last_name_kana: "はら", first_name_kana: "かずお", position_id: "pos-6" },
  { id: "emp-18", last_name_kanji: "石井", first_name_kanji: "夏子", last_name_kana: "いしい", first_name_kana: "なつこ", position_id: "pos-6" },
  { id: "emp-19", last_name_kanji: "森", first_name_kanji: "誠", last_name_kana: "もり", first_name_kana: "まこと", position_id: "pos-6" },
  { id: "emp-20", last_name_kanji: "橋本", first_name_kanji: "香織", last_name_kana: "はしもと", first_name_kana: "かおり", position_id: "pos-6" },
  { id: "emp-21", last_name_kanji: "岡田", first_name_kanji: "信也", last_name_kana: "おかだ", first_name_kana: "しんや", position_id: "pos-6" },
  { id: "emp-22", last_name_kanji: "村上", first_name_kanji: "紗季", last_name_kana: "むらかみ", first_name_kana: "さき", position_id: "pos-6" },
  { id: "emp-23", last_name_kanji: "青木", first_name_kanji: "達也", last_name_kana: "あおき", first_name_kana: "たつや", position_id: "pos-6" },
  { id: "emp-24", last_name_kanji: "藤井", first_name_kanji: "美穂", last_name_kana: "ふじい", first_name_kana: "みほ", position_id: "pos-6" },
  { id: "emp-25", last_name_kanji: "藤田", first_name_kanji: "美尾", last_name_kana: "ふじい", first_name_kana: "みほ", position_id: "pos-6" },
  { id: "emp-26", last_name_kanji: "藤木", first_name_kanji: "美藻", last_name_kana: "ふじい", first_name_kana: "みほ", position_id: "pos-6" },
  { id: "emp-27", last_name_kanji: "藤村", first_name_kanji: "美世", last_name_kana: "ふじい", first_name_kana: "みほ", position_id: "pos-5" },
  { id: "emp-28", last_name_kanji: "藤蔵", first_name_kanji: "たつや", last_name_kana: "ふじい", first_name_kana: "みほ", position_id: "pos-5" },
];

export const department_employees = [
  { department_id: "dep-1", employee_id: "emp-1" },
  { department_id: "dep-1", employee_id: "emp-2" },
  { department_id: "dep-1", employee_id: "emp-3" },
  { department_id: "dep-1", employee_id: "emp-4" },
  { department_id: "dep-2", employee_id: "emp-5" },
  { department_id: "dep-3", employee_id: "emp-6" },
  { department_id: "dep-4", employee_id: "emp-7" },
];

export const section_employees = [
  { section_id: "sec-1", employee_id: "emp-8" },
  { section_id: "sec-2", employee_id: "emp-9" },
  { section_id: "sec-3", employee_id: "emp-10" },
  { section_id: "sec-4", employee_id: "emp-11" },
];

export const team_employees = [
  { team_id: "team-1", employee_id: "emp-12" }, { team_id: "team-1", employee_id: "emp-16" }, { team_id: "team-1", employee_id: "emp-17" },
  { team_id: "team-2", employee_id: "emp-13" }, { team_id: "team-2", employee_id: "emp-18" }, { team_id: "team-2", employee_id: "emp-19" },
  { team_id: "team-3", employee_id: "emp-14" }, { team_id: "team-3", employee_id: "emp-20" }, { team_id: "team-3", employee_id: "emp-21" },
  { team_id: "team-4", employee_id: "emp-15" }, { team_id: "team-4", employee_id: "emp-22" }, { team_id: "team-4", employee_id: "emp-23" },
  { team_id: "team-5", employee_id: "emp-12" }, { team_id: "team-5", employee_id: "emp-16" }, { team_id: "team-5", employee_id: "emp-17" },
  { team_id: "team-6", employee_id: "emp-13" }, { team_id: "team-6", employee_id: "emp-18" }, { team_id: "team-6", employee_id: "emp-19" },
  { team_id: "team-7", employee_id: "emp-14" }, { team_id: "team-7", employee_id: "emp-20" }, { team_id: "team-7", employee_id: "emp-21" },
  { team_id: "team-8", employee_id: "emp-15" }, { team_id: "team-8", employee_id: "emp-22" }, { team_id: "team-8", employee_id: "emp-23" },
  { team_id: "team-9", employee_id: "emp-12" }, { team_id: "team-9", employee_id: "emp-16" }, { team_id: "team-9", employee_id: "emp-17" },
  { team_id: "team-10", employee_id: "emp-13" }, { team_id: "team-10", employee_id: "emp-18" }, { team_id: "team-10", employee_id: "emp-19" },
  { team_id: "team-11", employee_id: "emp-14" }, { team_id: "team-11", employee_id: "emp-20" }, { team_id: "team-11", employee_id: "emp-21" },
  { team_id: "team-12", employee_id: "emp-15" }, { team_id: "team-12", employee_id: "emp-22" }, { team_id: "team-12", employee_id: "emp-24" },
  { team_id: "team-13", employee_id: "emp-25" }, { team_id: "team-13", employee_id: "emp-26" }, { team_id: "team-13", employee_id: "emp-27" },
  { team_id: "team-13", employee_id: "emp-28" }, { team_id: "team-12", employee_id: "emp-28" }, { team_id: "team-14", employee_id: "emp-28" }
];
