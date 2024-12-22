import { create } from "zustand";

/**
 * @typedef {Object} DialectInfo - 代表方言信息的对象。
 * @property {string} 語言 - 方言的语言名称。
 * @property {string} 簡稱 - 方言的简称。
 * @property {string} 文件名 - 相关文件的名称。
 * @property {number} 方言島 - 方言岛编号。
 * @property {string} 地圖集二排序 - 地图集第二排序规则。
 * @property {string} 地圖集二顏色 - 地图集二颜色。
 * @property {string} 地圖集二分區 - 地图集二分区。
 * @property {string} 音典排序 - 音典排序规则。
 * @property {string} 音典顏色 - 音典颜色。
 * @property {string} 音典分區 - 音典分区。
 * @property {string} 陳邡排序 - 陈邡排序规则。
 * @property {string} 陳邡顏色 - 陈邡颜色。
 * @property {string} 陳邡分區 - 陈邡分区。
 * @property {string} 行政區級別 - 行政区级别。
 * @property {string} 省 - 所属省份。
 * @property {string} 市 - 所属市。
 * @property {string} 縣 - 所属县。
 * @property {string} 鎮 - 所属镇。
 * @property {string} 村 - 所属村。
 * @property {string} 地點 - 具体地点。
 * @property {string} 版本 - 数据版本。
 * @property {string} 經緯度 - 经纬度信息。
 * @property {string} 地圖級別 - 地图显示级别。
 * @property {string} 作者 - 数据录入作者。
 * @property {string} 錄入人 - 数据录入人员。
 * @property {string} 維護人 - 数据维护人员。
 * @property {string} 推薦人 - 数据推荐人员。
 * @property {string} 來源 - 数据来源。
 * @property {string} 參考文獻 - 参考文献。
 * @property {string} 音系 - 音系描述。
 * @property {string} 說明 - 备注说明。
 * @property {string} 繁簡 - 繁简体标识。
 * @property {string} 聲調 - 声调描述。
 * @property {number} 字數 - 字数统计。
 * @property {number} □數 - 特殊符号数量（请确认这里的“□”含义）。
 * @property {number} 音節數 - 音节数量。
 * @property {number} 不帶調音節數 - 不带声调的音节数量。
 * @property {string} 網站 - 相关网站名称。
 * @property {string} 網址 - 相关网址链接。
 * @property {string} 語言索引 - 语言索引。
 */

/**
 * @typedef {Object} Store - 状态管理对象
 * @property {DialectInfo[]} dialectInfos - 方言信息列表。 
 * @property {string[]} dialectNames - 方言名称列表。 
 * @property {Array<Object>} dialectCateTree - 方言分区树形结构数据。
 * @property {Array<Object>} dialectDistrictTree - 行政区方言树形结构数据。
 * @property {Array<string>} dialectSort - 方言排序列表。
 */

export default create(
  /**
   *
   * @param {Function} set
   * @returns {{ store: Store, setStore: Function<Store> }}
   */
  (set) => ({
    store: {
      dialectInfos: [],
      dialectNames: [],
      dialectCateTree: [],
      dialectDistrictTree: [],
      dialectSort: [],
      geo: {},
    },
    setStore: (values) =>
      set((state) => {
        return {
          ...state,
          store: { ...state.store, ...values },
        };
      }),
  })
);
