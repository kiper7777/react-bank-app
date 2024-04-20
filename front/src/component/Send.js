import React, { useState } from 'react';
import BackButton from './BackButton';
import "./Send.css";


const Send = () => {

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
    <div className='page__send'>
      <header>
        <BackButton onClick={handleBackButtonClick}/>
      </header>

      <form className='form__send' onSubmit={handleSubmit}>
        <h1 className='form__send-title'>Send</h1>
        
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

export default Send;
