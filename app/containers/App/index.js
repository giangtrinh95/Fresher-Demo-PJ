import LoginPage from 'containers/LoginPage/Loadable';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
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
import PrivateRoute from './PrivateRoute';
import { makeSelectRole } from './selectors';
import Layouts from '../Layouts/Loadable';
import { getCurrentUser, loginSuccess } from './actions';
import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';

function App({ role, getUserRoles, autoLogin }) {
  useInjectSaga({ key: 'global', saga });
  const dataRoute = useFilterMap(role);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      autoLogin(token);
      getUserRoles();
    }
  }, []);
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

const mapDispatchToProps = dispatch => {
  return {
    getUserRoles: () => dispatch(getCurrentUser()),
    autoLogin: data => dispatch(loginSuccess(data)),
  };
};
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(App);
