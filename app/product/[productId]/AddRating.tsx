'use client';

import { Button, Heading, Input } from "@/app/components";
import { SafeUser } from "@/types"
import { Rating } from "@mui/material";
import { Order, Product, Review } from "@prisma/client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Props {
  product: Product & {
    reviews: Review[]
  }
  user: (SafeUser & {
    orders: Order[];
  }) | null
}

export const AddRating = ({product, user}:Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm<FieldValues>({
    defaultValues: {
      comment: '',
      rating: 0
    }
  })

  const setCustomValue =(id: string, value: any)=> {
    setValue(id, value, {
      shouldTouch: true,
      shouldValidate: true,
      shouldDirty: true
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = async(data)=> {
    setIsLoading(true);
    if(data.rating === 0 ) {
      setIsLoading(false);
      return toast.error("rating no calificado")
    }
    const ratingData = {...data, userId: user?.id, product: product}
    axios.post('/api/rating', ratingData).then(()=> {
      toast.success("Calificacion agregada")
      router.refresh();
      reset();
    }).catch((error)=> {
      setIsLoading(false)
    })
  }

  if(!user || !product ) return null;

  const deliveredOrder = user?.orders.some(order=> order.products.find(item => 
    item.id === product.id) &&  order.deliveryStatus === 'entregado')

  const userReview = product.reviews.find((review:Review)=> {
      return review.userId === user.id
  })
  if(userReview || !deliveredOrder) return null;

  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
      <Heading title="Calificar este producto" />
      <Rating onChange={(event, newValue)=> {
        setCustomValue('rating', newValue)
      }} />
      <Input
        id="comment"
        label="Comentario"
        disabled={isLoading}
        register={register}
        errors={errors}
        required 
      />
      <Button label={isLoading ? 'Cargando...' : 'Calificar producto'} onClick={handleSubmit(onSubmit)} />
    </div>
  )
}
