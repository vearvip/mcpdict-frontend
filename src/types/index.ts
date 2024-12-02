
export interface MenuConfig {
  label: string
  key: string
  disabled?: boolean
} 

export type SearchData = Array<{
  char: string;
  charInfo: Object;
  [key: string]: any;
}>