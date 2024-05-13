import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRoute from "./component/AuthRoute";
import PrivateRoute from "./component/PrivateRoute";
import { AuthContext } from "./component/AuthContext";
import WelcomePage from "./component/WelcomePage";
import SignupPage from "./component/SignupPage";
import SignupConfirmPage from "./component/SignupConfirmPage";
import SigninPage from "./component/SigninPage";
import RecoveryPage from "./component/RecoveryPage";
import RecoveryConfirmPage from "./component/RecoveryConfirmPage";
// import BalancePage from "./component/BalancePage";
// import NotificationsPage from "./component/NotificationsPage";
// import SettingsPage from "./component/SettingsPage";
// import ReceivePage from "./component/ReceivePage";
// import SendPage from "./component/SendPage";
// import TransactionPage from "./component/TransactionPage";
// import UserList from "./component/UserList";
// import SignupPageClass from "./component/SignupPageClass";

function App() {
  const [signupComplete, setSignupComplete] = useState(false);

  const AuthContextData = {
    state: {
      token: null,
      user: null,
    },
    login: (token: any, user: any) => {
      // Set the token and user in the authentication state
      AuthContextData.state.token = token;
      AuthContextData.state.user = user;

      // You can also store the token and user in local storage or cookies for persistence

      console.log("Logged in");
    },
    logout: () => {
      // Clear the token and user from the authentication state
      AuthContextData.state.token = null;
      AuthContextData.state.user = null;

      // You should also clear the token and user from local storage or cookies

      console.log("Logged out");
    },
  };

  return (
    <AuthContext.Provider value={AuthContextData}>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <AuthRoute>
                <WelcomePage />
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                {!signupComplete ? (
                  <SignupPage setSignupComplete={setSignupComplete} />
                ) : (
                  <SignupConfirmPage />
                )}
                {/* <SignupPage /> */}
              </AuthRoute>
            }
          />
          <Route
            path="/signup-confirm"
            element={
              <PrivateRoute>
                <SignupConfirmPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <AuthRoute>
                <SigninPage />
              </AuthRoute>
            }
          />
          <Route
            path="/recovery"
            element={
              <AuthRoute>
                <RecoveryPage />
              </AuthRoute>
            }
          />
          <Route
            path="/recovery-confirm"
            element={
              <AuthRoute>
                <RecoveryConfirmPage />
              </AuthRoute>
            }
          />
          {/* <Route
            path="/balance"
            element={
              <PrivateRoute>
                <BalancePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <PrivateRoute>
                <NotificationsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/receive"
            element={
              <PrivateRoute>
                <ReceivePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/send"
            element={
              <PrivateRoute>
                <SendPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/transaction/:transactionId"
            element={
              <PrivateRoute>
                <TransactionPage />
              </PrivateRoute>
            }
          /> */}
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>

    // <div>
    //   <div className="App">
    //     <WelcomePage />
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
    //     <RecoveryConfirmPage />
    //   </div>

    //   <div className="form__balance">
    //     <BalancePage />
    //   </div>

    //   <div className="form__notifications">
    //     <NotificationsPage />
    //   </div>

    //   <div className="form__settings">
    //     <SettingsPage />
    //   </div>

    //   <div className="form__receive">
    //     <ReceivePage />
    //   </div>

    //   <div className="form__send">
    //     <SendPage />
    //   </div>

    //   <div className="form__transaction">
    //     <TransactionPage />
    //   </div>
    //   <div className="user-list-container">
    //     <UserList />
    //   </div>
    // </div>
  );
}

export default App;
