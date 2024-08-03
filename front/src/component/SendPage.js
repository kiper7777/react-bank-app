import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import "./SendPage.css";

const SendPage = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [sum, setSum] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSumChange = (e) => {
    setSum(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Recipient Email:', email);
    console.log('Sum to be sent:', sum);
    setEmail('');
    setSum('');
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <div className='page__send'>
      <header className='header'>
        <BackButton onClick={handleBackButtonClick}/>
        <h1 className='form__send-title'>Send</h1>
      </header>

      <form className='form__send' onSubmit={handleSubmit}>
        <div className='field__send'>
          <label className='field__send-label' type="email" name="email">Email</label>
          <input className='field__input' 
            type="email" 
            id="email"
            placeholder='example@gmail.com'
            value={email} 
            onChange={handleEmailChange} 
            required
          />
        </div>

        <div className='field__send'>
          <label className='field__send-label'>Sum</label>
          <input className='field__input' 
            type="number" 
            id="sum"
            placeholder='$500'
            value={sum} 
            onChange={handleSumChange}
            required
          />
        </div>

        <button className='form__send-button' type="submit">Send</button>
      </form>
    </div>
  );
};

export default SendPage;
