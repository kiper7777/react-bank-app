import React, { useState } from 'react';
import BackButton from './BackButton';
import "./RecoveryConfirmPage.css";
import "./RecoveryPage.css";


const RecoveryConfirmPage = () => {

  const handleBackButtonClick = () => {
    // Handle back button click logic here
    window.history.back(); // Navigate back to the previous page
    console.log('Back button clicked!');
  };
  
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleRestorePassword = async () => {
    // e.preventDefault();
    
    try {
      // Assuming you have an API endpoint for password recovery confirmation
      const response = await fetch('http://localhost:4000/recovery-confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error || 'Failed to restore password');
      }
    } catch (error) {
      console.error('Error restoring password:', error);
      setMessage('Failed to restore password');
    }

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

      <form className='form'>
        <h1 className='form__title'>Recover password</h1>
        <p className='form__subtitle'>Enter the code you received and your new password</p>

        <div className='field'>
          <label className='field__label' htmlFor="code">Code</label>
          <input className='field__input' 
            type="text" 
            id="code"
            placeholder='Enter the code'
            value={code} 
            onChange={handleCodeChange} 
            required
          />
        </div>

        <div className='field'>
          <label className='field__label' htmlFor="newPassword">New password</label>
          <input className='field__input' 
            type="password" 
            id="newPassword"
            placeholder='Enter your new password'
            value={newPassword} 
            onChange={handleNewPasswordChange}
            required
          />
        </div>

        <button type="button" onClick={handleRestorePassword} className='form__button'>Restore password</button>
        {message && <p className="message">{message}</p>}
        
      </form>
      
    </div>
  );
};

export default RecoveryConfirmPage;
