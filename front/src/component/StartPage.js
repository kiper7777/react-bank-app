// src/components/StartPage.js

import React from 'react';
import './StartPage.css'; // Import CSS file
import welcome from "./bank-image.svg"
import SignUpForm from './component/SignUpForm';

const StartPage = () => {
  return (
    <div className="start-page">
      <div className='start-page__background-image'></div>
      <div className='start-page__text'>
        <h1 className='start-page__text-title'>Hello!</h1>
        <p className='start-page__text-description'>Welcome to Bank App</p>
      </div>
      <img src={welcome} alt="Bank Image" className='start-page__image'/>
        
      <div className="start-page__buttons">
        <a className='start-page__button-purple' href={SignUpForm}>Sign Up</a>
        <button className='start-page__button-white'>Sign In</button>
      </div>
    </div>
  );
};

export default StartPage;

