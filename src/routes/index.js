import Index from '@/pages/Index';
import Search from '@/pages/Search';
import LongSearch from '@/pages/LongSearch';
import Dict from '@/pages/Dict';
// import Join from '@/pages/Join'; 
import Map from '@/pages/Map'; 
/**
 * 定义应用程序的路由配置。 
 */
export const routes = [ 
  {
    title: "首页",
    path: "/",
    component:  Index
  }, 
  {
    title: "字音查询",
    path: "/search",
    component:  Search
  }, 
  {
    title: "长文注音",
    path: "/long-search",
    component:  LongSearch,
    disabled: true,
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
  // {
  //   label: "方言地图",
  //   path: "/map",
  //   component:  Map
  // },
];