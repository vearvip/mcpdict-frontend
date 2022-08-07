

export interface Yongfa {
  shiyi: string;
  zuci: string;
  zuju: string;
}

export interface Yin {
  shengmu: string;
  yunmu: string;
  shengmu2: string;
  yunmu2: string;
  yongfa: Yongfa[];
}

export interface Fangyan {
  userId: number[];
  mingzi: string;
  jieshao: string;
  x: string;
  y: string;
  pianqv: number;
  jibie: string;
  yin: Yin[];
}

export interface Zi {
  zi: string;
  zitu: string;
  xinhuashiyi: string;
  fangyan: Fangyan[];
}

export interface Lang {
  name: string;
  color: string;
}

export interface MenuConfig {
  label: string
  key: string
} 