import React, { useState } from "react";
import BackButton from "./BackButton";
import "./Receive.css";
import stripe from "./svg/stripe.svg";
import stripeGroup from "./svg/stripe-group.svg";
import coinbase from "./svg/coinbase.svg";
import coinbaseGroup from "./svg/coinbase-group.svg";
import { click } from "@testing-library/user-event/dist/click";

const Receive = () => {
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
    <div className="page__receive">
      <div className="header">
        <BackButton onClick={handleBackButtonClick} />
        <h1 className="header__receive-title">Receive</h1>
      </div>

      <form className="form__receive" onSubmit={handleSubmit}>
        <div className="field__receive">
          <label className="field__receive-label" type="text" name="amount">
            Receive amount
          </label>
          <input
            className="field__input"
            type="number"
            placeholder="$500"
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <hr className="divider" />

        <div className="field__receive">
          <label className="field__receive-label">Payment system</label>

          <div className="cards__receive">
            <div className="card__receive">
              <img
                src={stripe}
                alt="Stripe Icon"
                className="card__receive-image"
                onClick={click}
              />
              <span className="card__receive-text">Stripe</span>
              <img
                src={stripeGroup}
                alt="Stripe Icons"
                className="card__group__image"
              />
            </div>

            <div className="card__receive">
              <img
                src={coinbase}
                alt="Coinbase Icon"
                className="card__receive-image"
                onClick={click}
              />
              <span className="card__receive-text">Coinbase</span>
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

export default Receive;
