import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectIsLoggin } from '../App/selectors';
const PrivateRoute = ({ component: Component, isLoggin, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return isLoggin ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  isLoggin: makeSelectIsLoggin(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);
export default compose(
  withConnect,
  memo,
)(PrivateRoute);
