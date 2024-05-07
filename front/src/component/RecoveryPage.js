import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import BackButton from "./BackButton";
import "./RecoveryPage.css";

const RecoveryPage = () => {
  // const history = useHistory(); // Initialize useHistory

    const handleBackButtonClick = () => {
        // Handle back button click logic here
        window.history.back(); // Navigate back to the previous page
        console.log('Back button clicked!');
    };
      
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    // const [error, setError] = useState('');
        
    const handleEmailChange = (e) => {
    setEmail(e.target.value);
    };
    
    const handleRecovery = async () => {
    // e.preventDefault();
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
          // Redirect to the RecoveryConfirmPage component
          window.location.href = '/recovery-confirm';
        } else {
          setMessage(data.error || 'Failed to recover password');
        }
    } catch (error) {
    console.error('Error recovering password:', error);
    setMessage('Failed to recover password');
    }

    console.log('Recovery code sent to:', email);
    setEmail(''); // Clear email field after submission
    };

    return (
    <div className='page'>
        <header>
          <BackButton onClick={handleBackButtonClick}/>
        </header>

        <form className='form'>
            <h1 className='form__title'>Recover password</h1>
            <p className='form__subtitle'>Enter your email to receive a recovery code</p>

            <div className='field'>
                <label className='field__label'>Email</label>
                <input className='field__input' 
                  type="email" 
                  id="email" 
                  placeholder='example@gmail.com'
                  value={email} 
                  onChange={handleEmailChange}
                  required 
                />
            </div>
                
            <button type="button" onClick={handleRecovery} className='form__button'>Send code</button>
            {message && <p className="message">{message}</p>}
        </form>
    </div>
    );
};

export default RecoveryPage;