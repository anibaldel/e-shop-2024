'use client';

import { CartProductType } from "@/app/interfaces";

interface Props {
    cartCounter?: boolean;
    cartProduct: CartProductType;
    handleQtyIncrease: ()=> void;
    handleQtyDecrease: ()=> void;
}

const btnStyles = "border-[1.2px] border-slate-300 px-2 rounded"

export const SetQuantity = ({cartCounter, cartProduct, handleQtyIncrease, handleQtyDecrease}:Props) => {
  return (
    <div className="flex gap-8 items-center">
        {cartCounter ? null : (
            <div className="font-semibold">
                CANTIDAD: 
            </div>
        )}
        <div className="flex gap-4 items-center text-base">
            <button onClick={handleQtyDecrease} className={btnStyles}>-</button>
            <div>{cartProduct.quantity}</div>
            <button onClick={handleQtyIncrease} className={btnStyles}>+</button>
        </div>
    </div>
  )
}
