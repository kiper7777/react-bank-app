import React, { useState } from "react";
import BackButton from "./BackButton";
import "./Receive.css";
import stripe from "./svg/stripe.svg";
import stripeGroup from "./svg/stripe-group.svg";
import coinbase from "./svg/coinbase.svg";
import coinbaseGroup from "./svg/coinbase-group.svg";
import { click } from "@testing-library/user-event/dist/click";

const Notifications = () => {
  const handleBackButtonClick = () => {
    // Handle back button click logic here
    console.log("Back button clicked!");
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
    <div className="page__notifications">
      <div className="header">
        <BackButton onClick={handleBackButtonClick} />
        <h1 className="header__title">Notifications</h1>
      </div>

      <form className="form__notifications" onSubmit={handleSubmit}>
    
        <div className="field">
          
          <div className="cards">
            <div className="card">
              <img
                src={stripe}
                alt="Stripe Icon"
                className="card__image"
                onClick={click}
              />
              <span className="card__text">Stripe</span>
              <img
                src={stripeGroup}
                alt="Stripe Icons"
                className="card__group__image"
              />
            </div>

            <div className="card">
              <img
                src={coinbase}
                alt="Coinbase Icon"
                className="card__image"
                onClick={click}
              />
              <span className="card__text">Coinbase</span>
              <img
                src={coinbaseGroup}
                alt="Coinbase Icons"
                className="card__group__image"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Notifications;
