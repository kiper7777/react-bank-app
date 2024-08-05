import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import "./RecoveryPage.css";

const RecoveryPage = () => {
  const navigate = useNavigate(); // Инициализация useNavigate

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRecovery = async () => {
    try {
      const response = await fetch('http://localhost:4000/recovery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        // Перенаправление на страницу подтверждения восстановления пароля
        navigate('/recovery-confirm');
      } else {
        setMessage(data.message || 'Failed to recover password');
      }
    } catch (error) {
      console.error('Error recovering password:', error);
      setMessage('Failed to recover password');
    }

    setEmail(''); // Очистка поля после отправки
  };

  return (
    <div className='page'>
      <header>
        <BackButton onClick={() => navigate(-1)} />
      </header>

      <form className='form'>
        <h1 className='form__title'>Recover password</h1>
        <p className='form__subtitle'>Enter your email to receive a recovery code</p>

        <div className='field'>
          <label className='field__label'>Email</label>
          <input
            className='field__input'
            type="email"
            id="email"
            placeholder='example@gmail.com'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>

        <button type="button" onClick={handleRecovery} className='form__button'>Send code</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default RecoveryPage;
