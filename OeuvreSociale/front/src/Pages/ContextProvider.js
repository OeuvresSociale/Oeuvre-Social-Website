import React, { createContext, useState } from 'react';

export const OTPContext = createContext();

export const OTPContextProvider = ({ children }) => {
    const [generatedOTP, setGeneratedOTP] = useState(null);

    return (
        <OTPContext.Provider value={{ generatedOTP, setGeneratedOTP }}>
            {children}
        </OTPContext.Provider>
    );
};