# 汉字音典 Web 端

本项目基于 [React](https://github.com/facebook/react) + [Ant Design](https://github.com/ant-design/ant-design) 开发，数据源于[osfans/MCPDict](https://github.com/osfans/MCPDict)

> 在线访问：[https://mcpdict.vear.vip/](https://mcpdict.vear.vip/)

当前是`前端仓库`，`服务端仓库`请访问:[vearvip/mcpdict-backend](https://github.com/vearvip/mcpdict-backend)

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
  - index.less      全局样式
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
## 已实现功能
  - 字音查询（可以按照如下方式进行筛选）
    - 单选语言
    - 自选多个语言
    - 选择分区（地图集二分区 or 音典分区）
    - 行政区
  - 长文注音（只可以选择单个语言）
  - 方言地图（筛选方式同字音查询，但只可以查询单个字）
  - 设置
  - 推荐资源

## 功能待开发列表  
  - ~~实现设置页的【调值】、【调类】切换~~
    - ~~调类样式~~
      - ~~12345678~~
      - ~~①②③④⑤⑥⑦⑧~~
      - ~~①②③④~~
      - ~~平上去入~~
      - ~~上排调值、下排调类~~
      - ~~隐藏~~
    - ~~调值样式~~
      - ~~曲线~~
      - ~~数字~~
      - ~~隐藏~~
  - ~~实现长文搜索页的文字样式展示切换~~
    - ~~「IPA」~~
    - ~~「IPA+字」~~
    - ~~「IPA+曲折线调值」~~
    - ~~「IPA+曲折线调值+字」~~
    - ~~「IPA+调类」~~
    - ~~「IPA+调类+字」~~
    - ~~「IPA+曲折线调值+调类」~~
    - ~~「IPA+曲折线调值+调类+字」~~
  - ~~对各家拟音进行解析~~
    - ~~参考：https://github.com/nk2028/hdqt/blob/main/src/routes/DataTable.svelte~~
  - ~~实现省市区依照现行行政区筛选~~
  - ~~实现搜索页结果按照排序字段来排序~~
    - ~~设置页选择【地图集二分区】时按照【地图集二排序】来~~
    - ~~设置页选择【音典分区】时按照【音典排序】来~~
  - 实现设置页表格展示时候的Excel下载功能
  - 考虑迁移到Taro实现兼容`H5+小程序+Android+iOS`
    - 成本较高待进一步考虑
  - 考虑绘制方言区块地图
    - 获取全国5级别shp
    - 按照方言点对应相应的5级区块
    - 融合相邻的区块
    - 成本较高待进一步考虑
  - 方言分区多选和行政区多选
  - ~*`换掉高德地图`*~
    - ~高德地图打电话说API访问量打到日一千次，涉及商用了~
    - ~我寻思网站一天也妹能有100个人啊，有50个人访问我就谢天谢地了~
    - ~目前考虑MapLibre来替换掉高德~
  - ......
## 已知bug记录
  - 当在地图页输入单字为`Uncode 扩展G区`的汉字时，会导致输入框以为输入了2个以上的汉字，会爆红，例如“𰃘”字
    - 这是Ant Design的bug，后期考虑重写Input组件
  - 首页的【已收录】模块，在ios和MacOS的Safari浏览器下会卡死，但是在windows和Android下没有异样
    - 原因不明，先直接屏蔽，后期再考虑解决
  - ~~点击筛选弹窗的 x 关闭按钮时，会导致筛选清空~~
  - ~~虚拟滚动有问题，在2k及以上分辨率的屏幕下会导致空白，或者无法滚动~~
    - ~~考虑使用react-virtualized，滚动的容器也使用js来计算高度，不使用css的calc了~~
  - ~~长文搜索时，如果碰到搜不出的字，就直接不展示了，导致吃字了~~
  - 点击设置按钮以Dialog形式弹出Filter时，主题色不对，用得是antd的默认主题色
    - 看起来是没拿到ConfigProvider
  - ......

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
