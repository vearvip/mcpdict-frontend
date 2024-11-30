/* @refresh reload */
import { render } from 'solid-js/web';

import { Route, HashRouter } from "@solidjs/router";
import './index.css';
import Layout from './layout';
import 'nprogress/nprogress.css'
import { routes } from './routes';

render(
  () => (
    <HashRouter root={Layout}>
      {
        routes.map(ele => {
          return <Route
            path={ele.path}
            component={ele.component}
          />
        })
      }
    </HashRouter>
  ),
  document.getElementById("root") as HTMLElement
); 