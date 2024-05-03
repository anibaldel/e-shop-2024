'use client';

import { formatPrice } from "@/utils";
import { CartProductType } from "../interfaces"
import Link from "next/link";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import { SetQuantity } from "../components";
import { useCart } from "@/hooks";

interface Props {
    item: CartProductType;
}

export const ItemContent = ({item}:Props) => {
    const {handleRemoveProductFromCart, handleCartQtyIncrease, handleCartQtyDecrease} = useCart();
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
        <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
            <Link href={`/product/${item.id}`}>
                <div className="relative w-[70px] aspect-square">
                    <Image src={item.selectedImage.image} alt={item.name} fill className="object-contain" />
                </div>
            </Link>
            <div className="flex flex-col justify-between">
            <Link href={`/product/${item.id}`}>
                {truncateText(item.name)}
            </Link>
            <div>{item.selectedImage.color}</div>
            <div className="w-[70px]">
                <button onClick={()=> handleRemoveProductFromCart(item)}
                    className="text-slate-500 underline"
                >
                    Remover
                </button>
            </div>
            
            </div>
        </div>
        <div className="justify-self-center">{formatPrice(item.price)}</div>
        <div className="justify-self-center">
            <SetQuantity
                cartCounter={true}
                cartProduct={item}
                handleQtyDecrease={()=> handleCartQtyDecrease(item)}
                handleQtyIncrease={()=> handleCartQtyIncrease(item)}
            />
        </div>   
        <div className="justify-self-end font-semibold">
            {formatPrice(item.price * item.quantity)}
        </div>    
    </div>
  )
}
