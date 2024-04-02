import React from "react";
import Page from "./component/page";
import Welcome from "./component/welcome";


function App() {
  return (
    <Page>
      <div className="welcome">
      <div className="welcome-title">Hello!</div>;
      <p className="welcome-description">Welcome to bank app</p>
      <img src={welcome} className="welcome-image" alt="image"/>;
      <div className="welcome-button">
        <button>Sign Up</button>
        <button>Sign Up</button>
      </div>
    </div>
    </Page>

    // <Welcome>
    //   <div>{welcome}</div>
    // </Welcome>
  )
  
}

export default App;
