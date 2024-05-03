'use client';

import { useEffect, useState } from "react";
import { Button, Heading, Input } from "../components";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface Props {
    currentUser: SafeUser | null;
}



export const RegisterForm = ({currentUser}:Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    useEffect(() => {
        if(currentUser) {
          router.push('/cart');
          router.refresh();
        }
      }, [])

    const onSubmit: SubmitHandler<FieldValues> =async(data)=> {
        setIsLoading(true);
        await axios.post('/api/register', data).then(()=> {
            toast.success('Cuenta creada')
        })
        signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        }).then(callback=> {
            if(callback?.ok) {
                router.push('/cart');
                router.refresh();
                toast.success("Bienvenido");
            }
            if(callback?.error) {
                toast.error(callback.error);
            }
        }).catch(()=> toast.error("Algo salio mal")).finally(()=>setIsLoading(false))
    }
    if(currentUser) {
        return <p className="text-center">Sessión Iniciada, Redireccionado...</p>  
    }

  return (
    <>
        <Heading title="Registrate a Sucre-Shop" />
        <Button 
            outline 
            label="Registrate con Google" 
            icon={AiOutlineGoogle} 
            onClick={()=> signIn('google')}
        />
        <hr className="bg-slate-300 w-full h-px"/>
        <Input 
            id="name"
            label="Nombre"
            disabled={isLoading} 
            register={register}
            errors={errors}
            required
        />
        <Input 
            id="email"
            label="Correro Electronico"
            disabled={isLoading} 
            register={register}
            errors={errors}
            required
            type="email"
            validationRules={{
                pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: "El formato del correo electrónico no es válido"
                }
            }}
            
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
            label={isLoading ? "Cargando" : "Registrarse"} 
            onClick={handleSubmit(onSubmit)}
        />
        <p className="text-sm">
            Ya tienes una cuenta?{" "}<Link className="underline" href="/login" >Login</Link>
        </p>
    </>
  )
}
