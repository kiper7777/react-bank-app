import React, { useState } from 'react';
import BackButton from './BackButton';
import "./RecoveryConfirmPage.css";


const RecoveryConfirmPage = () => {

  const handleBackButtonClick = () => {
    // Handle back button click logic here
    console.log('Back button clicked!');
  };
  
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password recovery logic here (e.g., send data to backend)
    console.log('Confirmation code:', code);
    console.log('New password:', newPassword);
    // Clear fields after submission
    setCode('');
    setNewPassword('');
  };

  return (
    <div className='page'>
      <header>
        <BackButton onClick={handleBackButtonClick}/>
      </header>

      <form className='form' onSubmit={handleSubmit}>
        <h1 className='form__title'>Recover password</h1>
        <p className='form__subtitle'>Write the code you received</p>

        <div className='field'>
          <label className='field__label' type="code" name="code">Code</label>
          <input className='field__input' 
            type="text" 
            id="code"
            placeholder='123456'
            value={code} 
            onChange={handleCodeChange} 
            required
          />
        </div>

        <div className='field'>
          <label className='field__label'>New password</label>
          <input className='field__input' 
            type="password" 
            id="newPassword"
            placeholder='********'
            value={newPassword} 
            onChange={handleNewPasswordChange}
            required
          />
        </div>

        <button className='form__button' type="submit">Restore password</button>
        
      </form>
    </div>
  );
};

export default RecoveryConfirmPage;
