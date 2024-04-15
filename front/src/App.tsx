import React from "react";
// import './App.css';

import StartPage from "./component/StartPage";
import SignUpForm from "./component/SignUpForm";
import SignInForm from "./component/SignInForm";

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
    </div>
  );
}

export default App;
