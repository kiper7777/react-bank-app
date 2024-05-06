import React, { useState } from "react";
import BackButton from "./BackButton";
import "./RecoveryPage.css";

const RecoveryPage = () => {
    const handleBackButtonClick = () => {
        // Handle back button click logic here
        window.history.back(); // This will navigate back to the previous page in the browser history
        console.log('Back button clicked!');
    };
      
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    // const [error, setError] = useState('');
        
    const handleEmailChange = (e) => {
    setEmail(e.target.value);
    };
    
    const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle password recovery logic here (e.g., send recovery code to email)

    try {
        const response = await fetch('http://localhost:4000/recovery', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (response.ok) {
          setMessage(data.message);
        } else {
          setMessage(data.error || 'Failed to recover password');
        }
    } catch (error) {
    console.error('Error recovering password:', error);
    setMessage('Failed to recover password');
    }

    console.log('Recovery code sent to:', email);
    // Clear email field after submission
    setEmail('');
    };

    return (
    <div className='page'>
        <header>
        <BackButton onClick={handleBackButtonClick}/>
        </header>

        <form className='form' onSubmit={handleSubmit}>
            <h1 className='form__title'>Recover password</h1>
            <p className='form__subtitle'>Choose a recovery method</p>

            <div className='field'>
                <label className='field__label' 
                  name="email" 
                >Email</label>
                <input className='field__input' 
                  type="email" 
                  id="email" 
                  placeholder='example@gmail.com'
                  value={email} 
                  onChange={handleEmailChange}
                  required 
                />
            </div>
                
            <button className='form__button' type="submit">Send code</button>
            {message && <p className="message">{message}</p>}
        </form>
    </div>
    );
};

export default RecoveryPage;