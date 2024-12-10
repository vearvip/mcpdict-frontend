import { useEffect, useRef } from "react";
import styles from './index.module.css';
import useStore from '@/store';
import AMapLoader from "@amap/amap-jsapi-loader";
import { Button } from "antd";
import { message } from "antd";
import { generateColorOrGradient, getBackgroundColor } from "../../utils";
import { JianCheng, JingWeiDu, YinDianYanSe } from "../../utils/constant";
import { showDialectInfo } from "../DialectInfo";
import { useAsyncEffect } from "ahooks";
import { useState } from "react";

const SECURITY_JS_CODE = "1788e1d3a24050a4636c234a115ba0b7"
const KEY = "28e7f63ba379e8c57e5b3dc318b11a4d"


/**
 * 地图容器组件，加载高德地图并绘制路径
 * @param {Object} props - 属性对象
 * @param {React.CSSProperties} [props.style] - 可选的自定义样式对象 
 * @returns {JSX.Element}
 */
export default function Amap({ path, style, apiKey }) {
  const [mapReady, setMapReady] = useState(false)
  const mapRef = useRef(null);
  const { store } = useStore()

  // 加载高德地图
  async function loadMap() {
    try {
      if (!window.AMap) {
        window._AMapSecurityConfig = {
          securityJsCode: SECURITY_JS_CODE,
        };
        window.AMap = await AMapLoader.load({
          key: KEY, // 传入的Web端开发者Key
          version: "2.0", // 指定要加载的 JSAPI 的版本
          plugins: [], // 需要使用的插件列表
        });
      }
      return true; // 加载成功
    } catch (error) {
      console.error("高德地图加载失败：", error);
      return false; // 加载失败
    }
  }

  // 初始化地图
  async function initMap() {
    try {
      const isMapLoaded = await checkMapLoaded();
      if (!isMapLoaded) {
        mapRef.current = new AMap.Map("amap_container", {
          viewMode: "3D", // 是否为3D地图模式
          // mapStyle: "amap://styles/normal", // 地图样式
          mapStyle: "amap://styles/whitesmoke", // 远山黛
          // mapStyle: "amap://styles/light", // 月光银
          // mapStyle: "amap://styles/fresh", // 草色青
          // mapStyle: "amap://styles/macaron", // 草色青
          zoom: 5, // 设置为4以覆盖整个中国
          center: [105.602725, 35.076636], // 调整纬度到约35度
        });

        setTimeout(() => {
          setMapReady(true)
        }, 80);
      }
    } catch (error) {
      console.error("地图初始化失败：", error);
    }
  }

  // 检测高德地图是否已经挂载在DOM上
  const checkMapLoaded = (timeout = 0) => {
    return new Promise((resolve) => {
      const startTime = new Date().getTime();

      const interval = setInterval(() => {
        const divElement = document.getElementById("amap_container");
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
      mapRef.current.destroy();
      mapRef.current = null;
    }
  };

  const markerDialect = dialectItem => {
    const [longitude, latitude] = dialectItem[JingWeiDu].split(',')
    if (!latitude && !latitude) {
      return
    }
    const markerDOM = document.createElement('div')
    markerDOM.textContent = dialectItem[JianCheng]
    // markerDOM.style.minWidth = '40px'
    // markerDOM.style.border = '1px solid red'
    markerDOM.style.height = '20px'
    markerDOM.style.padding = '2px 5px'
    markerDOM.style.borderRadius = '4px'
    markerDOM.style.color = 'white'
    markerDOM.style.background = generateColorOrGradient(dialectItem[YinDianYanSe])
    if (dialectItem[JianCheng] === '桃源薛家沖') {
      console.log(dialectItem[JianCheng], markerDOM.style.background, dialectItem[YinDianYanSe])
    }
    markerDOM.style.whiteSpace = 'nowrap'
    markerDOM.onclick = () => {
      showDialectInfo({
        dialectName: dialectItem[JianCheng],
        color: dialectItem[YinDianYanSe]
      })
    }

    const position = new AMap.LngLat(longitude, latitude); //Marker 经纬度
    const marker = new AMap.Marker({
      position: position,
      content: markerDOM, //将 html 传给 content
      offset: new AMap.Pixel(-13, -30), //以 icon 的 [center bottom] 为原点
    });
    mapRef.current.add(marker);
  }

  // 首次加载时初始化地图
  useEffect(() => {
    loadMap().then(isAMapLoaded => {
      if (isAMapLoaded) {
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
      store.dialectInfos.forEach(item => {
        markerDialect(item)
      })
    }

  }, [store, mapReady]);



  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        id="amap_container"
        className={styles.container}
        style={style}
      />
    </div>
  );
} 
