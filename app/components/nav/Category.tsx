'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from 'query-string';

interface Props {
    label: string;
    icon: IconType;
    selected?: boolean
}

export const Category = ({label, icon:Icon, selected}:Props) => {
    const router = useRouter();
    const params = useSearchParams();
    const handleClick = useCallback(()=> {
        if(label === 'Todos') {
            router.push('/');
        } else {
            let currentQuery = {};
            if(params) {
                currentQuery = qs.parse(params.toString());
            }
            const updateQuery: any = {
                ...currentQuery,
                category: label
            }

            const url = qs.stringifyUrl({
                url: '/',
                query: updateQuery
            },
            {
                skipNull: true
            })
            router.push(url)
        }
    },[label, params, router])
  return (
    <div onClick={handleClick}
        className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-8 transition cursor-pointer
        ${selected ? 'border-b-slate-800 text-slate-800' :'border-transparent text-slate-500'}
    `}>
        <Icon size={20} />
        <div className="font-medium text-sm">{label}</div>
    </div>
  )
}
