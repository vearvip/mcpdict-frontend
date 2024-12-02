
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

export const JC = '簡稱'
export const YDYS = '音典顏色'



export interface DialectInfo {
  語言: string
  簡稱: string
  文件名: string
  方言島: number
  地圖集二排序: string
  地圖集二顏色: string
  地圖集二分區: string
  音典排序: string
  音典顏色: string
  音典分區: string
  陳邡排序: string
  陳邡顏色: string
  陳邡分區: string
  行政區級別: string
  省: string
  市: string
  縣: string
  鎮: string
  村: string
  地點: string
  版本: string
  經緯度: string
  地圖級別: string
  作者: string
  錄入人: string
  維護人: string
  推薦人: string
  來源: string
  參考文獻: string
  音系: string
  說明: string
  繁簡: string
  聲調: string
  字數: number
  "□數": number
  音節數: number
  不帶調音節數: number
  網站: string
  網址: string
  語言索引: string
}
