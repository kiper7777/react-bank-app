import React, { useState } from 'react';
import BackButton from './BackButton';
import "./RecoveryConfirmPage.css";


const RecoveryConfirmPage = () => {

  const handleBackButtonClick = () => {
    // Handle back button click logic here
    window.history.back(); // This will navigate back to the previous page in the browser history
    console.log('Back button clicked!');
  };
  
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle password recovery logic here (e.g., send data to backend)

    try {
      // Assuming you have an API endpoint for password recovery confirmation
      const response = await fetch('http://localhost:4000/recovery-confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error || 'Failed to confirm recovery');
      }
    } catch (error) {
      console.error('Error confirming recovery:', error);
      setMessage('Failed to confirm recovery');
    }

    console.log('Confirmation code:', code);
    console.log('New password:', password);
    // Clear fields after submission
    setCode('');
    setPassword('');
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
            id="password"
            placeholder='********'
            value={password} 
            onChange={handlePasswordChange}
            required
          />
        </div>

        <button className='form__button' type="submit">Restore password</button>
        {message && <p className="message">{message}</p>}
        
      </form>
      
    </div>
  );
};

export default RecoveryConfirmPage;
