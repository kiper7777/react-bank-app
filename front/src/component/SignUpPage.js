import React, { useState } from 'react';
import BackButton from './BackButton';
import "./SignupPage.css";
// import SigninPage from './SigninPage';
// import { Form, REG_EXP_EMAIL, REG_EXP_PASSWORD } from './script/form';
// import { saveSession } from './script/session';

const SignupPage = () => {
  // class SignupPageClass {
  //   static value = {}

  //   static validate = (name, value) => {
  //     return true
  //   }

  //   static submit = () => {
  //     console.log(this.value)
  //   }
  // }

  const handleBackButtonClick = () => {
    // Handle back button click logic here
    window.history.back(); 
    console.log('Back button clicked!');
  };
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    // Handle signup logic here (e.g., send data to backend)
    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      if (response.ok) {
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
      setLoading(false);
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

      <form className='form' onSubmit={handleSubmit}>
        <h1 className='form__title'>Sign up</h1>
        <p className='form__subtitle'>Choose a registration method</p>

        <div className='field'>
          <label className='field__label' name="email">Email</label>
          <input className='field__input' 
            type="email" 
            id='email'
            placeholder='example@gmail.com'
            value={email} 
            onChange={handleEmailChange}
            required
          />
          <span name="email" className='form__error'>Помилка</span>
        </div>
        <div className='field'>
          <label className='field__label'>Password</label>
          <input className='field__input' 
            type="password" 
            id='password'
            placeholder='Pass2000ID'
            value={password} 
            onChange={handlePasswordChange}
            required
          />
        </div>

        <span className='link__prefix'>Already have an account? <a href='/signin' className='link'>Sign In</a></span>
        
        <button className='form__button' type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Continue'}
        </button>
        {error && <p className="form__error">{error}</p>}
      </form>
    </div>
  );
};

export default SignupPage;
