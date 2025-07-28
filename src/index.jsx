import { createRoot } from 'react-dom/client'
import Layout from './layout';
import 'nprogress/nprogress.css'

import './index.less'
import { HashRouter, BrowserRouter } from 'react-router';
import HashRouterCompatibility from './components/HashRouterCompatibility';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <HashRouterCompatibility />
    <Layout />
  </BrowserRouter>,
)
