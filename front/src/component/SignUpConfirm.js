import React, { useState } from "react";
import BackButton from "./BackButton";
import "./SignUpConfirm.css";

const SignUpConfirm = () => {
    const handleBackButtonClick = () => {
        // Handle back button click logic here
        console.log('Back button clicked!');
    };
      
    const [code, setCode] = useState('');
        
    const handleCodeChange = (e) => {
    setCode(e.target.value);
    };
    
    const handleSubmit = (e) => {
    e.preventDefault();
    // Handle confirmation logic here 
    console.log('Confirmation code:', code);
    // Clear code field after submission
    setCode('');
    };

    return (
    <div className='page'>
        <header>
            <BackButton onClick={handleBackButtonClick}/>
        </header>

        <form className='form' onSubmit={handleSubmit}>
            <h1 className='form__title'>Confirm account</h1>
            <p className='form__subtitle'>Write the code you received</p>

            <div className='field'>
                <label className='field__label' type="email" name="email">Code</label>
                <input className='field__input' 
                  type="text" 
                  id="code" 
                  placeholder='123456'
                  value={code} 
                  onChange={handleCodeChange}
                  required 
                />
            </div>
                
            <button className='form__button' type="submit">Confirm</button>
        </form>
    </div>
    );
};

export default SignUpConfirm;