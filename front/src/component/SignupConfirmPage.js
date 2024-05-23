import React, { useState, useContext } from "react";
import { SignupContext } from './SignupContext';
import BackButton from "./BackButton";
import "./SignupConfirmPage.css";

const SignupConfirmPage = (setEmailForConfirmation) => {
    const { emailForConfirmation } = useContext(SignupContext);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const handleBackButtonClick = () => {
        window.history.back();
        console.log('Back button clicked!');
    };
      
    // const handleCodeChange = (e) => {
    // setCode(e.target.value);
    // };
    
    // console.log('Confirmation code:', code);
  
    const handleConfirm = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
          // // Log request payload before sending
          // console.log("Request payload:", { code });

          // Send confirmation code to server
          const response = await fetch('http://localhost:4000/signup-confirm', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: emailForConfirmation, code }),
          });

          if (!response.ok) {
            throw new Error('Failed to confirm signup');
          }

          const data = await response.json();
          if (data.success) {
            window.location.href = '/signin';
            console.log("Confirmation successful!");
          } else {
            setError('Invalid confirmation code');
          }
      } catch (error) {
        setError('Error during confirmation');
      } 
      setIsLoading(false);
    };

    return (
    <div className='page'>
        <header>
            <BackButton onClick={handleBackButtonClick}/>
        </header>

        <form onSubmit={handleConfirm} className='form'>
            <h1 className='form__title'>Confirm account</h1>
            <p className='form__subtitle'>Enter the confirmation code sent to your email</p>

            <div className='field'>
                <label className='field__label' type="email" name="email">Confirmation Code</label>
                <input className='field__input' 
                  name="confirmationCode"
                  type="text" 
                  id="code" 
                  placeholder='Enter Confirmation Code'
                  value={code} 
                  onChange={setCode}
                  required 
                />
            </div>

            {error && <div style={{ color: 'red' }}>{error}</div>}
                
            <button type="submit" className='form__button'>
              {isLoading ? 'Confirming...' : 'Confirm'}
            </button>
        </form>
    </div>
    );
};

export default SignupConfirmPage;