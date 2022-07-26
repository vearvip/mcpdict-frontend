import { IRouterConfig, lazy } from "ice";
import Layout from "@/Layouts/BasicLayout";
import Index from "./pages/Index";
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
        component: Index
      },
      {
        path: "/ceshi",
        exact: true,
        component: Ceshi
      },
      {
        component: NotFound
      }
    ]
  }
];

export default routerConfig;
