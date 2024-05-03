'use client';

import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import qs from 'query-string';

export const SearchBar = () => {
    const router = useRouter();
    const {register, handleSubmit, reset, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            searchItem: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues>= async(data)=> {
        if(!data.searchItem) return router.push('/');

        const url = qs.stringifyUrl({
            url: '/',
            query: {
                searchItem: data.searchItem
            }
        },{skipNull: true})

        router.push(url);
        reset();
    }
  return (
    <div className="flex items-center">
        <input
            {...register('searchItem')}
            type="text"
            autoComplete="off"
            className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-[0.5px] focus:border-slate-500 w-80"
            placeholder="Explora Sucre-Shop" 
        />
            <button
                onClick={handleSubmit(onSubmit)} 
                className="bg-slate-700 hover:opacity-80 text-white p-2 rounded-r-md"
            >
                Buscar
            </button>
        </div>
  )
}
