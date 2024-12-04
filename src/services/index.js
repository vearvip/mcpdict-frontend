import { fetcher } from "../utils/request";
import qs from 'qs';

/**
 * 查询字符信息。
 *
 * @param {Object} params - 查询参数对象。
 * @param {string|undefined} params.char - 要查询的字符（必需）。
 * @param {string} [params.dialect] - 方言选项（可选）。
 * @returns {Promise<Array>} 包含查询结果的 Promise 对象。
 */
export async function queryChars(params) {
  /**
   * 参数日志输出。
   */
  console.log('params', params);

  if (!params.char) {
    return [];
  }

  try {
    // 使用 qs 库来序列化查询参数，以确保兼容性和正确性。
    const queryString = qs.stringify(params, { addQueryPrefix: true });
    const ret = await fetcher(`/char${queryString}`);

    return ret;
  } catch (error) {
    console.error("Error querying chars:", error);
    // 可以根据需要添加额外的错误处理逻辑
    return [];
  }
}

/**
 * 查询地理信息。
 *
 * @returns {Promise<Object>} 包含地理信息的 Promise 对象。
 */
export async function queryGeo() {
  try {
    const ret = await fetcher(`/dialect/geo`);

    return ret;
  } catch (error) {
    console.error("Error querying geo info:", error);
    return [];
  }
}

/**
 * 查询方言信息。
 *
 * @returns {Promise<Object>} 包含方言信息的 Promise 对象。
 */
export async function queryDialectInfos() {
  try {
    const ret = await fetcher(`/dialect`);

    return ret;
  } catch (error) {
    console.error("Error querying dialect infos:", error);
    return [];
  }
}