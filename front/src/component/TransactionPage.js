import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TransactionsContext } from "./BalanceContext";
import BackButton from "./BackButton";
import "./TransactionPage.css";

const TransactionPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { transactions } = useContext(TransactionsContext);
  const transaction = transactions[id];

  const handleBackButtonClick = () => {
    navigate("/balance");
  };

  if (!transaction) {
    return <div>Transaction not found</div>;
  }

  return (
    <div className="page__transaction">
      <div className="header">
        <BackButton onClick={handleBackButtonClick} />
        <h1 className="header__transaction-title">Transaction</h1>
      </div>

      <span className="transaction__amount">
        {transaction.type === 'receive' ? '+' : '-'}${transaction.amount.toFixed(2)}
      </span>

      <form className="form__transaction">
        <div className="card__transaction">
          <div className="card__transaction__content">
            <span className="card__transaction__content-name">Date</span>
            <p className="card__transaction__content-info">
              {new Date(transaction.time).toLocaleDateString()} {new Date(transaction.time).toLocaleTimeString()}
            </p>
          </div>

          <hr className="transaction__divider" />

          <div className="card__transaction__content">
            <span className="card__transaction__content-name">Address</span>
            <p className="card__transaction__content-info">{transaction.counterparty}</p>
          </div>

          <hr className="transaction__divider" />

          <div className="card__transaction__content">
            <span className="card__transaction__content-name">Type</span>
            <p className="card__transaction__content-info">{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TransactionPage;


