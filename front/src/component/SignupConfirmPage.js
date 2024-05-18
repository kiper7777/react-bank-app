import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import BackButton from "./BackButton";
import "./SignupConfirmPage.css";

const SignupConfirmPage = ({ emailForConfirmation }) => {
    // const handleBackButtonClick = () => {
    //     window.history.back();
    //     console.log('Back button clicked!');
    // };
      
    const navigate = useNavigate();
    // const location = useLocation();
    const [code, setCode] = useState('');
    const [confirmationError, setConfirmationError] = useState('');

    const handleCodeChange = (e) => {
    setCode(e.target.value);
    };
    
    console.log('Confirmation code:', code);
  
    const handleConfirm = async (e) => {
      e.preventDefault();
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

          const data = await response.json();
          if (data.success) {
            navigate('/signin');
            console.log("Confirmation successful!");
          } else {
            setConfirmationError(data.error);
            console.error("Confirmation error:", data.error);
          }
      } catch (error) {
        setConfirmationError(error.message);
        console.error("Error during confirmation:", error.message);
      } 
      
    };

    return (
    <div className='page'>
        <header>
            <BackButton onClick={() => navigate(-1)}
            // onClick={handleBackButtonClick}
            />
        </header>

        <form onSubmit={handleConfirm} className='form'>
            <h1 className='form__title'>Confirm account</h1>
            <p className='form__subtitle'>Write the code you received</p>

            <div className='field'>
                <label className='field__label' type="email" name="email">Code</label>
                <input className='field__input' 
                  name="code"
                  type="text" 
                  id="code" 
                  placeholder='Enter Confirmation Code'
                  value={code} 
                  onChange={handleCodeChange}
                  required 
                />
                {confirmationError && <div style={{color: 'red'}}>{confirmationError}</div>}
            </div>
                
            <button type="submit" className='form__button'>Confirm</button>
        </form>
    </div>
    );
};

export default SignupConfirmPage;