import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import BackButton from './BackButton';
import './RecoveryPage.css';

const RecoveryPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [recoveryComplete, setRecoveryComplete] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleCodeChange = (e) => setConfirmationCode(e.target.value);
  const handlePasswordChange = (e) => setNewPassword(e.target.value);

  const handleRecovery = async () => {
    try {
      const response = await fetch('http://localhost:4000/recovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        setIsCodeSent(true);
      } else {
        setMessage(data.message || 'Failed to recover password');
      }
    } catch (error) {
      console.error('Error recovering password:', error);
      setMessage('Failed to recover password');
    }
  };

  const handleRecoveryConfirm = async () => {
    try {
      const response = await fetch('http://localhost:4000/recovery-confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: confirmationCode, newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        setRecoveryComplete(true);
      } else {
        setMessage(data.message || 'Failed to confirm recovery');
      }
    } catch (error) {
      console.error('Error confirming recovery:', error);
      setMessage('Failed to confirm recovery');
    }
  };

  if (recoveryComplete) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className='page'>
      <header>
        <BackButton onClick={() => window.history.back()} />
      </header>

      <form className='form'>
        <h1 className='form__title'>Recover password</h1>
        {!isCodeSent ? (
          <>
            <p className='form__subtitle'>Enter your email to receive a recovery code</p>
            <div className='field'>
              <label className='field__label'>Email</label>
              <input
                className='field__input'
                type='email'
                id='email'
                placeholder='example@gmail.com'
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <button type='button' onClick={handleRecovery} className='form__button'>
              Send code
            </button>
          </>
        ) : (
          <>
            <p className='form__subtitle'>Enter the code sent to your email and your new password</p>
            <div className='field'>
              <label className='field__label'>Confirmation Code</label>
              <input
                className='field__input'
                type='text'
                id='code'
                placeholder='Enter code'
                value={confirmationCode}
                onChange={handleCodeChange}
                required
              />
            </div>
            <div className='field'>
              <label className='field__label'>New Password</label>
              <input
                className='field__input'
                type='password'
                id='newPassword'
                placeholder='Enter new password'
                value={newPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button type='button' onClick={handleRecoveryConfirm} className='form__button'>
              Confirm
            </button>
          </>
        )}
        {message && <p className='message'>{message}</p>}
      </form>
    </div>
  );
};

export default RecoveryPage;


