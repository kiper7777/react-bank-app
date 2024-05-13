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
    
    // const handleSubmit = (e) => {
    // e.preventDefault();
    // // Handle confirmation logic here 
    console.log('Confirmation code:', code);
    // // Clear code field after submission
    // setCode('');
    // };

    const handleConfirm = async () => {
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
        } else {
          // Handle confirmation error
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