// SignupContext.js
import React, { createContext, useState } from 'react';

export const SignupContext = createContext();

export const SignupProvider = ({ children }) => {
  const [signupStep, setSignupStep] = useState('signup');
  const [emailForConfirmation, setEmailForConfirmation] = useState('');

  return (
    <SignupContext.Provider value={{ signupStep, setSignupStep, emailForConfirmation, setEmailForConfirmation }}>
      {children}
    </SignupContext.Provider>
  );
};
