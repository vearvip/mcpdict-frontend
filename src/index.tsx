/* @refresh reload */
import { render } from 'solid-js/web';

import { Router } from "@solidjs/router";
import './index.css';
import Layout from './layout';

render(
  () => (
    <Router>
      <Layout />
    </Router>
  ),
  document.getElementById("root") as HTMLElement
); 