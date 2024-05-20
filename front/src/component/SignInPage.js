import React, { useState } from 'react';
import BackButton from './BackButton';
import "./SigninPage.css";
import BalancePage from './BalancePage'; // Import the BalancePage component

const SigninPage = () => {

  const handleBackButtonClick = () => {
    // Handle back button click logic here
    window.history.back(); // This will navigate back to the previous page in the browser history
    console.log('Back button clicked!');
  };
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signinComplete, setSigninComplete] = useState(false); // Track sign-in completion

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      // Send signin request to server
      const response = await fetch("http://localhost:4000/signin", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      if (!response.ok) {
        throw new Error('Failed to sign in');
      }

      const data = await response.json();

      if (data.success) {
        setSigninComplete(true);
      } else {
        console.error('Signin failed:', data.error);
      }
    } catch (error) {
      console.error('Error during signin:', error.message);
    }

    console.log('Email:', email);
    console.log('Password:', password);
    // Clear form fields
    setEmail('');
    setPassword('');
  };

  // Render BalancePage if signin is complete
  // if (signinComplete) {
  //   return <BalancePage />;
  // }

  return (
   
    <div className='page'>
      <header>
        <BackButton onClick={handleBackButtonClick}/>
      </header>

      <form onSubmit={handleSignin} className='form'>
        <h1 className='form__title'>Sign in</h1>
        <p className='form__subtitle'>Select login method</p>

        <div className='field'>
          <label className='field__label' htmlFor='email'>Email</label>
          <input className='field__input' 
            type="email" 
            id='email'
            placeholder='example@gmail.com'
            value={email} 
            onChange={handleEmailChange} 
          />
        </div>
        <div className='field'>
          <label className='field__label' htmlFor='password'>Password</label>
          <input className='field__input' 
            type="password" 
            id='password'
            placeholder='********'
            value={password} 
            onChange={handlePasswordChange}
          />
        </div>

        <span className='link__prefix'>Forgot your password? <a className='link' href='/recovery'>Restore</a></span>
        
        <button type='submit' className='form__button'>Continue</button>
        
      </form>
    </div>
 
  );
};

export default SigninPage;
