import React from 'react'
const Index = React.lazy(() => import('@/pages/Index'));
const Search = React.lazy(() => import('@/pages/Search'));
const LongSearch = React.lazy(() => import('@/pages/LongSearch'));
const Dict = React.lazy(() => import('@/pages/Dict'));
// const Join =  React.lazy(() => import('@/pages/Join')); 
const Map = React.lazy(() => import('@/pages/Map'));
const Ceshi = React.lazy(() => import('../pages/Ceshi')); 
import Setting from '../pages/Setting'; // 这个页面就不动态导入了

/**
 * 定义应用程序的路由配置。 
 */
export const routes = [
  {
    title: "首页",
    path: "/",
    component: Index
  },
  {
    title: "字音查询",
    path: "/search",
    component: Search
  },
  {
    title: "长文注音",
    path: "/long-search",
    component: LongSearch,
    // disabled: true,
  },
  // {
  //   title: "字典模式",
  //   path: "/dict",
  //   component:  Dict,
  //   disabled: true,
  // }, 
  // {
  //   title: "参与注音",
  //   path: "/join",
  //   component:  Join
  // },
  {
    title: "语言地图",
    path: "/map",
    component: Map,
    // disabled: true,
    beta: true,
  },
  {
    title: "设置",
    path: "/setting",
    component: Setting,
    // disabled: true,
  },
  {
    title: "测试",
    path: "/ceshi",
    component: Ceshi,
    hidden: true,
  },
];