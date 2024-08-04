import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BalanceContext, TransactionsContext } from "./BalanceContext";
import BackButton from "./BackButton";
import "./ReceivePage.css";
import stripe from "./svg/stripe.svg";
import stripeGroup from "./svg/stripe-group.svg";
import coinbase from "./svg/coinbase.svg";
import coinbaseGroup from "./svg/coinbase-group.svg";

const ReceivePage = () => {
  const navigate = useNavigate();
  const { balance, setBalance } = useContext(BalanceContext);
  const { transactions, setTransactions } = useContext(TransactionsContext);
  const [amount, setAmount] = useState("");
  const [paymentSystem, setPaymentSystem] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePaymentSystemClick = (system) => {
    setPaymentSystem(system);
    setConfirmation(true);
  };

  const handleConfirm = () => {
    const receivedAmount = parseFloat(amount);
    if (!isNaN(receivedAmount) && receivedAmount > 0) {
      setBalance(balance + receivedAmount);
      setTransactions([...transactions, {
        type: 'receive',
        counterparty: paymentSystem,
        amount: receivedAmount,
        time: new Date().toISOString(),
        paymentSystem: paymentSystem
      }]);
      setAmount("");
      setPaymentSystem("");
      setConfirmation(false);
      navigate('/balance');
    } else {
      alert('Invalid amount.');
      setConfirmation(false);
    }
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

      {!confirmation ? (
        <form className="form__receive" onSubmit={(e) => e.preventDefault()}>
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
      ) : (
        <div className="confirmation">
          <p>Confirm receiving ${amount} via {paymentSystem}?</p>
          <button className="confirm-button" onClick={handleConfirm}>Confirm</button>
          <button className="cancel-button" onClick={() => setConfirmation(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ReceivePage;
