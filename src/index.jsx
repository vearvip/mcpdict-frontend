import { createRoot } from 'react-dom/client'
import Layout from './layout';
import 'nprogress/nprogress.css'

import './index.less'
import { HashRouter } from 'react-router';


createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Layout />
  </HashRouter>,
)
