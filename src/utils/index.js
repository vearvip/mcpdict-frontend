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
