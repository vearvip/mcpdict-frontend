/* @refresh reload */
import { render } from 'solid-js/web';

import { Route, Router } from "@solidjs/router";
import './index.css';
import Layout from './layout';
import 'nprogress/nprogress.css'
import { routes } from './routes';

render(
  () => (
    <Router root={Layout}>
      {
        routes.map(ele => {
          return <Route
            path={ele.path}
            component={ele.component}
          />
        })
      }
    </Router>
  ),
  document.getElementById("root") as HTMLElement
); 