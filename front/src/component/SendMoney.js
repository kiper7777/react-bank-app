import React, { useState } from 'react';
import BackButton from './BackButton';
import "./SendMoney.css";


const SendMoney = () => {

  const handleBackButtonClick = () => {
    // Handle back button click logic here
    console.log('Back button clicked!');
  };
  
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
    // Handle send money logic here
    console.log('Recipient Email:', email);
    console.log('Sum to be sent:', sum);
    // Clear fields after submission
    setEmail('');
    setSum('');
  };

  return (
    <div className='page'>
      <header>
        <BackButton onClick={handleBackButtonClick}/>
      </header>

      <form className='form' onSubmit={handleSubmit}>
        <h1 className='form__title'>Send</h1>
        
        <div className='field'>
          <label className='field__label' type="email" name="email" placeholder='example@gmail.com'>Email</label>
          <input className='field__input' 
            type="email" 
            id="email"
            value={email} 
            onChange={handleEmailChange} 
            required
          />
        </div>

        <div className='field'>
          <label className='field__label'>Sum</label>
          <input className='field__input' 
            type="number" 
            id="sum"
            value={sum} 
            onChange={handleSumChange}
            required
          />
        </div>

        <button className='form__button' type="submit">Send</button>
        
      </form>
    </div>
  );
};

export default SendMoney;
