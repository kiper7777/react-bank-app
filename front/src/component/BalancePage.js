import React, { useState } from "react";
import "./BalancePage.css";
import settings from "./svg/settings.svg";
import notifications from "./svg/notifications.svg";
import receive from "./svg/receive.svg";
import send from "./svg/send.svg";
import stripe from "./svg/stripe.svg";
import coinbase from "./svg/coinbase.svg";
import person from "./svg/person.svg";

const BalancePage = () => {
  const [balance, setBalance] = useState(1000);
  const [transactions, setTransactions] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [inputType, setInputType] = useState(""); // 'send' or 'receive'
  const [amount, setAmount] = useState();

  const handleReceiveMoney = () => {
    setShowInput(true);
    setInputType("receive");
  };

  const handleSendMoney = () => {
    setShowInput(true);
    setInputType("send");
  };

  const handleInputSubmit = (amount) => {
    if (inputType === "receive") {
      setBalance(balance + Number(amount));
      setTransactions([...transactions, { type: "receive", amount: amount }]);
    } else if (inputType === "send") {
      setBalance(balance - Number(amount));
      setTransactions([...transactions, { type: "send", amount: amount }]);
    }
    setShowInput(false);
  };

  const handleSettingsClick = () => {
    console.log("Settings button clicked!");
    // Handle settings click logic
  };

  const handleNotificationsClick = () => {
    console.log("Notifications button clicked!");
    // Handle notifications click logic
  };

  return (
    <div className="page__balance">
      <div className="page__balance__background-image"></div>
      <div className="header__content">
        <div className="header__balance">
          <img
            onClick={handleSettingsClick}
            src={settings}
            alt="Settings Icon"
            className="header__balance-image"
          />
          <h6 className="header__balance-title">Main wallet</h6>
          <img
            onClick={handleNotificationsClick}
            src={notifications}
            alt="Notifications Icon"
            className="header__balance-image"
          />
        </div>

        <span className="balance__amount">$ {balance.toFixed(2)}</span>
      </div>

      <div className="balance__operations">
        <div className="balance__operation" onClick={handleReceiveMoney}>
          <img src={receive} alt="Receive Icon" className="balance__operations-image" />
          <span className="balance__operations-text">Receive</span>
        </div>

        <div className="balance__operation" onClick={handleSendMoney}>
          <img src={send} alt="Send Icon" className="balance__operation-image" />
          <span className="balance__operations-text">Send</span>
        </div>
      </div>

      {showInput && (
        <form className="form__balance">
          <div className="card__balance">
            <div className="input-field-container">
              <input
                type="number"
                className="input-field"
                placeholder={`Enter ${inputType === 'send' ? 'send' : 'receive'} amount`}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                className="submit-button"
                onClick={(e) => {
                  e.preventDefault();
                  handleInputSubmit(amount);
                }}
              >
                Подтвердить
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="card__balance">
        {/* Existing transaction cards */}
        {/* Replace this section with mapped transactions */}
      </div>
    </div>
  );
};

export default BalancePage;
