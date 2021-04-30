import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import HomeComponent from '../containers/home';

const mainRoute = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={HomeComponent} />
      <Redirect from="*" to="/" />
    </Switch>
  </Router>
);
export default mainRoute;
