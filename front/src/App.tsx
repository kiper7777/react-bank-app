import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthRoute from "../../back/src/component/AuthRoute";

import WellcomePage from "./component/WellcomePage";
import SignUpPage from "./component/SignUpPage";
import SignInPage from "./component/SignInPage";
import Recovery from "./component/Recovery";
import SignUpConfirm from "./component/SignUpConfirm";
import RecoveryConfirm from "./component/RecoveryConfirm";
import Send from "./component/Send";
import Settings from "./component/Settings";
import Receive from "./component/Receive";
import Notifications from "./component/Notifications";
import Transaction from "./component/Transaction";
import Balance from "./component/Balance";

function App() {
  return (
    <div>
      <div className="App">
        <WellcomePage />
      </div>

      <div className="form">
        <SignUpPage />
      </div>

      <div className="form">
        <SignUpConfirm />
      </div>

      <div className="form">
        <SignInPage />
      </div>

      <div className="form">
        <Recovery />
      </div>

      <div className="form">
        <RecoveryConfirm />
      </div>

      <div className="form__send">
        <Send />
      </div>

      <div className="form__settings">
        <Settings />
      </div>

      <div className="form__receive">
        <Receive />
      </div>

      <div className="form__notifications">
        <Notifications />
      </div>

      <div className="form__transaction">
        <Transaction />
      </div>

      <div className="form__balance">
        <Balance />
      </div>
    </div>
  );
}

export default App;
