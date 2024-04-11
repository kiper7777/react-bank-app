import React from "react";
// import './App.css';

import StartPage from "./component/StartPage";
import SignUpForm from "./component/SignUpForm";

function App() {
  return (
    <div>
      <div className="App">
        <StartPage />
      </div>

      <div className="container">
        <SignUpForm />
      </div>
    </div>
  );
}

export default App;
