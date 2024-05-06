import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { state } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching authentication state
    setLoading(false);
  }, []);

  if (loading) {
    // Render loading indicator or skeleton UI
    return <div>Loading...</div>;
  }

  return state.token && state.user ? (
    children
  ) : (
    // Redirect to login page if not authenticated
    <Navigate to="/signin" />
  );
};

export default PrivateRoute;

// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from './AuthContext'; // Assuming you have created AuthContext.js

// const PrivateRoute = ({ children }) => {
//   return (
//     <AuthContext.Consumer>
//       {({ state }) => (
//         <Route
//           {...rest}
//           render={(props) =>
//             state.token ? (
//               <Component {...props} />
//             ) : (
//               <Navigate to="/" />
//             )
//           }
//         />
//       )}
//     </AuthContext.Consumer>
//   );
// };

// export default PrivateRoute;



