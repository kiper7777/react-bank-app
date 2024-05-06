import React from "react";
// import ReactDOM from "react-dom";
import { BrowserRouter as Routes, Route } from "react-router-dom";
// import AuthRoute from "./AuthRoute";
// import { AuthProvider } from "./AuthContext"; // Assuming you have created AuthProvider in AuthContext.js
// import PrivateRoute from "/component/PrivateRoute";

import WelcomePage from "./component/WelcomePage";
import SignupPage from "./component/SignupPage";
import SignupConfirmPage from "./component/SignupConfirmPage";
import SigninPage from "./component/SigninPage";
import RecoveryPage from "./component/RecoveryPage";
import RecoveryConfirmPage from "./component/RecoveryConfirmPage";
import { BrowserRouter } from "react-router-dom";
import AuthRoute from "./component/AuthRoute";
import PrivateRoute from "./component/PrivateRoute";
// import BalancePage from "./component/BalancePage";
// import NotificationsPage from "./component/NotificationsPage";
// import SettingsPage from "./component/SettingsPage";
// import ReceivePage from "./component/ReceivePage";
// import SendPage from "./component/SendPage";
// import TransactionPage from "./component/TransactionPage";
// import UserList from "./component/UserList";
// import SignupPageClass from "./component/SignupPageClass";

function App() {
  return (
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
              <SignupPage />
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

        {/* <Route path="/recovery-confirm" Component={RecoveryConfirmPage} /> */}
        <Route path="/signup-confirm" Component={SignupConfirmPage} />
        {/* <Route path="/balance" component={BalancePage} />
        <Route path="/notifications" component={NotificationsPage} />
        <Route path="/settings" component={SettingsPage} />
        <Route path="/receive" component={ReceivePage} />
        <Route path="/send" component={SendPage} />
        <Route path="/transaction" component={TransactionPage} /> */}
      </Routes>
    </BrowserRouter>

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

    // <AuthProvider value={authContextData}>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route
    //         index
    //         element={
    //           <AuthRoute>
    //             <div className="App">
    //               <WellcomePage />
    //             </div>
    //           </AuthRoute>
    //         }
    //       />
    //       <Route
    //         path="/signup"
    //         element={
    //           <AuthRoute>
    //             <div className="form">
    //               <SignupPage />
    //             </div>
    //           </AuthRoute>
    //         }
    //       />
    //       <Route
    //         path="/signup-confirm"
    //         element={
    //           <PrivateRoute>
    //             <div className="form">
    //               <SignupConfirmPage />
    //             </div>
    //           </PrivateRoute>
    //         }
    //       />
    //       <Route
    //         path="/signin"
    //         element={
    //           <AuthRoute>
    //             <div className="form">
    //               <SigninPage />
    //             </div>
    //           </AuthRoute>
    //         }
    //       />
    //       <Route
    //         path="/recovery"
    //         element={
    //           <AuthRoute>
    //             <div className="form">
    //               <RecoveryPage />
    //             </div>
    //           </AuthRoute>
    //         }
    //       />
    //       <Route
    //         path="/recovery-confirm"
    //         element={
    //           <AuthRoute>
    //             <div className="form">
    //               <RecoveryConfirmPage />
    //             </div>
    //           </AuthRoute>
    //         }
    //       />
    //       <Route
    //         path="/balance"
    //         element={
    //           <PrivateRoute>
    //             <div className="form__balance">
    //               <BalancePage />
    //             </div>
    //           </PrivateRoute>
    //         }
    //       />
    //       <Route
    //         path="/notifications"
    //         element={
    //           <PrivateRoute>
    //             <div className="form__notifications">
    //               <NotificationsPage />
    //             </div>
    //           </PrivateRoute>
    //         }
    //       />
    //       <Route
    //         path="/settings"
    //         element={
    //           <PrivateRoute>
    //             <div className="form__settings">
    //               <SettingsPage />
    //             </div>
    //           </PrivateRoute>
    //         }
    //       />
    //       <Route
    //         path="/receive"
    //         element={
    //           <PrivateRoute>
    //             <div className="form__receive">
    //               <ReceivePage />
    //             </div>
    //           </PrivateRoute>
    //         }
    //       />
    //       <Route
    //         path="/send"
    //         element={
    //           <PrivateRoute>
    //             <div className="form__send">
    //               <SendPage />
    //             </div>
    //           </PrivateRoute>
    //         }
    //       />
    //       <Route
    //         path="/transaction/:transactionId"
    //         element={
    //           <PrivateRoute>
    //             <div className="form__transaction">
    //               <TransactionPage />
    //             </div>
    //           </PrivateRoute>
    //         }
    //       />
    //       <Route path="*" Component={Error} />
    //     </Routes>
    //   </BrowserRouter>
    // </AuthProvider>
  );
}

export default App;
