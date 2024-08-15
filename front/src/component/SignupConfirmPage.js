import React, { useState } from "react";
import BackButton from "./BackButton";
import { Navigate } from 'react-router-dom';
import "./SignupConfirmPage.css";

const SignupConfirmPage = () => {
  const [code, setCode] = useState('');
  const [confirmComplete, setConfirmComplete] = useState(false);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleConfirm = async () => {
    const response = await fetch('http://localhost:4000/signup-confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();
    if (data.success) {
      setConfirmComplete(true);
    } else {
      console.error('Confirmation failed:', data.error);
    }
  };

  if (confirmComplete) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className="page">
      <header>
        <BackButton onClick={() => window.history.back()} />
      </header>
      <form className="form">
        <h1 className="form__title">Confirm account</h1>
        <p className="form__subtitle">Write the code you received</p>
        <div className="field">
          <label className="field__label" htmlFor="code">Code</label>
          <input
            className="field__input"
            type="text"
            id="code"
            placeholder="Enter Confirmation Code"
            value={code}
            onChange={handleCodeChange}
            required
          />
        </div>
        <button type="button" onClick={handleConfirm} className="form__button">Confirm</button>
      </form>
    </div>
  );
};

export default SignupConfirmPage;


