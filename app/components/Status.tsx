import { IconType } from "react-icons"

interface Props {
    text: string,
    icon: IconType,
    bg: string,
    color: string

}

const Status = ({text, icon:Icon, bg, color}:Props) => {
  return (
    <div className={`${bg} ${color} px-1 rounded flex items-center gap-1`}>
        <p className="text-sm">{text}</p> <Icon size={15} />
    </div>
  )
}

export default Status