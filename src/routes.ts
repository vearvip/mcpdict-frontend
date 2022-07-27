import { IRouterConfig, lazy } from "ice";
import Layout from "@/Layouts/BasicLayout";
import Index from "./pages/Index";
import Search from "./pages/Search";
import LongSearch from "./pages/LongSearch";
import Dict from "./pages/Dict";
import Ceshi from "./pages/Ceshi";

const NotFound = lazy(() => import("@/components/NotFound"));

const routerConfig: IRouterConfig[] = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        exact: true,
        component: Index,
      },
      {
        path: "/search",
        exact: true,
        component: Search
      },
      {
        path: "/ceshi",
        exact: true,
        component: Ceshi
      },
      {
        path: "/long-search",
        exact: true,
        component: LongSearch
      },
      {
        path: "/dict",
        exact: true,
        component: Dict
      },
      {
        component: NotFound
      }
    ]
  }
];
 
export default routerConfig;
