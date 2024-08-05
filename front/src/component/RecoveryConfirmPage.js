import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import "./RecoveryConfirmPage.css";

const RecoveryConfirmPage = () => {
  const navigate = useNavigate(); // Инициализация useNavigate

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
    try {
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
        // Перенаправление на страницу входа после успешного восстановления пароля
        navigate('/signin');
      } else {
        setMessage(data.error || 'Failed to restore password');
      }
    } catch (error) {
      console.error('Error restoring password:', error);
      setMessage('Failed to restore password');
    }

    setCode(''); // Очистка поля после отправки
    setNewPassword(''); // Очистка поля после отправки
  };

  return (
    <div className='page'>
      <header>
        <BackButton onClick={() => navigate(-1)} />
      </header>

      <form className='form'>
        <h1 className='form__title'>Recover password</h1>
        <p className='form__subtitle'>Enter the code you received and your new password</p>

        <div className='field'>
          <label className='field__label' htmlFor="code">Code</label>
          <input
            className='field__input'
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
          <input
            className='field__input'
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
