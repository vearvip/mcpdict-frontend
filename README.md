# 音典 Web 端

本项目基于 [React](https://github.com/facebook/react) + [Ant Design](https://github.com/ant-design/ant-design) 开发，数据源于[osfans/MCPDict](https://github.com/osfans/MCPDict)

> 在线demo：[https://mcpdict.vear.vip/](https://mcpdict.vear.vip/)

## 项目依赖

- 前端框架：[React](https://github.com/facebook/react)
- UI 框架：[Ant Design](https://github.com/ant-design/ant-design)
- 状态管理：[Zustand](https://github.com/pmndrs/zustand)
- 路由：[React-Router](https://github.com/ReactTraining/react-router)
- css 预处理：[Less](https://github.com/less/less.js)
- 构建工具：[Vite](https://github.com/vitejs/vite)

## 项目结构

```
src/
  - assets/         静态资源
  - components/     公用的组件
  - layout/         页面框架
  - pages/          页面
  - routes/         路由配置
  - services/       请求服务
  - store/          状态管理
  - utils/          公用的方法
  - index.css       全局样式
  - index.jsx       根组件
```

## 快速上手

安装依赖包

```bash
npm install
```

启动项目（项目运行后打开地址 [http://localhost:5173/](http://localhost:5173/)）

```bash
npm run dev
```

打包项目
```bash
npm run build
```

## 首屏优化
如果首屏加载缓慢，可以到`vite.config.js`开启cdn优化
```js
{
  plugins: [
    react(),
    // cdn({
    //   prodUrl: 'https://cdn.bootcdn.net/ajax/libs/{name}/{version}/{path}',
    //   enableInDevMode: true,
    //   modules: [
    //     'react', 
    //     'react-dom', 
    //     // 'dayjs', 
    //     // 'antd',
    //   ],
    // }), 
    visualizer({
      open: false,
    }),
    injectBaiduAnalyticsPlugin(mode) // 注册自定义百度统计插件
  ],
}
```
将cdn的注释解开，这里使用的是bootcdn的cdn，也可以使用jsdelivr cdn，具体用法可以查看[vite-plugin-cdn-import](https://github.com/MMF-FE/vite-plugin-cdn-import)的使用文档

## LICENSE
本项目使用 [MIT](./LICENSE) 开源协议