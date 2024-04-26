import React, { createContext, useReducer, useContext } from 'react';

// Define initial state
const initialState = {
  token: null,
  user: null,
};

// Define action types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// Define reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};

// Create context
export const AuthContext = createContext();

// Create AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Action creators
export const login = (token, user) => ({
  type: LOGIN,
  payload: { token, user },
});

export const logout = () => ({
  type: LOGOUT,
});

// export default AuthProvider;

