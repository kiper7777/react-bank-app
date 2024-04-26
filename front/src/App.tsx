import React from "react";
import {
  BrowserRouter as Router,
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import AuthRoute from "../../back/src/component/AuthRoute";
import { AuthProvider } from "./AuthContext"; // Assuming you have created AuthProvider in AuthContext.js

import WellcomePage from "./component/WellcomePage";
import SignupPage from "./component/SignupPage";
import SignInPage from "./component/SigninPage";
import Recovery from "./component/RecoveryPage";
import SignupConfirmPage from "./component/SignupConfirmPage";
import RecoveryConfirm from "./component/RecoveryConfirm";
import Send from "./component/Send";
import Settings from "./component/Settings";
import Receive from "./component/Receive";
import Notifications from "./component/Notifications";
import Transaction from "./component/Transaction";
import Balance from "./component/Balance";

function App() {
  const authContextData = {
    // Your authentication state and methods here
    token: "yourAuthToken",
    user: {
      username: "exampleUser",
      email: "example@example.com",
    },
    login: () => {
      // Your login logic here
    },
    logout: () => {
      // Your logout logic here
    },
  };
  return (
    <AuthContext.Provider value={authContextData}>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <AuthRoute>
                <div className="App">
                  <WellcomePage />
                </div>
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <div className="form">
                  <SignupPage />
                </div>
              </AuthRoute>
            }
          />
          <Route
            path="/signup-confirm"
            element={
              <PrivateRoute>
                <div className="form">
                  <SignupConfirmPage />
                </div>
              </PrivateRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <AuthRoute>
                <div className="form">
                  <SigninPage />
                </div>
              </AuthRoute>
            }
          />
          <Route
            path="/recovery"
            element={
              <AuthRoute>
                <div className="form">
                  <RecoveryPage />
                </div>
              </AuthRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>

    // <div>
    //   <div className="App">
    //     <WellcomePage />
    //   </div>

    //   <div className="form">
    //     <SignupPage />
    //   </div>

    //   <div className="form">
    //     <SignupConfirmPage />
    //   </div>

    //   <div className="form">
    //     <SigninPage />
    //   </div>

    //   <div className="form">
    //     <RecoveryPage />
    //   </div>

    //   <div className="form">
    //     <RecoveryConfirm />
    //   </div>

    //   <div className="form__send">
    //     <Send />
    //   </div>

    //   <div className="form__settings">
    //     <Settings />
    //   </div>

    //   <div className="form__receive">
    //     <Receive />
    //   </div>

    //   <div className="form__notifications">
    //     <Notifications />
    //   </div>

    //   <div className="form__transaction">
    //     <Transaction />
    //   </div>

    //   <div className="form__balance">
    //     <Balance />
    //   </div>
    // </div>
  );
}

export default App;
