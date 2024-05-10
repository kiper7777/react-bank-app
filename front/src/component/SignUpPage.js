import React, { useState } from 'react';
import BackButton from './BackButton';
import "./SignupPage.css";
// import SigninPage from './SigninPage';
// import { Form, REG_EXP_EMAIL, REG_EXP_PASSWORD } from './script/form';
// import { saveSession } from './script/session';

const SignupPage = () => {

  const handleBackButtonClick = () => {
    // Handle back button click logic here
    window.history.back(); 
    console.log('Back button clicked!');
  };
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('email не может быть пустым');
  const [passwordError, setPasswordError] = useState('пароль не может быть пустым');

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
    }
  }
  
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    // setError(null);
    setIsLoading(true);
    // Handle signup logic here (e.g., send data to backend)
    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      const data = await response.json();
      if (data.success) {
        
      } else {
        // Handle signup error
      }

      if (response.ok) {
        // Redirect to confirmation page
        window.location.href = '/signup-confirm';
        // Registration successful
        console.log('Registration successful');
      } else {
        const data = await response.json();
        throw new Error(data.message);
        // Registration failed
        // console.error('Registration failed');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error registering:', error);
    } finally {
      setIsLoading(false);
    }

    console.log('Email:', email);
    console.log('Password:', password);
    // Clear form fields
    setEmail('');
    setPassword('');
  };

  return (
    <div className='page'>
      <header>
        <BackButton onClick={handleBackButtonClick}/>
      </header>

      <form className='form'>
        <h1 className='form__title'>Sign up</h1>
        <p className='form__subtitle'>Choose a registration method</p>

        <div className='field'>
          <label className='field__label'>Email</label>
          <input className='field__input' 
            name="email"
            type="email" 
            id='email'
            placeholder='example@gmail.com'
            value={email} 
            onBlur={e => blurHandler(e)}
            onChange={handleEmailChange}
            required
          />
          {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div>}

          <span name="email" className='form__error'>Помилка</span>
        </div>
        <div className='field'>
          <label className='field__label'>Password</label>
          <input className='field__input' 
            name="password"
            type="password" 
            id='password'
            placeholder='Pass2000ID'
            value={password} 
            onBlur={e => blurHandler(e)}
            onChange={handlePasswordChange}
            required
          />
          {(passwordDirty && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}
        </div>

        <span className='link__prefix'>Already have an account? <a href='/signin' className='link'>Sign In</a></span>
        
        <button onClick={handleSignup} type="button" className='form__button' disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Continue'}
        </button>
        {error && <p className="form__error">{error}</p>}
      </form>
    </div>
  );
};

export default SignupPage;
