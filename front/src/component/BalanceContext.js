import React, { createContext, useState } from 'react';

const BalanceContext = createContext();

const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(1000.00);

  return (
    <BalanceContext.Provider value={{ balance, setBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export { BalanceContext, BalanceProvider };
