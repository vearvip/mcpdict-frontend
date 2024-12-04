import { lazy } from 'solid-js'; 

/**
 * 定义应用程序的路由配置。
 *
 * @type {Array<import('@solidjs/router').RouteDefinition>} 
 */
export const routes = [
  /**
   * 主页路由配置。
   */
  {
    path: "/",
    component: lazy(() => import('@/pages/Index'))
  },
  /**
   * 搜索页面路由配置。
   */
  {
    path: "/search",
    component: lazy(() => import('@/pages/Search'))
  },
  /**
   * 长文搜索页面路由配置。
   */
  {
    path: "/long-search",
    component: lazy(() => import('@/pages/LongSearch'))
  },
  /**
   * 字典页面路由配置。
   */
  {
    path: "/dict",
    component: lazy(() => import('@/pages/Dict'))
  },
  /**
   * 加入页面路由配置。
   */
  {
    path: "/join",
    component: lazy(() => import('@/pages/Join'))
  },
];