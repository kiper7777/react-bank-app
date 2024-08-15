import React from 'react';
import './WelcomePage.css'; 
import welcome from "./svg/bank-image.svg";
// import { Link } from 'react-router-dom';

const WelcomePage = () => {
 
  return (
    <div className="welcomepage">
      <div className='welcomepage__background-image'></div>
      <div className='welcomepage__text'>
        <h1 className='welcomepage__text-title'>Hello!</h1>
        <p className='welcomepage__text-description'>Welcome to Bank App</p>
      </div>
      <img src={welcome} alt="Welcome Bank Img" className='welcomepage__image'/>
        
      <div className="welcomepage__buttons">
        <button className='welcomepage__button-purple'><a href='/signup' className='welcomepage__button-purple__link'>Sign Up</a></button>
        <button className='welcomepage__button-white'><a href='/signin' className='welcomepage__button-white__link'>Sign In</a></button>
      </div>
    </div>
  );
};

export default WelcomePage;

