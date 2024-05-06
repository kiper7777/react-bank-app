import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from './AuthContext';

const AuthRoute = ({ children }) => {
  const { state } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if authentication state is fetched
    setLoading(false);
  }, []);

  if (loading) {
    // Render loading indicator or skeleton UI
    return <div>Loading...</div>;
  }

  return state.token && state.user.isConfirm ? (
    <Navigate to={`/balance/${state.user.id}`} />
  ) : (
    children
  );
};

export default AuthRoute;

// import React from 'react';
// import { Navigate } from 'react-router-dom';

// import { useAuth } from './AuthContext';

// const AuthRoute = ({ children }) => {
//   const { state } = useAuth();

//   return state.token && state.user.isConfirm ? <Navigate to={`/balance/${state.user.id}`}/> : children;
// };

// export default AuthRoute;


