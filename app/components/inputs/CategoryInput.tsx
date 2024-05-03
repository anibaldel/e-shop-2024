'use client';

import { IconType } from "react-icons";

interface Props {
    selected?: boolean;
    label: string;
    icon: IconType
    onClick: (value:string) => void;
}

export const CategoryInput = ({selected, label, icon:Icon, onClick}:Props) => {
  return (
    <div 
        onClick={()=> onClick(label)} 
        className={`rounded-xl border-2 p-4 flex flex-col items-center gap-2 hover:border-slate-500 transition cursor-pointer
        ${selected ? 'border-slate-500' : 'border-transparent'}` }
    >
        <Icon size={30} />
        <div className="font-medium">
            {label}
        </div>
    </div>
  )
}
