import React, { useState } from "react";
import "./Balance.css";
import settings from "./svg/settings.svg";
import notifications from "./svg/notifications.svg"; 
import { click } from "@testing-library/user-event/dist/click";
import receive from "./svg/receive.svg";
import send from "./svg/send.svg";
import stripe from "./svg/stripe.svg";
import coinbase from "./svg/coinbase.svg";
import person from "./svg/person.svg";


const Balance = () => {
  const handleSettingsClick = () => {
    // Handle back button click logic here
    console.log("Settings button clicked!");
  };

  const handleNotificationsClick = () => {
    // Handle back button click logic here
    console.log("Notifications button clicked!");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here (e.g., send data to backend)
    console.log("Email:", email);
    console.log("Password:", password);
    // Clear form fields
    setEmail("");
    setPassword("");
  };

  return (
    <div className="page__balance">
        <div className='page__balance__background-image'></div>
        <div className="header__content">

            <div className="header__balance">
                <img src={settings} alt="Settings Icon" className="header__balance-image" onClick={handleSettingsClick} />
                <h6 className="header__balance-title">Main wallet</h6>
                <img src={notifications} alt="Notifications Icon" className="header__balance-image" onClick={handleNotificationsClick}/>
            </div>
            
            <span className="balance__amount">$ 100.20</span>
            
        </div>

        <div className="balance__operations">

          <div className="balance__operation">
            <img src={receive} alt="Receive Icon" className='balance__operations-image'/> 
            <span className="balance__operations-text">Receive</span>
          </div>

          <div className="balance__operation">
            <img src={send} alt="Send Icon" className='balance__operation-image'/>
            <span className="balance__operations-text">Send</span>
          </div>
        </div>

        <form className="form__balance" onSubmit={handleSubmit}>
    
            <div className="card__balance">

                <div className="card__balance-transaction">
                  <img
                    src={stripe}
                    alt="Stripe Icon"
                    className="card__balance-transaction__image"
                    onClick={click}
                  />
                  <div className="card__balance-transaction__text">
                    <span className="card__balance-transaction__text-title">Stripe</span>
                    <p className="card__balance-transaction__text-description">12:25 - Receipt</p>
                  </div>
                  <span className="card__balance-transaction__amount">+$125.00</span>
                </div>

            </div>
        </form>
    </div>
  );
};

export default Balance;
