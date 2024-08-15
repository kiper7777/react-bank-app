import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import BackButton from './BackButton';
import './SignupPage.css';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupComplete, setSignupComplete] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setConfirmationCode(data.confirmationCode);
        setSignupComplete(true);
      } else {
        console.error('Signup failed:', data.error);
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };

  if (signupComplete) {
    return <Navigate to="/signup-confirm" state={{ email, confirmationCode }} />;
  }

  return (
    <div className="page">
      <header>
        <BackButton onClick={() => window.history.back()} />
      </header>
      <form className="form">
        <h1 className="form__title">Sign up</h1>
        <p className="form__subtitle">Create your account</p>
        <div className="field">
          <label className="field__label">Email</label>
          <input
            className="field__input"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="field">
          <label className="field__label">Password</label>
          <input
            className="field__input"
            type="password"
            placeholder="********"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="button" onClick={handleSignup} className="form__button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;


