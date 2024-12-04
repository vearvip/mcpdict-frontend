/**
 * 返回一个指定范围内的随机整数。
 *
 * @param {number} min - 随机数的最小值（包含）。
 * @param {number} max - 随机数的最大值（不包含）。
 * @returns {number} 返回的随机整数。
 */
export function random(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  var num = Min + Math.round(Rand * Range); //四舍五入
  return num;
}

/**
 * 生成一个随机的 RGB 颜色字符串。
 *
 * @returns {string} 格式为 "rgb(r, g, b)" 的颜色字符串。
 */
export var getRandomColor = function () {
  return `rgb(${random(40, 160)}, ${random(40, 160)}, ${random(40, 160)})`;
}

/**
 * 将字符串中的换行符替换为 HTML `<br/>` 标签，并包裹在一个 `<div>` 中。
 *
 * @param {string} str - 要处理的原始字符串。
 * @returns {string} 包含 `<br/>` 标签的 HTML 字符串。
 */
export let makeBr = function (str) {
  return `<div>${str.replace(/\n/g, "<br/>")}</div>`;
}

/**
 * 创建一个带有属性的对象。
 *
 * @param {*} data - 对象的属性数据。
 * @returns {{props: *}} 包含属性数据的对象。
 */
export let Props = function (data) {
  return { props: data };
}

/**
 * 将字符串分割成字符列表。
 *
 * 注意：此方法使用了实验性的 Intl.Segmenter API，可能不是所有环境中都支持。
 *
 * @param {string} str - 要分割的字符串。
 * @returns {string[]} 分割后的字符数组。
 */
export const str2List = function (str) {
  let segmenter = new Intl.Segmenter();
  let segments = segmenter.segment(str);
  return [...segments].map(ele => ele.segment);
}