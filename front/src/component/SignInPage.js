import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import "./SigninPage.css";
// import BalancePage from './BalancePage'; // Import the BalancePage component

const SigninPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    // Handle back button click logic here
    window.history.back(); // This will navigate back to the previous page in the browser history
    console.log('Back button clicked!');
  };
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
        navigate('/balance'); // Navigate to a protected page after signin
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Error during sign in');
    }
    setIsLoading(false);

    // console.log('Email:', email);
    // console.log('Password:', password);
    // // Clear form fields
    // setEmail('');
    // setPassword('');
  };

  // // Render BalancePage if signin is complete
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
        <p className='form__subtitle'>Enter your credentials to access your account</p>

        <div className='field'>
          <label className='field__label' htmlFor='email'>Email</label>
          <input className='field__input' 
            name="email"
            type="email" 
            id='email'
            placeholder='example@gmail.com'
            value={email} 
            onChange={handleEmailChange} 
            required
          />
        </div>
        <div className='field'>
          <label className='field__label' htmlFor='password'>Password</label>
          <input className='field__input' 
            name="password"
            type="password" 
            id='password'
            placeholder='Enter your password'
            value={password} 
            onChange={handlePasswordChange}
            required
          />
        </div>

        {error && <div style={{ color: 'red' }}>{error}</div>}

        <span className='link__prefix'>Forgot your password? <a className='link' href='/recovery'>Restore</a></span>
        
        <button type='submit' className='form__button'>
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
        
      </form>
    </div>
 
  );
};

export default SigninPage;
