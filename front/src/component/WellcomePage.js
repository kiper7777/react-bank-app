import React from 'react';
import './WellcomePage.css'; 
import welcome from "./svg/bank-image.svg";

const WellcomePage = () => {
  // const history = useHistory();

  // const handleClick = () => {
  //   history.push('/signup');
  // }

  return (
    <div className="start-page">
      <div className='start-page__background-image'></div>
      <div className='start-page__text'>
        <h1 className='start-page__text-title'>Hello!</h1>
        <p className='start-page__text-description'>Welcome to Bank App</p>
      </div>
      <img src={welcome} alt="Bank Image" className='start-page__image'/>
        
      <div className="start-page__buttons">
        <button className='start-page__button-purple'><a className='start-page__button-purple__link'>Sign Up</a></button>
        <button className='start-page__button-white'><a className='start-page__button-white__link'>Sign In</a></button>
      </div>
    </div>
  );
};

export default WellcomePage;

