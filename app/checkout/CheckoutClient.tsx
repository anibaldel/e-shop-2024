'use client'

import { useCart } from "@/hooks"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckoutForm } from "./CheckoutForm";
import { Button } from "../components";

export const CheckoutClient = () => {
    const {cartTotalAmount, handleClearCart,cartProducts} = useCart();
    const router = useRouter();
    const [handlePaymentSuccess, setHandlePaymentSuccess] = useState(false)

    if(!cartProducts && handlePaymentSuccess === false) {
        router.push('/')
    }
  return (
    <div className="w-full">
        {cartProducts && (
          <CheckoutForm 
            handlePaymentSuccess={setHandlePaymentSuccess}
            cartTotalAmount={cartTotalAmount}
            cartProducts={cartProducts}
            handleClearCart={handleClearCart}
          />
        )}
        {handlePaymentSuccess && (
          <div className="flex items-center flex-col gap-4">
            <div className="text-teal-500 text-center">Orden exitosa</div>
            <div className="max-w-[220px] w-full">
              <Button label="Ver tus ordenes" onClick={()=> router.push("/orders")} />
            </div>
          </div>
        )}
    </div>
  )
}
