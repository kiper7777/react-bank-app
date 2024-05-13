import React, { useState } from "react";
import BackButton from "./BackButton";
import "./SignupConfirmPage.css";

const SignupConfirmPage = () => {
    const handleBackButtonClick = () => {
        // Handle back button click logic here
        window.history.back();
        console.log('Back button clicked!');
    };
      
    const [code, setCode] = useState('');
        
    const handleCodeChange = (e) => {
    setCode(e.target.value);
    };
    
    // console.log('Confirmation code:', code);
  
    const handleConfirm = async () => {
      try {
          // Log request payload before sending
          console.log("Request payload:", { code });

          // Send confirmation code to server
          const response = await fetch('http://localhost:4000/signup-confirm', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          });

          const data = await response.json();
          if (data.success) {
              // Handle successful confirmation
              console.log("Confirmation successful!");
              // Redirect user or display success message
          } else {
            // Handle confirmation error
            console.error("Confirmation error:", data.error);
            // Display error message to user
          }
      } catch (error) {
          console.error("Error during confirmation:", error.message);
          // Handle network error or other unexpected errors
      } 
      
    };

    return (
    <div className='page'>
        <header>
            <BackButton onClick={handleBackButtonClick}/>
        </header>

        <form className='form'>
            <h1 className='form__title'>Confirm account</h1>
            <p className='form__subtitle'>Write the code you received</p>

            <div className='field'>
                <label className='field__label' type="email" name="email">Code</label>
                <input className='field__input' 
                  type="text" 
                  id="code" 
                  placeholder='Enter Confirmation Code'
                  value={code} 
                  onChange={handleCodeChange}
                  required 
                />
            </div>
                
            <button onClick={handleConfirm} className='form__button'>Confirm</button>
        </form>
    </div>
    );
};

export default SignupConfirmPage;