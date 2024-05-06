import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from './AuthContext';

const AuthRoute = ({ component: Component, ...rest }) => {
  const { state } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => state.token ? (<Redirect to="/" />) : (<Component {...props} />
        )
      }
    />
  );
};

export default AuthRoute;
