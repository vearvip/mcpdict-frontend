import { request } from "../utils/request";

const waitLoadDialectInfos = () => {
  return new Promise((resolve, reject) => {
    const intervalId = setInterval(() => { 
      if (window.dialectInfosWasReady) {
        clearInterval(intervalId);
        resolve();
      }
    }, 10);
  });
};

/**
 * 查询字符信息。
 *
 * @param {Object} params - 查询参数对象。
 * @param {string|undefined} params.char - 要查询的字符（必需）。
 * @param {string} [params.dialect] - 方言选项（可选）。
 * @returns {Promise<Array>} 包含查询结果的 Promise 对象。
 */
export async function queryChars(params) {
  await waitLoadDialectInfos();
  return request({
    url: "/char",
    params,
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
export async function queryLongString(data) {
  return request({
    url: "/char/long",
    method: "POST",
    data,
  });
}

/**
 * 查询地理信息。
 *
 * @returns {Promise<Object>} 包含地理信息的 Promise 对象。
 */
export async function queryDialectGeo() {
  return request({
    url: `/dialect/geo`,
  });
}

/**
 * 查询方言信息。
 *
 * @returns {Promise<Object>} 包含方言信息的 Promise 对象。
 */
export async function queryDialectInfos() {
  return request({
    url: `/dialect`,
  });
}
