import React, { useState } from "react";
import BackButton from "./BackButton";
import "./Transaction.css";
import announcement from "./svg/announcement.svg";
import warning from "./svg/warning.svg";
import { click } from "@testing-library/user-event/dist/click";

const Transaction = () => {
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
    <div className="page__transaction">
      <div className="header">
        <BackButton onClick={handleBackButtonClick} />
        <h1 className="header__transaction-title">Transaction</h1>
      </div>

      <span className="transaction__amount">+$100.20</span>

      <form className="form__receive" onSubmit={handleSubmit}>
    
        <div className="field__receive">
          
          <div className="cards__notifications">
            <div className="card__transaction">
              <img
                src={announcement}
                alt="Announcement Icon"
                className="card__notifications-image"
                onClick={click}
              />
              <div className="card__notifications-text">
                <span className="card__notifications-title">New reward system</span>
                <p className="card__notifications-text-description">10 min. ago - Announcement</p>
              </div>
            </div>

          </div>
        </div>
      </form>
    </div>
  );
};

export default Transaction;
