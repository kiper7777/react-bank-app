import React, { createContext, useState } from 'react';

export const BalanceContext = createContext();
export const TransactionsContext = createContext();

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(1000);  // Начальный баланс, можно изменить
  const [transactions, setTransactions] = useState([]);

  return (
    <BalanceContext.Provider value={{ balance, setBalance }}>
      <TransactionsContext.Provider value={{ transactions, setTransactions }}>
        {children}
      </TransactionsContext.Provider>
    </BalanceContext.Provider>
  );
};
