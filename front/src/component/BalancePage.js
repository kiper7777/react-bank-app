import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BalanceContext, TransactionsContext } from "./BalanceContext";
import "./BalancePage.css";
import settings from "./svg/settings.svg";
import notifications from "./svg/notifications.svg";
import receive from "./svg/receive.svg";
import send from "./svg/send.svg";

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
  };

  const handleNotificationsClick = () => {
    console.log("Notifications button clicked!");
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
          <img src={receive} alt="Receive Icon" className='balance__operations-image' onClick={handleReceiveMoney}/> 
          <span className="balance__operations-text">Receive</span>
        </div>
        <div className="balance__operation">
          <img src={send} alt="Send Icon" className='balance__operations-image' onClick={handleSendMoney}/>
          <span className="balance__operations-text">Send</span>
        </div>
      </div>

      <div className="transactions__content">
        <h2>Transactions</h2>
        <ul className="transaction-list">
          {transactions.map((transaction, index) => (
            <li key={index} className="transaction-item">
              <div className="transaction-details">
                <div className="transaction-icon">
                  {transaction.type === 'receive' ? (
                    <img src={receive} alt="Receive Icon" />
                  ) : (
                    <img src={send} alt="Send Icon" />
                  )}
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
