import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Layout from './components/layout';
import { Home, Add } from './containers';
import '../dist/css/style.css';

filepicker.setKey('YOUR_API_KEY');

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
      <Route path="add" component={Add} />
    </Route>
  </Router>
);

ReactDOM.render(
  routes,
  document.getElementById('app')
);
