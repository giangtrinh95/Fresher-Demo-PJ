import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectIsLoggin } from './selectors';
import Layout from '../Layouts';
const PrivateRoute = ({ component: Component, isLoggin, ...rest }) => {
  console.log(isLoggin);
  return (
    <Route
      {...rest}
      render={props =>
        isLoggin ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to="/login" />
        )
      }
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
export default compose(withConnect, memo)(PrivateRoute);
