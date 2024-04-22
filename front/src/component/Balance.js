import React, { useState } from "react";
import "./Balance.css";
import settings from "./svg/settings.svg";
import notifications from "./svg/notifications.svg"; 
import { click } from "@testing-library/user-event/dist/click";

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

        <form className="form__balance" onSubmit={handleSubmit}>
    
            <div className="card__transaction">
                <div className="card__transaction__content">
                    <span className="card__transaction__content-name">Date</span>
                    <p className="card__transaction__content-info">25 May, 15:20</p>
                </div>

                <hr className="transaction__divider" />

                <div className="card__transaction__content">
                    <span className="card__transaction__content-name">Address</span>
                    <p className="card__transaction__content-info">user123@mail.com</p>
                </div>

                <hr className="transaction__divider" />

                <div className="card__transaction__content">
                    <span className="card__transaction__content-name">Type</span>
                    <p className="card__transaction__content-info">Receive</p>
                </div>
            </div>
        </form>
    </div>
  );
};

export default Balance;
