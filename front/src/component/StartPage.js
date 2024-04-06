// src/components/StartPage.js

import React from 'react';
import './StartPage.css'; // Import CSS file
import welcome from "./bank-image.svg"

const StartPage = () => {
  return (
    <div className="start-page">
      <div>
        <h1>Hello!</h1>
        <p>Welcome to the Bank App</p>
      </div>
      <img src={welcome} alt="Bank Image" />
      <div className="buttons">
        <button>Sign Up</button>
        <button>Sign In</button>
      </div>
    </div>
  );
};

export default StartPage;

