import { request } from "../utils/request";

function extraOptions(options = {}) {
  return {
    signal: options.signal,
    silent: options.silent,
    timeout: options.timeout,
  };
}


/**
 * 查询字符信息。
 *
 * @param {Object} params - 查询参数对象。
 * @param {string[]} params.charList - 要查询的字符（必需）。
 * @param {string[]} [params.dialectList] - 方言选项（可选）。
 * @returns {Promise<Array>} 包含查询结果的 Promise 对象。
 */
export async function queryChars(data, options = {}) {
  return request({
    url: "/char",
    method: "POST",
    data,
    ...extraOptions(options),
  });
}
/**
 * 查询字符信息 by QueryType 
 * type QueryType = 'hanzi' | 'duyin' | 'zhushi' | 'cidian' 
 *
 * @param {Object} params - 查询参数对象。
 * @param {string} params.queryStr - 要查询的字符（必需）。
 * @param {string[]} [params.dialectList] - 方言选项（可选）。
 * @param {'hanzi' | 'duyin' | 'zhushi' | 'cidian'} params.queryType - 方言选项。
 * @returns {Promise<Array>} 包含查询结果的 Promise 对象。
 */
export async function queryCharsByType(data, options = {}) {
  return request({
    url: "/char/byType",
    method: "POST",
    data,
    ...extraOptions(options),
  });
}
/**
 * 查询字符信息（按照信息key名查询）。
 *
 * @param {Object} params - 查询参数对象。
 * @param {string} params.char - 要查询的字符（必需）。
 * @param {string[]} params.infoKeyList - 方言选项（必需）。
 * @returns {Promise<Array>} 包含查询结果的 Promise 对象。
 */
export async function queryCharInfo(data, options = {}) {
  return request({
    url: "/char/info",
    method: "POST",
    data,
    ...extraOptions(options),
  });
}
/**
 * 长文搜搜
 *
 * @param {Object} data - 查询参数对象。
 * @param {string|undefined} data.char - 要查询的字符（必需）。
 * @param {string} [data.dialect] - 方言选项（可选）。
 * @returns {Promise<Array>} 包含查询结果的 Promise 对象。
 */
export async function queryLongString(data, options = {}) {
  return request({
    url: "/char/long",
    method: "POST",
    data,
    ...extraOptions(options),
  });
}

/**
 * 查询地理信息。
 *
 * @returns {Promise<Object>} 包含地理信息的 Promise 对象。
 */
export async function queryDialectGeo(options = {}) {
  return request({
    url: `/dialect/geo`,
    ...extraOptions(options),
  });
}

/**
 * 查询方言信息。
 *
 * @returns {Promise<Object>} 包含方言信息的 Promise 对象。
 */
export async function queryDialectInfos(options = {}) {
  return request({
    url: `/dialect`,
    ...extraOptions(options),
  });
}


/**
 * 查询方言item信息。
 *
 * @returns {Promise<Object>} 包含方言item信息的 Promise 对象。
 */
export async function queryDialectItemInfo(params, options = {}) {
  return request({
    url: `/dialect/item`,
    params,
    ...extraOptions(options),
  });
}
