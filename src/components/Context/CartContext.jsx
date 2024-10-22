import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [CartInfo, setCartInfo] = useState(false); // Example state

  return (
    <CartContext.Provider value={{ CartInfo, setCartInfo }}>
      {children}
    </CartContext.Provider>
  );
};
