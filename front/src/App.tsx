import React from "react";
// import './App.css';

import StartPage from "./component/StartPage";
import SignUpForm from "./component/SignUpForm";
import SignInForm from "./component/SignInForm";
import Recovery from "./component/Recovery";
import SignUpConfirm from "./component/SignUpConfirm";
import RecoveryConfirm from "./component/RecoveryConfirm";

function App() {
  return (
    <div>
      <div className="App">
        <StartPage />
      </div>

      <div className="form">
        <SignUpForm />
      </div>

      <div className="form">
        <SignInForm />
      </div>

      <div className="form">
        <Recovery />
      </div>

      <div className="form">
        <SignUpConfirm />
      </div>

      <div className="form">
        <RecoveryConfirm />
      </div>
    </div>
  );
}

export default App;
