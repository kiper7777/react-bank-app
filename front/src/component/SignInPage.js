import React, { useState } from 'react';
import BackButton from './BackButton';
import "./SigninPage.css";


const SigninPage = () => {

  const handleBackButtonClick = () => {
    // Handle back button click logic here
    window.history.back(); // This will navigate back to the previous page in the browser history
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle signin logic here (e.g., send data to backend)
    try {
      const response = await fetch("http://localhost:4000/signin", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      if (response.ok) {
        // Signin successful
        console.log('Signin successful');
      } else {
        // Registration failed
        console.error('Signin failed');
      }
    } catch (error) {
      console.error('Error signin:', error);
    }

    console.log('Email:', email);
    console.log('Password:', password);
    // Clear form fields
    setEmail('');
    setPassword('');
  };

  return (
    <div className='page'>
      <header>
        <BackButton onClick={handleBackButtonClick}/>
      </header>

      <form className='form' onSubmit={handleSubmit}>
        <h1 className='form__title'>Sign in</h1>
        <p className='form__subtitle'>Select login method</p>

        <div className='field'>
          <label className='field__label' name="email">Email</label>
          <input className='field__input' 
            type="email" 
            placeholder='example@gmail.com'
            value={email} 
            onChange={handleEmailChange} 
          />
        </div>
        <div className='field'>
          <label className='field__label'>Password</label>
          <input className='field__input' 
            type="password" 
            placeholder='********'
            value={password} 
            onChange={handlePasswordChange}
          />
        </div>

        <span className='link__prefix'>Forgot your password? <a className='link' href='/restore'>Restore</a></span>
        
        <button className='form__button' type="submit">Continue</button>
        
      </form>
    </div>
  );
};

export default SigninPage;
