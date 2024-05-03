'use client';

import { CartContextProvider } from "@/hooks";


interface Props {
    children: React.ReactNode;
}


export const CartProvider = ({children}:Props) => {
  return (
    <div>
        <CartContextProvider>
            {children}
        </CartContextProvider>
    </div>
  )
}
