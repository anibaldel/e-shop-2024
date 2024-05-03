'use client';

import { useEffect, useState } from "react";
import { Button, Heading, Input } from "../components";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "@/types";

interface Props {
    currentUser: SafeUser | null;
}

export const LoginForm = ({currentUser}:Props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        }
    })

    useEffect(() => {
      if(currentUser) {
        router.push('/cart');
        router.refresh();
      }
    }, [])
    

    const onSubmit: SubmitHandler<FieldValues> =(data)=> {
        setIsLoading(true);
        signIn('credentials', {
            ...data,
            redirect: false,
        }).then(callback=> {
            setIsLoading(false)
            if(callback?.ok) {
                router.push('/cart');
                router.refresh();
                toast.success("Bienvenido");
            }
            if(callback?.error) {
                toast.error(callback.error);
            }
        })
    }
    if(currentUser) {
      return <p className="text-center">Sessión Iniciada, Redireccionado...</p>  
    }
  return (
    <>
        <Heading title="Logueate a Sucre-Shop" />
        <Button 
            outline 
            label="Continua con Google" 
            icon={AiOutlineGoogle} 
            onClick={()=> signIn('google')}
        />
        <hr className="bg-slate-300 w-full h-px"/>
        <Input 
            id="email"
            label="Correro Electronico"
            disabled={isLoading} 
            register={register}
            errors={errors}
            required
        />
        <Input 
            id="password"
            label="Contraseña"
            disabled={isLoading} 
            register={register}
            errors={errors}
            required
            type="password"
        />
        <Button 
            label={isLoading ? "Cargando" : "Login"} 
            onClick={handleSubmit(onSubmit)}
        />
        <p className="text-sm">
            No tienes una cuenta?{" "}<Link className="underline" href="/register" >Registrate</Link>
        </p>
    </>
  )
}
