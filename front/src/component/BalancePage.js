import React, { useState } from "react";
import "./BalancePage.css";
import settings from "./svg/settings.svg";
import notifications from "./svg/notifications.svg"; 
import { click } from "@testing-library/user-event/dist/click";
import receive from "./svg/receive.svg";
import send from "./svg/send.svg";
import stripe from "./svg/stripe.svg";
import coinbase from "./svg/coinbase.svg";
import person from "./svg/person.svg";


const BalancePage = () => {
  const [balance, setBalance] = useState(1000);
  const [transactions, setTransactions] = useState([]);

  const handleReceiveMoney = () => {
    // Logic for receiving money
    const receivedAmount = Math.floor(Math.random() * 100) + 1;
    setBalance(balance + receivedAmount);
    setTransactions([...transactions, {type: 'receive', amount: receivedAmount}]);
    console.log('Receive button clicked');
    // Navigate to the receive page
    window.location.href = '/receive';
  };

  const handleSendMoney = () => {
    // Logic for sending money
    const sentAmount = Math.floor(Math.random() * 100) + 1;
    setTransactions([...transactions, {type: 'send', amount: sentAmount}]);
    console.log('Send button clicked');
    // Navigate to the send page
    window.location.href = '/send';
  };

  const handleSettingsClick = () => {
    // Handle back button click logic here
    console.log("Settings button clicked!");
  };

  const handleNotificationsClick = () => {
    // Handle back button click logic here
    console.log("Notifications button clicked!");
  };

  // const transactions = [
  //   { id: 1, name: 'Stripe', time: '12:25', type: 'Receipt', amount: '+$125.00' },
  //   { id: 2, name: 'Oleg V.', time: '12:25', type: 'Sending', amount: '-$200.50' },
  //   { id: 3, name: 'Coinbase', time: '10:00', type: 'Receipt', amount: '+$1,250.00' },
  //   { id: 4, name: 'Stripe', time: '12:25', type: 'Receipt', amount: '+$125.00' },
  //   { id: 5, name: 'Diana K.', time: '12:20', type: 'Sending', amount: '-$125.00' },
  //   { id: 6, name: 'Stripe', time: '12:25', type: 'Receipt', amount: '+$125.00' },
  //   { id: 7, name: 'Stripe', time: '12:20', type: 'Receipt', amount: '+$15.00' },
  // ];

   
  return (
    <div className="page__balance">
        <div className='page__balance__background-image'></div>
        <div className="header__content">

            <div className="header__balance">
                <img onClick={handleSettingsClick} src={settings} alt="Settings Icon" className="header__balance-image"/>
                <h6 className="header__balance-title">Main wallet</h6>
                <img onClick={handleNotificationsClick} src={notifications} alt="Notifications Icon" className="header__balance-image"/>
            </div>
            
            <span className="balance__amount">$ 100.20</span>
            
        </div>

        <div className="balance__operations">

          <div className="balance__operation">
            <img src={receive} alt="Receive Icon" className='balance__operations-image' onClick={handleReceiveMoney}/> 
            <span className="balance__operations-text">Receive</span>
          </div>

          <div className="balance__operation">
            <img src={send} alt="Send Icon" className='balance__operation-image' onClick={handleSendMoney}/>
            <span className="balance__operations-text">Send</span>
          </div>
        </div>

        <form className="form__balance">
    
            <div className="card__balance">

                {/* <ul className="transaction-list">
                  {transactions.map(transaction => (
                    <li key={transaction.id} className="transaction-item">
                      <div className="transaction-details">
                        <div className="transaction-icon">S</div>
                        <div className="transaction-info">
                          <span className="transaction-name">{transaction.name}</span>
                          <span className="transaction-time">{transaction.time} - {transaction.type}</span>
                        </div>
                        <span className="transaction-amount">{transaction.amount}</span>
                      </div>
                    </li>
                  ))}
                </ul> */}
              
                <div className="card__balance-transaction">
                  <div className="card__balance-transaction__block">
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
                  </div>
                  <div className="card__balance-transaction__amount">+$125.00</div>
                </div>

                <div className="card__balance-transaction">
                  <div className="card__balance-transaction__block">
                    <img
                      src={person}
                      alt="Person Icon"
                      className="card__balance-transaction__image"
                      onClick={click}
                    />
                    <div className="card__balance-transaction__text">
                      <span className="card__balance-transaction__text-title">Oleg V.</span>
                      <p className="card__balance-transaction__text-description">12:25 - Sending</p>
                    </div>
                  </div>
                  <div className="card__balance-transaction__amount">-$200.50</div>
                </div>

                <div className="card__balance-transaction">
                  <div className="card__balance-transaction__block">
                    <img
                      src={coinbase}
                      alt="Coinbase Icon"
                      className="card__balance-transaction__image"
                      onClick={click}
                    />
                    <div className="card__balance-transaction__text">
                      <span className="card__balance-transaction__text-title">Coinbase</span>
                      <p className="card__balance-transaction__text-description">10:20 - Receipt</p>
                    </div>
                  </div>
                  <div className="card__balance-transaction__amount">+$1250.00</div>
                </div>

                <div className="card__balance-transaction">
                  <div className="card__balance-transaction__block">
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
                  </div>
                  <div className="card__balance-transaction__amount">+$125.00</div>
                </div>

                <div className="card__balance-transaction">
                  <div className="card__balance-transaction__block">
                    <img
                      src={person}
                      alt="Person Icon"
                      className="card__balance-transaction__image"
                      onClick={click}
                    />
                    <div className="card__balance-transaction__text">
                      <span className="card__balance-transaction__text-title">Diana K.</span>
                      <p className="card__balance-transaction__text-description">12:25 - Sending</p>
                    </div>
                  </div>
                  <div className="card__balance-transaction__amount">-$125.00</div>
                </div>

                <div className="card__balance-transaction">
                  <div className="card__balance-transaction__block">
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
                  </div>
                  <div className="card__balance-transaction__amount">+$125.00</div>
                </div>

            </div>
        </form>
    </div>
  );
};

export default BalancePage;
