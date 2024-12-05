import { useEffect, useRef } from "react";
import styles from './index.module.css';
import AMapLoader from "@amap/amap-jsapi-loader";

const SECURITY_JS_CODE = "1788e1d3a24050a4636c234a115ba0b7"
const KEY = "28e7f63ba379e8c57e5b3dc318b11a4d"


/**
 * 地图容器组件，加载高德地图并绘制路径
 * @param {Object} props - 属性对象
 * @param {React.CSSProperties} [props.style] - 可选的自定义样式对象 
 * @returns {JSX.Element}
 */
export default function Amap({ path, style, apiKey }) {
  const mapRef = useRef(null); 

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
          mapStyle: "amap://styles/normal", // 地图样式
        });
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
 

  return (
    <div
      id="amap_container"
      className={styles.container}
      style={style}
    />
  );
} 
