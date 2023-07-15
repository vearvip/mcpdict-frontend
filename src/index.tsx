/* @refresh reload */
import { render } from 'solid-js/web';

import { hashIntegration, Router } from "@solidjs/router";
import './index.css';
import Layout from './layout';
import 'nprogress/nprogress.css'

render(
  () => (
    // <Router source={hashIntegration()}>
    <Router >
      <Layout />
    </Router> 
  ),
  document.getElementById("root") as HTMLElement
); 