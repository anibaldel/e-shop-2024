'use client';
import { CartProductType } from "@/app/interfaces";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount: number;
    cartProducts: CartProductType[] | null;
    payment: string | null;
    handleAddProductToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleCartQtyIncrease: (product: CartProductType) => void;
    handleCartQtyDecrease: (product: CartProductType) => void;
    handleClearCart: () => void;
    handleSetPayment:(val:string | null) => void
}
export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    [propName: string] : any
}

export const CartContextProvider = (props: Props)=> {
    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null)
    const [payment, setPayment] = useState<string | null>(null)

    useEffect(() => {
      const cartItems = localStorage.getItem('eshopCartItems');
      const cProducts: CartProductType[] | null = JSON.parse(cartItems || '[]');
      const eShopPayment :any= localStorage.getItem("eShopPayment")
      const paymentProducts: string | null = JSON.parse(eShopPayment)

      setCartProducts(cProducts);
      setPayment(paymentProducts)
    }, [])

    useEffect(()=> {
        const getTotals = ()=> {
            if(cartProducts) {
                const {total, qty} = cartProducts?.reduce((acc, item)=> {
                    const itemTotal = item.price * item.quantity;
                    acc.total += itemTotal;
                    acc.qty += item.quantity;
    
                    return acc
                },{
                    total: 0,
                    qty: 0
                });
                setCartTotalQty(qty);
                setCartTotalAmount(total);
            }
        }
        getTotals();
    },[cartProducts])
    
    
    const handleAddProductToCart = useCallback((product: CartProductType)=> {
        setCartProducts((prev)=> {
            let updatedCart;

            if(prev) {
                updatedCart = [...prev, product]
            } else {
                updatedCart = [product]
            }
            localStorage.setItem('eshopCartItems', JSON.stringify(updatedCart))
            return updatedCart
        })
        toast.success('Producto agregado al carrito');
    },[])

    const handleRemoveProductFromCart = useCallback((product: CartProductType)=> {
        if(cartProducts) {
            const filteredProducts = cartProducts.filter(item=> item.id !== product.id)
            setCartProducts(filteredProducts);
            toast.success('Producto eliminado');
            localStorage.setItem('eshopCartItems', JSON.stringify(filteredProducts))
        }
    },[cartProducts])
    
    const handleCartQtyIncrease = useCallback((product: CartProductType)=> {
        let updatedCart
        if(product.quantity === 50) {
            return toast.error("Ooops! limite alcanzado")
        }
        if(cartProducts) {
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex(item=> item.id === product.id);

            if(existingIndex > -1 ) {
                updatedCart[existingIndex].quantity = ++ updatedCart[existingIndex].quantity
                setCartProducts(updatedCart)
                localStorage.setItem('eshopCartItems', JSON.stringify(updatedCart))
            }

        }
    },[cartProducts])

    const handleCartQtyDecrease = useCallback((product: CartProductType)=> {
        let updatedCart
        if(product.quantity === 1) {
            return toast.error("Ooops! Lo miminio es 1 producto")
        }
        if(cartProducts) {
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex(item=> item.id === product.id);

            if(existingIndex > -1 ) {
                updatedCart[existingIndex].quantity = -- updatedCart[existingIndex].quantity
                setCartProducts(updatedCart)
                localStorage.setItem('eshopCartItems', JSON.stringify(updatedCart))
            }
        }

    },[cartProducts])

    const handleClearCart = useCallback(()=> {
        setCartProducts(null);
        setCartTotalQty(0);
        localStorage.setItem('eshopCartItems', JSON.stringify(null))
    },[])

    const handleSetPayment = useCallback((val: string | null)=> {
        setPayment(val)
        localStorage.setItem('eShopPayment', JSON.stringify(val))
    },[payment])

    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        payment,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,
        handleSetPayment,
    }
    return <CartContext.Provider value={value} {...props}/>
};

export const useCart =()=> {
    const context = useContext(CartContext);

    if(context === null) {
        throw new Error('useCart debe ser usado sin un CartContextProvider')
    }

    return context;
}