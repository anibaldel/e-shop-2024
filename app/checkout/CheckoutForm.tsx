'use client'; 

import { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { Button, Heading, Input } from '../components';
import { formatPrice } from '@/utils';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { CartProductType } from '../interfaces';

interface Props {
  handlePaymentSuccess :(value: boolean)=> void;
  cartProducts: CartProductType[] | null;
  cartTotalAmount: number;
  handleClearCart: ()=> void;
}

export const CheckoutForm = ({handlePaymentSuccess, cartProducts, cartTotalAmount, handleClearCart}:Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false);
  const router = useRouter();
  const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
    defaultValues: {
        city: 'Sucre',
        country: 'Bolivia',
        address: '',
        address2: '',
        phone: ''
    }
});

  const onSubmit: SubmitHandler<FieldValues> =(data)=> {
        if(cartProducts) {
            setIsLoading(true);
            setError(false);

            fetch('/api/create-payment', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    items: {cartProducts, address:data},
                })
            }).then((res) => {
                setIsLoading(false)
                if(res.status === 401) {
                    return router.push('/login')
                }
                handlePaymentSuccess(true);
                handleClearCart();
                return res.json()
            }).catch((error)=> {
                setError(true)
                toast.error('Error al crear la orden')
            })
        }
  }
  return (
    <form  id='payment-form'>
      <div className='mb-6'>
        <Heading title= "Ingresa tus datos para completar la compra" />
      </div>
      <h2 className='font-semibold mt-4 mb-2'>Informacion de pago</h2>
      <Input 
            id="country"
            label="Pais"
            disabled
            register={register}
            errors={errors}
            required
        />
        <hr className='mb-3'/>
        <Input 
            id="city"
            label="Ciudad"
            disabled={isLoading} 
            register={register}
            errors={errors}
            required
        />
        <hr className='mb-3'/>
        <Input 
            id="address"
            label="Dirección"
            disabled={isLoading} 
            register={register}
            errors={errors}
            required
        />
        <hr className='mb-3'/>
        <Input 
            id="address2"
            label="Edificio y departamento (opcional)"
            disabled={isLoading} 
            register={register}
            errors={errors}
        />
        <hr className='mb-3'/>
        <Input 
            id="phone"
            label="Celular"
            disabled={isLoading} 
            register={register}
            errors={errors}
            required
        />
      <div className='py-4 text-center text-slate-700 text-xl font-bold'>
        Total: {formatPrice(cartTotalAmount)}
      </div>
      <Button
        label={isLoading ? 'Procesando' : 'Ordenar ahora'}
        disabled={isLoading}
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  )
}
