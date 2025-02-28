import { message } from "antd";
import {
  JianCheng,
  YinDianYanSe,
  FenQvEnum,
  KangXi,
  HanDa,
  Sheng,
  Shi,
  Xian,
  Zhen,
  Cun,
  ZiRanCun,
} from "./constant";
import { getLocalPageSettingData } from "../pages/Setting";

export const logoUrl =
  "https://img.alicdn.com/imgextra/i2/O1CN01wwa6MD1aJ7CrANyNt_!!6000000003308-49-tps-256-256.webp";
export const logoLargeUrl =
  "https://img.alicdn.com/imgextra/i3/O1CN01WtzjKK1vMQ086Xn6R_!!6000000006158-49-tps-1280-850.webp";

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

// 拟音各家名称map
const onomatopoeiaMap = {
  廣韻: [
    "切韻拼音",
    "白一平轉寫",
    "古韻羅馬字",
    "有女羅馬字",
    "髙本漢擬音",
    "王力（1957）擬音",
    "王力（1985）擬音",
    "李榮擬音",
    "邵榮芬擬音",
    "蒲立本擬音",
    "鄭張尙芳擬音",
    "潘悟雲（2000）擬音",
    "潘悟雲（2013）擬音",
    "潘悟雲（2023）擬音",
    "unt（2020）擬音",
    "unt（2022）擬音",
    "unt通俗擬音",
    "msoeg擬音",
    "切韻音系描述",
    "攝",
    "方音字彙描述",
    "廣韻韻目原貌",
    "折合平水韻目原貌",
    "反切",
  ],
  中唐: ["unt", "辛克"],
  中原音韻: [
    "楊耐思",
    "寧繼福",
    "薛鳳生（音位形式）",
    "unt（音位形式）",
    "unt",
  ],
  東干語: ["西里爾字母", "音標"],
};
const isOnomatopoeia = (dialectName) => {
  return onomatopoeiaMap[dialectName];
};
function parseOnomatopoeia(phoneticString, dialectName) {
  // const dialectsOfRomanization = ['普通話', '香港', '臺灣', '越南', '朝鮮', '日語吳音', '日語漢音', '日語其他'];
  const dialectsWithBold = ["中原音韻", "日語吳音", "日語漢音", "日語其他"];

  return phoneticString
    .split("\t")
    .map((phonetic) => {
      let isBold =
        dialectsWithBold.includes(dialectName) && phonetic.includes("*");
      if (isBold) {
        phonetic = phonetic.replace(/\*/g, "");
      }
      let item = phonetic.split("/").map((phonetic, index) => {
        let header = onomatopoeiaMap[dialectName][index];
        return {
          phonetic,
          explain: header,
        };
      });
      // .filter(Boolean)
      // console.log('item', item)
      return item;
    })
    .flat();
}

/**
 * 解析读音释义字符串
 *
 * @param {string} infoString - 音标和解析信息字符串。
 * @param {string} dialectName - 方言名
 * @returns {Array<Object}
 */
export function parseSplitStr(
  infoString,
  dialectName,
  needSplitedPhonetic = false, // 是否需要拆分帶斜杠的ipa
  toneMapConfig = []
) {
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
    // 如果是拟音，特殊处理
    if (isOnomatopoeia(dialectName)) {
      infos.push(...parseOnomatopoeia(phonetic, dialectName));
      if (explain) {
        infos.push({ phonetic: "", explain });
      }
    } else {
      // 如果不是拟音，则正常添加进数组
      // 将音标和释义添加到infos数组中
      if (phonetic) {
        if (needSplitedPhonetic) {
          // 这里要对斜杠进行处理并不是只有拟音才有斜杠
          const { toneKey } = getRealPhoneticAndToneKey(
            phonetic,
            toneMapConfig
          ); // 去除調值 toneKey
          const phoneticSplitedList = phonetic.split("/");
          phoneticSplitedList.forEach(
            (splitedPhonetic, splitedPhoneticIndex) => {
              if (splitedPhoneticIndex === phoneticSplitedList.length - 1) {
                // 确保音标不为空
                infos.push({
                  // 最後一個是自帶調值的，無需拼接
                  phonetic: `${splitedPhonetic}`,
                  explain,
                });
              } else {
                // 确保音标不为空
                infos.push({
                  // 需要拼接調值
                  phonetic: `${splitedPhonetic}${toneKey}`,
                  explain,
                });
              }
            }
          );
        } else {
          // 确保音标不为空
          infos.push({ phonetic, explain });
        }
      }
    }
  }
  return infos;
}

/**
 * 复制文本。
 *
 * @param {string} textContent - 文本内容。
 */
export async function copy(textContent, showMessage = true) {
  // console.log('-----textContent', textContent);

  try {
    // 使用现代的 Clipboard API
    await navigator.clipboard.writeText(textContent);
    // 假设 message 是一个全局可用的消息组件
    showMessage && message.success("复制成功！");
  } catch (err) {
    // 正确地构造错误信息
    showMessage && message.error(`复制失败：${err.message}`);
  }
}

/**
 * 根据文本内容获取背景颜色。
 *
 * @param {string} dialectName - 文本内容。
 * @returns {string} 对应的背景颜色。
 */
export const getBackgroundColorByName = (dialectName, dialectInfos) => {
  const pageSettingData = getLocalPageSettingData();
  const colorKey = FenQvEnum[pageSettingData.partitionMode].color;
  return dialectName
    ? dialectInfos.find((ele) => ele[JianCheng] === dialectName)?.[colorKey]
    : undefined;
};

/**
 * 根据文本内容获取背景颜色。
 *
 * @param {string} dialectName - 文本内容。
 * @returns {string} 对应的背景颜色。
 */
export const getBackgroundColorFromItem = (dialectItem) => {
  const pageSettingData = getLocalPageSettingData();
  const colorKey = FenQvEnum[pageSettingData.partitionMode].color;
  return dialectItem[colorKey];
};

/**
 * 生成颜色或线性渐变字符串。
 *
 * @param {string} colorString - 颜色字符串，可以是单一颜色或者逗号分隔的颜色列表。
 * @returns {string} 单一颜色值或线性渐变字符串。
 */
export function generateColorOrGradient(colorString) {
  // 清除可能存在的多余空格并分割颜色值
  const colors = (colorString || "").replace(/\s+/g, "").split(",");
  // 检查是否只有一个颜色
  if (colors.length === 1) {
    return colors[0];
  }

  // 如果有多个颜色，则创建CSS线性渐变字符串，从左到右
  const gradientParts = colors.map(
    (color, index) => `${color} ${index * (100 / (colors.length - 1))}%`
  );
  // console.log('gradientParts', gradientParts)
  let gradientStr = `linear-gradient(to right, ${gradientParts.join(", ")})`;
  // console.log('gradientStr', gradientStr)
  return gradientStr;
}

function hexToRgb(hex) {
  // 移除可能存在的#符号并确保是6位数
  let c = hex.replace("#", "").match(/.{1,2}/g);
  return [parseInt(c[0], 16), parseInt(c[1], 16), parseInt(c[2], 16)];
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
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
  let colorArray = colors.split(",").map((s) => s.trim());

  // 根据颜色数量返回结果
  if (colorArray.length === 1) {
    return colorArray[0];
  } else {
    // 只取前两个颜色进行处理
    let firstTwoColors = colorArray.slice(0, 2);
    return weightedInterpolateColor(
      firstTwoColors[0],
      firstTwoColors[1],
      biasTowardsSecond
    );
  }
}

// 使用示例
// console.log(processColors('#B2963C,#DEA82A')); // 应该返回偏后一个颜色的过渡中间值
// console.log(processColors('#904F39,#7E7EB8')); // 应该返回偏后一个颜色的过渡中间值
// console.log(processColors('#D17663'));         // 应该直接返回这个颜色

function findDialectsByPath(tree, path) {
  // Split the input path into levels.
  if (!path) {
    return [];
  }
  const pathLevels = path.split("-");

  function searchNode(nodes, levels) {
    if (!nodes || levels.length === 0) {
      return [];
    }

    const [currentLevel, ...restLevels] = levels;

    for (let node of nodes) {
      if (node.title === currentLevel) {
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

export const getSearchDialectList = (
  filterData,
  dialectCateTree,
  dialectDistrictTree
) => {
  let dialectList;
  if (filterData.filterMode === "lang") {
    dialectList = filterData?.dialectName ? [filterData.dialectName] : [];
  } else if (filterData.filterMode === "custom") {
    dialectList = filterData.dialectCustoms;
  } else if (filterData.filterMode === "area") {
    let dialects = findDialectsByPath(dialectCateTree, filterData.dialectArea);
    // console.log('dialects', filterData.dialectArea, dialects)
    dialectList = dialects;
  } else if (filterData.filterMode === "district") {
    let dialects = findDialectsByPath(
      dialectDistrictTree,
      filterData.dialectDistrict
    );
    // console.log("dialects", dialects);
    dialectList = dialects;
  }
  return dialectList;
};

export function transformDialectInfosToTree(dialectInfos) {
  const tree = {};

  dialectInfos.forEach((dialectInfo) => {
    const pageSettingData = getLocalPageSettingData();
    const dialectLevels = dialectInfo[pageSettingData.partitionMode].split("-");
    const languageShortName = dialectInfo[JianCheng];

    function addDialectNode(levels, shortName, node, pathSoFar = "") {
      if (levels.length === 0) return;

      const currentLevel = levels.shift();
      const fullPath = pathSoFar
        ? `${pathSoFar}-${currentLevel}`
        : currentLevel;
      if (!node[currentLevel]) {
        node[currentLevel] = {
          title: currentLevel,
          value: fullPath,
          dialects: [],
        };
      }

      // Add the short name of the language to the current level's dialects array if it's not already there.
      if (!node[currentLevel].dialects.includes(shortName)) {
        node[currentLevel].dialects.push(shortName);
      }

      // Recursively process the remaining levels.
      if (levels.length > 0) {
        if (!node[currentLevel].children) {
          node[currentLevel].children = {};
        }
        addDialectNode(
          levels,
          shortName,
          node[currentLevel].children,
          fullPath
        );
      }
    }

    addDialectNode(dialectLevels, languageShortName, tree);
  });

  // Convert the object to an array and clean up empty children.
  function cleanUpEmptyChildren(node) {
    if (node.children) {
      // Clean up each child recursively.
      node.children = Object.values(node.children).map(cleanUpEmptyChildren);

      // Remove the children property if it's empty.
      if (node.children.length === 0) {
        delete node.children;
      }
    }
    return node;
  }

  // Convert the tree object into an array and clean up any empty children.
  const result = Object.values(tree).map(cleanUpEmptyChildren);

  // Sort the dialects in each node for consistency (optional).
  result.forEach(function sortDialectsRecursively(node) {
    if (node.dialects) {
      node.dialects.sort();
    }
    if (node.children) {
      node.children.forEach(sortDialectsRecursively);
    }
  });

  return result;
}

export function formatShuowenText(text, type) {
  // Helper function to convert the number format to "第X頁Y字"
  function convertPageNumber(match, prefix, p1, p2, type) {
    const page = parseInt(p1, 10);
    const word = parseInt(p2, 10);
    let formattedPageWord = `第${page}頁第${word}字`;

    if (type === KangXi) {
      formattedPageWord = `<a target="_blank" href="https://www.kangxizidian.com/v1/index.php?page=${page}">第${page}頁</a>第${word}字`;
    } else if (type === HanDa) {
      formattedPageWord = `<a target="_blank" href="https://homeinmists.ilotus.org/hd/png/${page}.png">第${page}頁</a>第${word}字`;
    }

    return `${prefix}${formattedPageWord}<br />`;
  }

  // Adjusted regex to match the page number format after any characters and before the first \n
  const pageNumberRegex = /^(.*?)([0-9]+)\.([0-9]+)\n/;
  text = text.replace(pageNumberRegex, (match, prefix, p1, p2) =>
    convertPageNumber(match, prefix, p1, p2, type)
  );

  // Replace newline characters with <br />
  text = text.replace(/\n/g, "<br />");

  // Replace content within Chinese brackets 〔〕 or full-width braces ｛｝ with span tags
  text = text.replace(
    /〔([^〕]*)〕|｛([^｝]*)｝/g,
    '<span class="shuowen_explain">$1$2</span>'
  );

  return text;
}

/**
 * 将字符串中的数字和小写字母替换为其对应的圆圈字符。
 * 对于大写字母，先转换为小写后再进行替换。
 *
 * @param {string} str - 输入字符串，其中可能包含数字和字母。
 * @returns {string} - 替换后的字符串，其中数字和字母被替换为对应的圆圈字符。
 */
export function replaceWithCircled(str) {
  // 定义数字和小写字母的圆圈字符映射
  const circledNumbers = "⓪①②③④⑤⑥⑦⑧⑨";
  const circledLettersLower = "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ";

  // 创建普通字符到圆圈字符的映射
  const circledMap = {};
  "0123456789".split("").forEach((num, index) => {
    circledMap[num] = circledNumbers[index];
  });
  "abcdefghijklmnopqrstuvwxyz".split("").forEach((letter, index) => {
    circledMap[letter] = circledLettersLower[index];
  });

  // 将字符串中的字符替换为对应的圆圈字符，
  // 在映射前将大写字母转换为小写。
  return str
    .split("")
    .map((char) => {
      // 如果是字母字符，先将其转换为小写
      const lowerChar = char.toLowerCase();
      // 使用圆圈字符替换，如果没有对应字符则保留原字符
      return circledMap[lowerChar] || char;
    })
    .join("");
}

/**
 * 将表示音高的数字字符串转换为相应的音高曲线符号字符串
 *
 * @param {string} str - 输入的表示音高的数字字符串，默认为空字符串
 * @returns {string} - 转换后的音高曲线符号字符串
 */
export const convertPitchNum2Curve = (str = "") => {
  // 将输入的字符串分割成字符数组
  let list = str.split("");
  if (list.length === 2) {
    // 重复的调值，在这里去重
    list = [...new Set(list)];
  }

  // 定义音高数字与音高曲线符号的映射关系
  // ˩ ˨ ˧ ˦ ˥
  // 12345
  const relationMap = {
    1: "˩",
    2: "˨",
    3: "˧",
    4: "˦",
    5: "˥",
  };

  // 将字符数组中的每个字符转换为对应的音高曲线符号，如果找不到对应关系则保留原字符
  return list
    .map((char) => {
      return relationMap[char] || char;
      // 将转换后的字符数组重新拼接成字符串返回
    })
    .join("");
};

export const getRealPhoneticAndToneKey = (phonetic, toneMapConfig) => {
  let _toneKey = "";
  let _phonetic = "";
  let _tonePitch = "";
  for (const toneKey in toneMapConfig) {
    if (
      Object.prototype.hasOwnProperty.call(toneMapConfig, toneKey) &&
      typeof phonetic === "string"
    ) {
      if (phonetic.indexOf(toneKey) !== -1) {
        _phonetic = phonetic.replace(toneKey, "");
        _toneKey = toneKey;
        _tonePitch = toneMapConfig?.[toneKey]?.[0];
      }
    }
  }
  // 如果没有音调，则返回原音标
  if (phonetic && !_phonetic) {
    _phonetic = phonetic;
  }
  const result = {
    phonetic: _phonetic,
    toneKey: _toneKey,
    tonePitch: _tonePitch,
  };
  // console.log('result', {phonetic, toneMapConfig}, result)
  return result;
};

/**
 * 延迟
 * @param {number} timeout 延迟时间
 * @returns {Promise}
 */
export const delay = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

export function buildDistrictTree(data) {
  const provinces = [
    "北京",
    "天津",
    "上海",
    "重慶",
    "河北",
    "山西",
    "遼寧",
    "吉林",
    "黑龍江",
    "江蘇",
    "浙江",
    "安徽",
    "福建",
    "江西",
    "山東",
    "河南",
    "湖北",
    "湖南",
    "廣東",
    "海南",
    "四川",
    "貴州",
    "雲南",
    "陝西",
    "甘肅",
    "靑海",
    "臺灣",
    "內蒙古",
    "廣西",
    "西藏",
    "寧夏",
    "新疆",
    "香港",
    "澳門",
  ];
  // Helper function to insert or find a node in the tree
  function insertIntoTree(tree, path, dialect) {
    let currentNode = tree;
    for (let i = 0; i < path.length; i++) {
      let level = path[i];
      let foundNode = currentNode.find((node) => node.title === level);
      if (!foundNode) {
        let value = path.slice(0, i + 1).join("-");
        foundNode = { title: level, value, dialects: [] };
        // Only add children array if there is a deeper level
        if (i < path.length - 1) {
          foundNode.children = [];
        }
        currentNode.push(foundNode);
      }
      // Add the dialect name only at the deepest level
      if (i === path.length - 1 && !foundNode.dialects.includes(dialect)) {
        foundNode.dialects.push(dialect);
      }
      if (foundNode.children) {
        currentNode = foundNode.children;
      }
    }
  }

  // Helper function to collect all dialect names under each districtistrative level
  function collectDialectNames(node) {
    if (node.children) {
      node.children.forEach((child) => {
        collectDialectNames(child);
        // Add child's dialect names to parent's dialect names
        child.dialects.forEach((dialect) => {
          if (!node.dialects.includes(dialect)) {
            node.dialects.push(dialect);
          }
        });
      });
    }
  }

  // Initialize the tree
  let districtTree = [];

  // Iterate over each data entry and build the tree
  data.forEach((entry) => {
    // Construct the path from the districtistrative divisions, ignoring empty entries
    let path = [
      entry[Sheng],
      entry[Shi],
      entry[Xian],
      entry[Zhen],
      entry[Cun],
      entry[ZiRanCun],
    ].filter(Boolean);

    // Insert this path into the tree and update dialects
    if (path.length > 0) {
      // Ensure there is at least one level of districtistrative division
      insertIntoTree(districtTree, path, entry[JianCheng]);
    }
  });

  // Collect all dialect names for each districtistrative level
  districtTree.forEach((rootNode) => {
    collectDialectNames(rootNode);
  });

  // Ensure all provinces are included in the tree
  let existingProvinces = new Set(districtTree.map((node) => node.title));
  provinces.forEach((province) => {
    if (!existingProvinces.has(province)) {
      let newNode = { title: province, value: province, dialects: [] };
      districtTree.push(newNode);
    }
  });

  return districtTree;
}

export const isApple = () =>
  ["Mac", "iPhone", "iPad", "iPod"].some((platform) =>
    navigator.platform.includes(platform)
  );

export const isSafari = () =>
  navigator.userAgent.includes("Safari") &&
  !navigator.userAgent.includes("Chrome");

export const clearPageCache = async () => {
  message.success("清除页面缓存成功");
  await delay(100);
  // window.localStorage.clear() // 清除所有缓存
  window.localStorage.removeItem("filterData"); //清除 filterData缓存
  window.localStorage.removeItem("pageSettingData"); //清除 pageSettingData缓存
  window.localStorage.removeItem("hisotryRecordList"); //清除 hisotryRecordList缓存

  window.location.reload(); // 刷新页面
};
