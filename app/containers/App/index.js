import LoginPage from 'containers/LoginPage/Loadable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import useFilterMap from '../../components/hooks/useFilterMap';
import PrivateRoute from './privateRoute';
import { makeSelectRole } from './selectors';

function App({ role }) {
  const location = useLocation();
  const dataRoute = useFilterMap(role);
  const renderRoute = () => {
    let result = null;
    //filter
    result = dataRoute.map((route, index) => {
      return (
        <PrivateRoute
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
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
        <Layouts>{renderRoute()}</Layouts>
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
