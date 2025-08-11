const maptilerKey = "HSnYXzpfPRlVp7fkOywW"

// 统一的地图样式配置
const mapStyleConfigData = {

  // 天地图服务
  tianditu: {
    name: '天地图',
    custom: true,
    tiles: [
      'https://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=9a516b0f2a8179bb68f73172cff4bd22', // 无标注路网图
    ],
  },
  tianditu_img: {
    name: '天地图卫星图',
    custom: true,
    tiles: [
      'https://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=9a516b0f2a8179bb68f73172cff4bd22', // 卫星图
    ],
  },

  // 高德地图服务
  gaode: {
    name: '高德地图',
    custom: true,
    tiles: [
      'https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}', // 路网图
    ],
  },
  gaode_satellite: {
    name: '高德卫星图',
    custom: true,
    tiles: [
      'http://webst04.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', // 卫星图
    ],
  },

  // MapTiler 地图服务
  maptiler: {
    name: 'MapTiler街道图',
    custom: false,
    url: `https://api.maptiler.com/maps/streets-v2/style.json?key=${maptilerKey}`,
  },
  maptiler_basic: {
    name: 'MapTiler基础图',
    custom: false,
    url: `https://api.maptiler.com/maps/basic-v2/style.json?key=${maptilerKey}`,
  },
  maptiler_landscape: {
    name: 'MapTiler地形图',
    custom: false,
    url: `https://api.maptiler.com/maps/landscape/style.json?key=${maptilerKey}`,
  },
  maptiler_streets: {
    name: 'MapTiler经典街道',
    custom: false,
    url: `https://api.maptiler.com/maps/streets/style.json?key=${maptilerKey}`,
  },

  // Stadia Maps 地图服务
  stadiamaps: {
    name: 'Stadia Maps',
    custom: false,
    url: 'https://tiles.stadiamaps.com/styles/osm_bright.json',
  },

  // ArcGIS 地图服务
  arcgis: {
    name: 'ArcGIS街道图',
    custom: true,
    tiles: [
      'https://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', // 街道图
    ],
  },
  arcgis_light_gray: {
    name: 'ArcGIS灰底图',
    custom: true,
    tiles: [
      'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/WMTS/tile/6.0.0/Canvas_World_Light_Gray_Base/default/default028mm/{z}/{y}/{x}/', // 灰底图
    ],
  },
  arcgis_dark_gray: {
    name: 'ArcGIS暗黑图',
    custom: true,
    tiles: [
      'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/WMTS/tile/6.0.0/Canvas_World_Dark_Gray_Base/default/default028mm/{z}/{y}/{x}/', // 暗黑图
    ],
  },
  arcgis_natgeo: {
    name: 'ArcGIS自然地理',
    custom: true,
    tiles: [
      'https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', // 自然地理图
    ],
  },
  arcgis_satellite: {
    name: 'ArcGIS卫星图',
    custom: true,
    tiles: [
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', // 卫星图
    ],
  },

  // 其他地图服务
  opentopomap: {
    name: 'OpenTopoMap地形图',
    custom: true,
    tiles: [
      'https://c.tile.opentopomap.org/{z}/{x}/{y}.png', // 等高线地形图
    ],
  },
  thunderforest_cycle: {
    name: 'OpenCycle地形图',
    custom: true,
    tiles: [
      'http://a.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=a5dd6a2f1c934394bce6b0fb077203eb', // OpenCycle地形图
    ],
  },
};

// 导出用于UI显示的配置
export const mapStyleConfig = Object.fromEntries(
  Object.entries(mapStyleConfigData).map(([key, config]) => [key, config.name])
);

export const mapStyle = (name) => {
  const config = mapStyleConfigData;
  if (!config[name].custom) {
    return config[name].url
  } else {


    return {
      version: 8, // MapLibre样式版本
      name: name,
      sources: {
        [name]: { // 自定义源名称
          type: 'raster',
          tiles: config[name].tiles,
          tileSize: 256, // 确保与瓦片服务一致
          maxzoom: 18, // 根据实际需求调整最大缩放级别
          minzoom: 0 // 添加最小缩放级别
        }
      },
      layers: [
        {
          id: `${name}-layer`, // 图层ID
          type: 'raster',
          source: name, // 关联到定义的源
          paint: {
            'raster-opacity': 1 // 确保图层完全可见
          }
        }
      ]
    }
  }
}

export function calculateDenseMapCenterAndZoom(coords, densityPercentile = 0.85) {
  // 输入验证
  if (!Array.isArray(coords) || coords.length === 0) {
    throw new Error('坐标数组不能为空');
  }

  // 验证坐标格式和有效性
  const validCoords = coords.filter(coord => {
    return Array.isArray(coord) && 
           coord.length === 2 && 
           typeof coord[0] === 'number' && 
           typeof coord[1] === 'number' &&
           coord[0] >= -90 && coord[0] <= 90 && // 纬度范围
           coord[1] >= -180 && coord[1] <= 180; // 经度范围
  });

  if (validCoords.length === 0) {
    throw new Error('没有有效的坐标数据');
  }

  // 处理单点情况
  if (validCoords.length === 1) {
    const [lat, lng] = validCoords[0];
    return {
      center: [lat, lng],
      zoom: 15
    };
  }

  // 分离纬度和经度（注意：这里假设输入格式为 [lat, lng]）
  const lats = validCoords.map(coord => coord[0]);
  const lngs = validCoords.map(coord => coord[1]);

  // 计算核心区域边界（使用百分位数排除离群点）
  const latRange = getPercentileRange(lats, densityPercentile);
  const lngRange = getPercentileRange(lngs, densityPercentile);

  // 计算核心区域中心点
  const center = [
    (latRange.min + latRange.max) / 2,
    (lngRange.min + lngRange.max) / 2
  ];

  // 计算核心区域的大小（度数）
  const latSpan = latRange.max - latRange.min;
  const lngSpan = lngRange.max - lngRange.min;

  // 计算缩放级别 - 基于核心区域大小
  const zoom = calculateZoomFromSpan(latSpan, lngSpan, center[0]);

  return {
    center,
    zoom: Math.min(Math.max(zoom, 3), 20) // 限制在3-20的合理范围
  };
}

// 辅助函数：计算数值范围的百分位数范围
function getPercentileRange(values, percentile) {
  // 创建副本并排序
  const sorted = [...values].sort((a, b) => a - b);

  // 处理小数据集的情况
  if (sorted.length <= 2) {
    return {
      min: sorted[0],
      max: sorted[sorted.length - 1]
    };
  }

  // 计算排除的百分比
  const exclude = (1 - percentile) / 2;
  const lowIndex = Math.max(0, Math.floor(sorted.length * exclude));
  const highIndex = Math.min(sorted.length - 1, Math.ceil(sorted.length * (1 - exclude)));

  return {
    min: sorted[lowIndex],
    max: sorted[highIndex]
  };
}

// 辅助函数：根据区域大小计算缩放级别
function calculateZoomFromSpan(latSpan, lngSpan, centerLat) {
  // 地球周长参考值（米）
  const EARTH_CIRCUMFERENCE = 40075000;

  // 纬度跨度转换为米（固定值）
  const latSpanMeters = latSpan * (EARTH_CIRCUMFERENCE / 360);

  // 经度跨度转换为米（考虑纬度影响）
  const lngSpanMeters = Math.abs(lngSpan) *
    (EARTH_CIRCUMFERENCE / 360) *
    Math.cos(centerLat * Math.PI / 180);

  // 取较大跨度作为基准
  const maxSpanMeters = Math.max(latSpanMeters, lngSpanMeters);

  // 经验公式计算缩放级别（基于256px瓦片）
  const zoom = Math.log2(EARTH_CIRCUMFERENCE / (maxSpanMeters * 1.5));

  return Math.round(zoom);
}
