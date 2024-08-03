import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import "./ReceivePage.css";
import stripe from "./svg/stripe.svg";
import stripeGroup from "./svg/stripe-group.svg";
import coinbase from "./svg/coinbase.svg";
import coinbaseGroup from "./svg/coinbase-group.svg";

const ReceivePage = () => {
  const navigate = useNavigate();
  
  const [amount, setAmount] = useState("");
  const [paymentSystem, setPaymentSystem] = useState("");

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePaymentSystemClick = (system) => {
    setPaymentSystem(system);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Amount:", amount);
    console.log("Payment System:", paymentSystem);
    setAmount("");
    setPaymentSystem("");
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <div className="page__receive">
      <div className="header">
        <BackButton onClick={handleBackButtonClick} />
        <h1 className="header__receive-title">Receive</h1>
      </div>

      <form className="form__receive" onSubmit={handleSubmit}>
        <div className="field__receive">
          <label className="field__receive-label">Receive amount</label>
          <input
            className="field__input"
            type="number"
            placeholder="$500"
            value={amount}
            onChange={handleAmountChange}
            required
          />
        </div>

        <hr className="divider" />

        <div className="field__receive">
          <label className="field__receive-label">Payment system</label>
          <div className="cards__receive">
            <div className="card__receive" onClick={() => handlePaymentSystemClick('Stripe')}>
              <img src={stripe} alt="Stripe Icon" className="card__receive-image" />
              <span className="card__receive-text">Stripe</span>
              <img src={stripeGroup} alt="Stripe Icons" className="card__group__image" />
            </div>

            <div className="card__receive" onClick={() => handlePaymentSystemClick('Coinbase')}>
              <img src={coinbase} alt="Coinbase Icon" className="card__receive-image" />
              <span className="card__receive-text">Coinbase</span>
              <img src={coinbaseGroup} alt="Coinbase Icons" className="card__group__image" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReceivePage;
