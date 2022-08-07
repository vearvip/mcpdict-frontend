/* @refresh reload */
import { render } from 'solid-js/web';

import { hashIntegration, Router } from "@solidjs/router";
import './index.css';
import Layout from './layout';

render(
  () => (
    <Router source={hashIntegration()}>
      <Layout />
    </Router>
  ),
  document.getElementById("root") as HTMLElement
); 