'use client';
import { useCart } from "@/hooks"
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { Button, Heading } from "../components";
import { ItemContent } from "./ItemContent";
import { formatPrice } from "@/utils";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";

interface Props {
    currentUser: SafeUser | null;
}

export const CartClient = ({currentUser}:Props) => {
    const {cartProducts, handleClearCart, cartTotalAmount} = useCart();
    const router = useRouter();

    if(!cartProducts || cartProducts.length === 0) {
        return (
            <div className="flex flex-col items-center">
                <div className="text-2xl">Tu carrito esta vacio</div>
                <div>
                    <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2">
                        <MdArrowBack />
                        <span>Empezar a comprar</span>
                    </Link>
                </div>
            </div>
        )
    }
  return (
    <div>
        <Heading title="Carrito de compras" center />
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
            <div className="col-span-2 justify-self-start">PRODUCTO</div>
            <div className="justify-self-center">PRECIO</div>
            <div className="justify-self-center">CANTIDAD</div>
            <div className="justify-self-end">TOTAL</div>
        </div>
        <div>
            {cartProducts && cartProducts.map((item)=> (
                <ItemContent key={item.id} item={item}/>
            ))}
        </div>
        <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
            <div className="w-[120px]">
                <Button label="Limpiar carrito" onClick={()=> handleClearCart() } small outline/>
            </div>
            <div className="text-sm flex flex-col gap-1 items-start">
                <div className="flex justify-between w-full text-base font-semibold">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartTotalAmount)}</span>
                </div>
                <p className="text-slate-500">Impuestos y costo de envio al realizar la compra</p>
                <Button 
                    label={currentUser ? "Verificar": "Iniciar sesion para verificar"} 
                    outline={currentUser ? false : true}
                    onClick={()=> {currentUser ? router.push('/checkout'): router.push('/login')}}
                /> 
                <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2">
                    <MdArrowBack />
                    <span>Continua comprando</span>
                </Link>
            </div>
        </div>
    </div>
  )
}
