interface DisplayOrderEntity {
  display_order: number;
}

export interface Position extends DisplayOrderEntity {
  id: string;
  title: string;
}

export interface Department extends DisplayOrderEntity {
  id: string;
  name: string;
  parent_department_id: string | null;
}

export interface Section extends DisplayOrderEntity {
  id: string;
  name: string;
  department_id: string;
}

export interface Team extends DisplayOrderEntity {
  id: string;
  name: string;
  section_id: string;
}


export interface Employee {
  id: string;
  first_name_kanji: string;
  last_name_kanji: string;
  first_name_kana?: string;
  last_name_kana?: string;
  position_id: string;
}
