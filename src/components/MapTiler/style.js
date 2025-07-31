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
      'http://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', // 卫星图
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
 
