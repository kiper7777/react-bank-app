import React, { useState } from 'react';
import BackButton from './BackButton';
import "./SignUpForm.css"

const SignUpForm = () => {

  const handleBackButtonClick = () => {
    // Handle back button click logic here
    console.log('Back button clicked!');
  };
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here (e.g., send data to backend)
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

        <div className='form__item'>
          <label className='form__label' type="email" name="email" placeholder='example@gmail.com'>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className='form__item'>
          <label className='form__label'>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div className='form__button'>
          <button type="submit">Continue</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
