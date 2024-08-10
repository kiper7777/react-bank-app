import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BalanceContext, TransactionsContext } from "./BalanceContext";
import "./BalancePage.css";
import settings from "./svg/settings.svg";
import notifications from "./svg/notifications.svg";
import receive from "./svg/receive.svg";
import send from "./svg/send.svg";
import stripe from "./svg/stripe.svg";
import coinbase from "./svg/coinbase.svg";
import email from "./svg/email.svg";

const BalancePage = () => {
  const { balance } = useContext(BalanceContext);
  const { transactions } = useContext(TransactionsContext);
  const navigate = useNavigate();

  const handleReceiveMoney = () => {
    navigate("/receive");
  };

  const handleSendMoney = () => {
    navigate("/send");
  };

  const handleSettingsClick = () => {
    console.log("Settings button clicked!");
    navigate("/settings");
  };

  const handleNotificationsClick = () => {
    console.log("Notifications button clicked!");
  };

  const getPaymentSystemIcon = (paymentSystem) => {
    switch (paymentSystem) {
      case 'Stripe':
        return stripe;
      case 'Coinbase':
        return coinbase;
      case 'Email':
        return email;  
      default:
        return null;
    }
  };

  const handleTransactionClick = (id) => {
    navigate(`/transaction/${id}`);
  };

  return (
    <div className="page__balance">
      <div className='page__balance__background-image'></div>
      <div className="header__content">
        <div className="header__balance">
          <img onClick={handleSettingsClick} src={settings} alt="Settings Icon" className="header__balance-image"/>
          <h6 className="header__balance-title">Main wallet</h6>
          <img onClick={handleNotificationsClick} src={notifications} alt="Notifications Icon" className="header__balance-image"/>
        </div>
        <span className="balance__amount">${balance.toFixed(2)}</span>
      </div>

      <div className="balance__operations">
        <div className="balance__operation">
          <img onClick={handleReceiveMoney} src={receive} alt="Receive Icon" className='balance__operations-image'/> 
          <span className="balance__operations-text">Receive</span>
        </div>
        <div className="balance__operation">
          <img onClick={handleSendMoney} src={send} alt="Send Icon" className='balance__operations-image'/>
          <span className="balance__operations-text">Send</span>
        </div>
      </div>

      <div className="transactions__content">
        
        <ul className="transaction-list">
          {transactions.map((transaction, index) => (
            <li key={index} className="transaction-item" onClick={() => handleTransactionClick(index)}>
              <div className="transaction-details">
                <div className="transaction-icon">
                  <img src={getPaymentSystemIcon(transaction.paymentSystem)} alt={`${transaction.paymentSystem} Icon`} />
                </div>
                <div className="transaction-info">
                  <span className={`transaction-system ${transaction.type}`}>
                    {transaction.paymentSystem.toUpperCase()}
                  </span>
                  <span className="transaction-time">
                    {new Date(transaction.time).toLocaleString()}
                  </span>
                </div>
                <div className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'receive' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BalancePage;
