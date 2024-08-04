import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BalanceContext, TransactionsContext } from './BalanceContext';
import BackButton from './BackButton';
import "./SendPage.css";

const SendPage = () => {
  const navigate = useNavigate();
  const { balance, setBalance } = useContext(BalanceContext);
  const { transactions, setTransactions } = useContext(TransactionsContext);
  const [email, setEmail] = useState('');
  const [sum, setSum] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSumChange = (e) => {
    setSum(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(sum);
    if (!isNaN(amount) && amount > 0 && amount <= balance) {
      setBalance(balance - amount);
      setTransactions([...transactions, {
        type: 'send',
        counterparty: email,
        amount: amount,
        time: new Date().toISOString(),
        paymentSystem: 'Email'
      }]);
      setEmail('');
      setSum('');
      navigate('/balance');
    } else {
      alert('Invalid amount or insufficient funds.');
    }
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <div className='page__send'>
      <header className='header'>
        <BackButton onClick={handleBackButtonClick}/>
        <h1 className='form__send-title'>Send</h1>
      </header>

      <form className='form__send' onSubmit={handleSubmit}>
        <div className='field__send'>
          <label className='field__send-label' type="email" name="email">Email</label>
          <input className='field__input' 
            type="email" 
            id="email"
            placeholder='example@gmail.com'
            value={email} 
            onChange={handleEmailChange} 
            required
          />
        </div>

        <div className='field__send'>
          <label className='field__send-label'>Sum</label>
          <input className='field__input' 
            type="number" 
            id="sum"
            placeholder='$500'
            value={sum} 
            onChange={handleSumChange}
            required
          />
        </div>

        <button className='form__send-button' type="submit">Send</button>
      </form>
    </div>
  );
};

export default SendPage;
