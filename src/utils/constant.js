// 👇🏼👇🏼👇🏼👇🏽👇🏽👇🏽 方言表枚举 👇🏽👇🏽👇🏽👇🏼👇🏼👇🏼
export const YuYan = "語言";
export const JianCheng = "簡稱";

export const LuRuRen = "錄入人";
export const LaiYuan = "來源";
export const WenJianMing = "文件名";
export const BanBen = "版本";
export const ZiShu = "字數";
export const WuZhengZiShu = "□數";
export const YinJieShu = "音節數";
export const BuDaiDiaoYinJieShu = "不帶調音節數";

export const JingWeiDu = "經緯度";

export const DiTuJiErFenQv = "地圖集二分區";
export const DiTuJiErYanSe = "地圖集二顏色";
export const DiTuJiErPaiXv = "地圖集二排序";

export const YinDianFenQv = "音典分區";
export const YinDianYanSe = "音典顏色";
export const YinDianPaiXv = "音典排序";

export const ChenFangYanSe = "陳邡顏色";
export const ChenFangFenQv = "陳邡分區";
export const ChenFangPaiXv = "陳邡排序";

export const ShengDiao = '聲調'
 
export const Sheng = '省'
export const Shi = '市'
export const Xian = '縣'
export const Zhen = '鎮'
export const Cun = '村'
export const ZiRanCun = '自然村'

export const FenQvEnum = {
  [DiTuJiErFenQv]: {
    color: DiTuJiErYanSe,
    sort: DiTuJiErPaiXv,
  },
  [YinDianFenQv]: {
    color: YinDianYanSe,
    sort: YinDianPaiXv,
  },
  [ChenFangFenQv]: {
    color: ChenFangYanSe,
    sort: ChenFangPaiXv,
  },
};
// 👆🏼👆🏼👆🏼👆🏽👆🏽👆🏽 方言表枚举 👆🏽👆🏽👆🏽👆🏼👆🏼👆🏼

// 👇🏻👇🏻👇🏻👇👇👇 汉字表枚举 👇👇👇👇🏻👇🏻👇🏻

export const ShuoWen = "說文";
export const HuiZuan = "匯纂";
export const KangXi = "康熙";
export const HanDa = "漢大";

export const TongYiMa = "統一碼";
export const YiTiZi = "異體字";
export const ZiXingBianTi = "字形變體";
export const ZiXingMiaoShu = "字形描述";
export const BuJianJianSuo = "部件檢索";
export const LiangFen = "兩分";
export const ZongBiHuaShu = "總筆畫數";
export const BuShouYuBi = "部首餘筆";
export const WuBiHua = "五筆畫";
export const WuBi86 = "五筆86版";
export const WuBi98 = "五筆98版";
export const WuBi06 = "五筆06版";
export const CangJie3 = "倉頡三代";
export const CangJie5 = "倉頡五代";
export const CangeJie6 = "倉頡六代";
export const ShanRenMaLTS = "山人碼LTS";

// 👆🏻👆🏻👆🏻👆👆👆 汉字表枚举 👆👆👆👆🏻👆🏻👆🏻

// 👇🏾👇🏿👆🏿👆🏾