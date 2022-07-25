import { IRouterConfig, lazy } from 'ice';
import Layout from '@/Layouts/BasicLayout';
import Index from './pages/Index';
 
const NotFound = lazy(() => import('@/components/NotFound'));

const routerConfig: IRouterConfig[] = [
  {
    path: '/',
    component: Layout,
    children: [{
      path: '/',
      exact: true,
      component: Index,
    }, {
      component: NotFound,
    }],
  },
];

export default routerConfig;
