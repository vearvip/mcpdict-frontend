
import { lazy } from 'solid-js';
import { RouteDefinition } from '@solidjs/router'; 

export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: lazy(() => import('@/pages/Index'))
  },
  {
    path: "/search",
    component: lazy(() => import('@/pages/Search'))
  },
  {
    path: "/long-search",
    component: lazy(() => import('@/pages/LongSearch'))
  },
  {
    path: "/dict",
    component: lazy(() => import('@/pages/Dict'))
  },
  {
    path: "/join",
    component: lazy(() => import('@/pages/Join'))
  },
];