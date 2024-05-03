import { IconType } from "react-icons";

interface Props {
    icon: IconType;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
}

export const ActionBtn = ({icon:Icon, onClick, disabled}:Props) => {
  return (
    <button 
        onClick={onClick}
        disabled={disabled}
        className={`flex mt-2 items-center justify-center rounded cursor-pointer w-[40px] h-[30px] text-slate-700 border border-slate-400
            ${disabled && 'opacity-50 cursor-not-allowed'}
        `}
    >
        <Icon size={18} />
    </button>
  )
}
