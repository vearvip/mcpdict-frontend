import { useEffect, useRef } from "react";
import styles from './index.module.less';
import { copy, generateColorOrGradient, getBackgroundColorFromItem } from "../../utils";
import { JianCheng, JingWeiDu } from "../../utils/constant";
import { showDialectInfo } from "../DialectInfo";
import { useAsyncEffect } from "ahooks";
import { useState } from "react";
import { getLocalPageSettingData } from "../../pages/Setting"

const KEY = "HSnYXzpfPRlVp7fkOywW"

function loadScript(url) {
  return new Promise((resolve, reject) => {
    // 创建一个新的 script 元素
    const script = document.createElement('script');
    // 设置其 src 属性为要加载的 URL
    script.src = url;
    // 加载完成后的回调函数
    script.onload = () => resolve(script);
    // 加载失败的错误处理
    script.onerror = () => reject(new Error('Script failed to load: ' + url));
    // 将 script 元素添加到 head 中以触发加载
    document.head.appendChild(script);
  });
}

/**
 * 地图容器组件，加载maptiler地图并绘制方言点
 * @param {Object} props - 属性对象 
 * @param {React.CSSProperties} [props.style] - 可选的自定义样式对象 
 * @param {Array<Object>} [props.dialectInfos] - dialectInfos
 * @returns {JSX.Element}
 */
export default function Amap({ dialectInfos, style }) {
  const localPageSettingData = getLocalPageSettingData()
  const [mapReady, setMapReady] = useState(false)
  const mapRef = useRef(null);
  const [markerList, setMarkerList] = useState([]) 

  // 加载maptiler地图
  async function loadMap() {
    try {
      if (!window?.maplibregl?.Map) {
        const scriptUrl = `https://unpkg.com/maplibre-gl@5.0.1/dist/maplibre-gl.js`

        // 使用函数加载远程脚本
        await loadScript(scriptUrl);
      }
      return true; // 加载成功
    } catch (error) {
      console.error("地图加载失败：", error);
      return false; // 加载失败
    }
  }

  // 初始化地图
  async function initMap() {
    try {
      const isMapLoaded = await checkMapLoaded();
      if (!isMapLoaded) {

        mapRef.current = new maplibregl.Map({
          container: 'map_container',
          // style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${KEY}`,
          // style: `https://api.maptiler.com/maps/basic-v2/style.json?key=${KEY}`,
          style: `https://api.maptiler.com/maps/landscape/style.json?key=${KEY}`,
          center: [105, 35],
          zoom: 4 // 设置为4以覆盖整个中国
        });

        setTimeout(() => {
          setMapReady(true)
        }, 80);
      }
    } catch (error) {
      console.error("地图初始化失败：", error);
    }
  }

  // 检测地图是否已经挂载在DOM上
  const checkMapLoaded = (timeout = 0) => {
    return new Promise((resolve) => {
      const startTime = new Date().getTime();

      const interval = setInterval(() => {
        const divElement = document.getElementById("map_container");
        if (divElement && divElement.getElementsByTagName("canvas").length > 0) {
          clearInterval(interval);
          resolve(true);
        } else {
          const currentTime = new Date().getTime();
          if (currentTime - startTime > timeout) {
            clearInterval(interval);
            resolve(false);
          }
        }
      }, 100);
    });
  };

  // 销毁地图实例
  const destroyMap = () => {
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
  };

  const makeDialectMarker = dialectItem => {
    const [longitude, latitude] = dialectItem[JingWeiDu].split(',')
    if (!latitude && !latitude) {
      return
    }
    const markerDOM = document.createElement('div')
    const backgroundColor = generateColorOrGradient(getBackgroundColorFromItem(dialectItem))

    if (
      localPageSettingData.mapPageMarkerSize === 'normal'
      || localPageSettingData.mapPageMarkerSize === 'small'
      || localPageSettingData.mapPageMarkerSize === 'ipa'
    ) {
      const dialectNameDOM = document.createElement('div');
      dialectNameDOM.textContent = dialectItem[JianCheng];
      // 动态设置背景色
      dialectNameDOM.style.background = backgroundColor;
      dialectNameDOM.onclick = () => {
        showDialectInfo({
          dialectName: dialectItem[JianCheng],
          color: getBackgroundColorFromItem(dialectItem),
        });
      };

      const phoneticDOM = document.createElement('div');
      phoneticDOM.textContent = dialectItem['phonetic'];
      phoneticDOM.onclick = () => {
        copy(dialectItem['phonetic']);
      };

      // 应用CSS类
      if (localPageSettingData.mapPageMarkerSize === 'normal') {
        dialectNameDOM.classList = [styles.dialect_name_normal]
        phoneticDOM.classList = [styles.phonetic_normal]
        markerDOM.append(dialectNameDOM)
        markerDOM.append(phoneticDOM)
      } else if (localPageSettingData.mapPageMarkerSize === 'small') {
        dialectNameDOM.classList = [styles.dialect_name_small]
        phoneticDOM.classList = [styles.phonetic_small]
        markerDOM.append(dialectNameDOM)
        markerDOM.append(phoneticDOM)
      } else if (localPageSettingData.mapPageMarkerSize === 'ipa') {
        phoneticDOM.classList = [styles.phonetic_ipa]
        phoneticDOM.style.background = backgroundColor
        // 覆盖点击行为
        phoneticDOM.onclick = () => {
          copy(dialectItem['phonetic']);
          showDialectInfo({
            dialectName: dialectItem[JianCheng],
            color: getBackgroundColorFromItem(dialectItem),
          });
        };
        markerDOM.append(phoneticDOM)
      }
    } else if (localPageSettingData.mapPageMarkerSize === 'point') {
      const pointDOM = document.createElement('div');
      pointDOM.classList.add(styles.point);
      pointDOM.style.background = backgroundColor;

      // 创建并配置 Tooltip
      const tooltipDOM = document.createElement('div');
      tooltipDOM.textContent = dialectItem['phonetic'];
      tooltipDOM.classList.add(styles.tooltip); // 确保你已经在 CSS 中定义了这个类
      tooltipDOM.style.display = 'none'; // 初始状态下隐藏 Tooltip

      // 将 Tooltip 添加到 pointDOM 中
      pointDOM.appendChild(tooltipDOM);
      // tooltipDOM.style.display = 'block';

      // 设置点击行为
      pointDOM.onclick = () => {
        copy(dialectItem['phonetic']);
        showDialectInfo({
          dialectName: dialectItem[JianCheng],
          color: getBackgroundColorFromItem(dialectItem),
        });
      };

      // 设置鼠标进入和离开的行为
      pointDOM.addEventListener('mouseenter', () => {
        tooltipDOM.style.display = 'block';
      });

      pointDOM.addEventListener('mouseleave', () => {
        tooltipDOM.style.display = 'none';
      });

      markerDOM.append(pointDOM);
    }




 
    // 使用DOM元素创建Marker
    const marker = new maplibregl.Marker({ element: markerDOM })
      .setLngLat([longitude, latitude]) // 设置标记的经纬度 
    return marker
  }

  // 首次加载时初始化地图
  useEffect(() => {
    loadMap().then(isMapLoaded => {
      if (isMapLoaded) {
        initMap();
      }
    });

    // 组件卸载时销毁地图
    return () => {
      destroyMap();
    };
  }, []);




  useAsyncEffect(async () => {
    if (mapReady) {
      markerList.forEach(marker => {
        try {
          marker.remove();
        } catch (error) {
          console.error('marker移除失败：', error)
        }
      })
      const newMarkerList = dialectInfos.map(item => makeDialectMarker(item)).filter(item => item)
      setMarkerList(newMarkerList)
      // console.log('markerList', newMarkerList)
      newMarkerList.forEach(marker => {

        // 将Marker添加到地图上   
        marker.addTo(mapRef.current);
      })
    }

  }, [dialectInfos, mapReady]);



  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        id="map_container"
        className={styles.container}
        style={style}
      />
    </div>
  );
} 
