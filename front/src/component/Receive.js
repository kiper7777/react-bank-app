import React, { useState } from 'react';
import BackButton from './BackButton';
import "./Receive.css";


const Receive = () => {

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
    <div className='page__receive'>
      <div className='header'>
        <BackButton onClick={handleBackButtonClick}/>
        <h1 className='header__title'>Receive</h1>
      </div>

      <form className='form__receive' onSubmit={handleSubmit}>
                
        <div className='field'>
          <label className='field__label' type="text" name="amount">Receive amount</label>
          <input className='field__input' 
            type="number" 
            placeholder='$500'
            value={email} 
            onChange={handleEmailChange} 
          />
        </div>

        <hr className='divider'/>



        <div className='field'>
          <label className='field__label'>Payment system</label>
          <input className='field__input' 
            type="icon" 
            placeholder='********'
            value={password} 
            onChange={handlePasswordChange} 
          />

          <input className='field__input' 
            type="icon" 
            placeholder='********'
            value={password} 
            onChange={handlePasswordChange} 
          />
        </div>

        {/* <button className='form__button-white' type="submit">Save Email</button> */}
        {/* <button className='form__button-white' type="submit">Save Password</button> */}
        {/* <button className='form__button-red' type="submit">Log out</button> */}
        
      </form>
    </div>
  );
};

export default Receive;
