import { message } from "antd";
import { JianCheng, YinDianYanSe } from "./constant";

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
};

/**
 * 将字符串中的换行符替换为 HTML `<br/>` 标签，并包裹在一个 `<div>` 中。
 *
 * @param {string} str - 要处理的原始字符串。
 * @returns {string} 包含 `<br/>` 标签的 HTML 字符串。
 */
export let makeBr = function (str) {
  return `<div>${str.replace(/\n/g, "<br/>")}</div>`;
};

/**
 * 创建一个带有属性的对象。
 *
 * @param {*} data - 对象的属性数据。
 * @returns {{props: *}} 包含属性数据的对象。
 */
export let Props = function (data) {
  return { props: data };
};

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
  return [...segments].map((ele) => ele.segment);
};

export function splitStringInto2DArray(text) {
  function splitStr(str) {
    let segmenter = new Intl.Segmenter();
    let segments = segmenter.segment(str);
    return [...segments].map((ele) => ele.segment);
  }
  // 首先根据换行符将字符串切分成一维数组
  let lines = text.split(/\r\n|\r|\n/);

  // 然后将每一行再根据单个字符切分，形成二维数组
  let result = lines.map((line) => splitStr(line));

  return result;
}

export function groupVariants(chars, variants) {
  const result = chars.map((char) => ({ char: char, variants: [] }));

  let currentCharIndex = -1;

  for (let variant of variants) {
    // 查找当前变体是否是基础字符之一
    const charIndex = chars.indexOf(variant);

    if (charIndex !== -1) {
      // 如果是基础字符，则更新当前字符索引
      currentCharIndex = charIndex;
    } else if (currentCharIndex !== -1) {
      // 否则，将变体添加到当前基础字符的变体列表中
      result[currentCharIndex].variants.push(variant);
    }
  }

  // 确保每个基础字符至少包含自身作为其变体之一
  result.forEach((item) => {
    if (!item.variants.includes(item.char)) {
      item.variants.unshift(item.char);
    }
  });

  return result;
}

export function parseSplitStr(infoString) {
  const infos = [];
  // 按照 '\t' 分割字符串
  const entries = infoString.split("\t");

  for (const entry of entries) {
    // 查找音标和释义之间的分隔符（通常是第一个出现的大括号）
    const bracketIndex = entry.indexOf("{");
    let phonetic;
    let explain;

    if (bracketIndex !== -1) {
      // 如果有大括号，则分割音标和释义，并去除花括号
      phonetic = entry.substring(0, bracketIndex).trim();
      explain = entry.substring(bracketIndex + 1, entry.length - 1).trim(); // 去除花括号
    } else {
      // 如果没有大括号，则整个条目视为音标，释义为空
      phonetic = entry.trim();
      explain = "";
    }

    // 将音标和释义添加到infos数组中
    if (phonetic) {
      // 确保音标不为空
      infos.push({ phonetic, explain });
    }
  }
  return infos;
}


/**
 * 复制文本。
 *
 * @param {string} textContent - 文本内容。 
 */
export async function copy(textContent) {
  // console.log('-----textContent', textContent);

  try {
    // 使用现代的 Clipboard API
    await navigator.clipboard.writeText(textContent);
    // 假设 message 是一个全局可用的消息组件
    message.success('复制成功！');
  } catch (err) {
    // 正确地构造错误信息
    message.error(`复制失败：${err.message}`);
  }
}

/**
 * 根据文本内容获取背景颜色。
 *
 * @param {string} dialectName - 文本内容。
 * @returns {string} 对应的背景颜色。
 */
export const getBackgroundColor = (dialectName, dialectInfos) => {
  return dialectName
    ? (dialectInfos.find(ele => ele[JianCheng] === dialectName)?.[YinDianYanSe])
    : undefined;
};

/**
 * 生成颜色或线性渐变字符串。
 *
 * @param {string} colorString - 颜色字符串，可以是单一颜色或者逗号分隔的颜色列表。
 * @returns {string} 单一颜色值或线性渐变字符串。
 */
export function generateColorOrGradient(colorString) { 
  // 清除可能存在的多余空格并分割颜色值
  const colors = (colorString || '').replace(/\s+/g, '').split(',');
  // 检查是否只有一个颜色
  if (colors.length === 1) {
    return colors[0];
  }

  // 如果有多个颜色，则创建CSS线性渐变字符串，从左到右
  const gradientParts = colors.map((color, index) => `${color} ${index * (100 / (colors.length - 1))}%`);
  // console.log('gradientParts', gradientParts)
  let gradientStr = `linear-gradient(to right, ${gradientParts.join(', ')})`
  // console.log('gradientStr', gradientStr)
  return gradientStr;
}

function hexToRgb(hex) {
  // 移除可能存在的#符号并确保是6位数
  let c = hex.replace('#', '').match(/.{1,2}/g);
  return [parseInt(c[0], 16), parseInt(c[1], 16), parseInt(c[2], 16)];
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function weightedInterpolateColor(color1, color2, weight) {
  // 将颜色从十六进制转换为RGB数组
  let [r1, g1, b1] = hexToRgb(color1);
  let [r2, g2, b2] = hexToRgb(color2);

  // 计算带权重的中间颜色，weight参数应该在0到1之间
  let rMid = Math.round((1 - weight) * r1 + weight * r2);
  let gMid = Math.round((1 - weight) * g1 + weight * g2);
  let bMid = Math.round((1 - weight) * b1 + weight * b2);

  // 返回中间颜色的十六进制表示
  return rgbToHex(rMid, gMid, bMid);
}

export function processColors(colors, biasTowardsSecond = 0.65) {
  // 分割颜色字符串
  let colorArray = colors.split(',').map(s => s.trim());

  // 根据颜色数量返回结果
  if (colorArray.length === 1) {
    return colorArray[0];
  } else {
    // 只取前两个颜色进行处理
    let firstTwoColors = colorArray.slice(0, 2);
    return weightedInterpolateColor(firstTwoColors[0], firstTwoColors[1], biasTowardsSecond);
  }
}

// 使用示例
// console.log(processColors('#B2963C,#DEA82A')); // 应该返回偏后一个颜色的过渡中间值
// console.log(processColors('#904F39,#7E7EB8')); // 应该返回偏后一个颜色的过渡中间值
// console.log(processColors('#D17663'));         // 应该直接返回这个颜色


function findDialectsByPath(tree, path) {
  // Split the input path into levels.
  const pathLevels = path.split('-');

  function searchNode(nodes, levels) {
    if (!nodes || levels.length === 0) {
      return [];
    }

    const [currentLevel, ...restLevels] = levels;
    
    for (let node of nodes) {
      if (node.label === currentLevel) {
        if (restLevels.length === 0) {
          // If all levels have been processed, return the dialects of the current node.
          return node.dialects || [];
        } else if (node.children && Array.isArray(node.children)) {
          // Recursively search in the children.
          return searchNode(node.children, restLevels);
        }
      }
    }

    // If no matching node is found, return an empty array.
    return [];
  }

  // Start searching from the root of the tree.
  return searchNode(tree, pathLevels);
}

export const getSearchDialectList = (filterData, dialectCateTree) => {
  let dialectList 
  if (filterData.filterMode === 'lang') {
    dialectList = filterData?.dialectName ? [filterData.dialectName] : []
  } else if (filterData.filterMode === 'custom') { 
    dialectList = filterData.dialectCustoms
  }  else if (filterData.filterMode === 'area') {
    let dialects = findDialectsByPath(dialectCateTree, filterData.dialectArea)
    // console.log('dialects', filterData.dialectArea, dialects)
    dialectList = dialects
  } 
  return dialectList
}