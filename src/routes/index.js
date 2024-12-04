import Index from '@/pages/Index';
import Search from '@/pages/Search';
// import LongSearch from '@/pages/LongSearch';
// import Dict from '@/pages/Dict';
// import Join from '@/pages/Join'; 
/**
 * 定义应用程序的路由配置。 
 */
export const routes = [
  /**
   * 主页路由配置。
   */
  {
    path: "/",
    component:  Index
  },
  /**
   * 搜索页面路由配置。
   */
  {
    path: "/search",
    component:  Search
  },
  // /**
  //  * 长文搜索页面路由配置。
  //  */
  // {
  //   path: "/long-search",
  //   component:  LongSearch
  // },
  // /**
  //  * 字典页面路由配置。
  //  */
  // {
  //   path: "/dict",
  //   component:  Dict
  // },
  // /**
  //  * 加入页面路由配置。
  //  */
  // {
  //   path: "/join",
  //   component:  Join
  // },
];