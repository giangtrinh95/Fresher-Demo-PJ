/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  useLocation,
} from 'react-router-dom';
import LoginPage from 'containers/LoginPage/Loadable';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { makeSelectRole } from './selectors';
import PrivateRoute from './privateRoute';
import GlobalStyle from '../../global-styles';
import Layouts from '../Layouts';
import useFilterMap from '../../components/hooks/useFilterMap';

function App({ role }) {
  const location = useLocation();
  const dataRoute = useFilterMap(role);
  const renderRoute = () => {
    let result = null;
    //filter
    result = dataRoute.map((route, index) => {
      return (
        <Route key={route.name} path={route.path} exact={route.exact}>
          <route.component />
        </Route>
      );
    });
    return result;
  };
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute path="/">
          <Layouts>
            <Switch>{renderRoute()}</Switch>
          </Layouts>
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

App.propTypes = {
  role: PropTypes.string,
};
const mapStateToProps = createStructuredSelector({
  role: makeSelectRole(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);
export default compose(withConnect)(App);
