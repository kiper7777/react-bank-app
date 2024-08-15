import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom'; // Добавлен импорт Navigate
import BackButton from './BackButton';
import './SigninPage.css';

const SigninPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signinComplete, setSigninComplete] = useState(false); // Track sign-in completion
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignin = async () => {
    try {
      const response = await fetch('http://localhost:4000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setSigninComplete(true);
      } else {
        console.error('Signin failed:', data.error);
      }
    } catch (error) {
      console.error('Error during signin:', error.message);
    }
  };

  const handleForgotPassword = () => {
    navigate('/recovery');
  };

  if (signinComplete) {
    return <Navigate to="/balance" />;
  }

  return (
    <div className="page">
      <header>
        <BackButton onClick={() => navigate(-1)} />
      </header>
      <form className="form">
        <h1 className="form__title">Sign in</h1>
        <p className="form__subtitle">Select login method</p>
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
        <span className="link__prefix">
          Forgot your password? <span className="link" onClick={handleForgotPassword}>Restore</span>
        </span>
        <button type="button" onClick={handleSignin} className="form__button">Continue</button>
      </form>
    </div>
  );
};

export default SigninPage;



