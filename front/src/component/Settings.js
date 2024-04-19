import React, { useState } from 'react';
import BackButton from './BackButton';
import "./Settings.css";


const Settings = () => {

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
        <h1 className='form__title'>Settings</h1>
        
        <div className='field'>
          <h6 className='field__title'>Change email</h6>  
          <label className='field__label' type="email" name="email">Email:</label>
          <input className='field__input' type="email" value={email} placeholder='example@gmail.com' onChange={handleEmailChange} />
        </div>
        <div className='field'>
          <label className='field__label'>Old Password:</label>
          <input className='field__input' type="password" value={password} placeholder='********' onChange={handlePasswordChange} />
        </div>

        <button className='form__button' type="submit">Save Email</button>
        
      </form>
    </div>
  );
};

export default Settings;
