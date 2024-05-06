import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Assuming you have created AuthContext.js

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <AuthContext.Consumer>
      {({ state }) => (
        <Route
          {...rest}
          render={(props) =>
            state.token ? (
              <Component {...props} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
      )}
    </AuthContext.Consumer>
  );
};

export default PrivateRoute;
