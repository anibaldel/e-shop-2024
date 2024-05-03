'use client';

import Link from "next/link";
import { useCallback, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { MenuItem } from "./MenuItem";
import { signOut } from "next-auth/react";
import { Avatar } from "../Avatar";
import { BackDrop } from "./BackDrop";
import { SafeUser } from '../../../types/index';

interface Props {
    currentUser: SafeUser | null
}


export const UserMenu = ({currentUser}:Props) => {
    const [isOpen, setIsOpen] = useState(false)
    const toogleOpen = useCallback(()=> {
        setIsOpen(prev=> !prev)
    },[])
  return (
    <>
        <div className='relative z-30'>
            <div onClick={toogleOpen} className="p-2 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700">
                <Avatar src={currentUser?.image}/>
                <AiFillCaretDown />
            </div>
            {isOpen && (
                <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
                    {currentUser ? (
                        <div>
                            <Link href="/orders">
                                <MenuItem onClick={toogleOpen}>
                                    Tus ordenes
                                </MenuItem>
                            </Link>
                            {currentUser.role === "ADMIN" && (
                                <Link href="/admin">
                                    <MenuItem onClick={toogleOpen}>
                                        Admin Dashboard
                                    </MenuItem>
                                </Link>
                            )}
                            <hr />
                            <MenuItem onClick={()=> {
                                toogleOpen();
                                signOut();
                            }}
                            >
                                Cerrar Sesión
                            </MenuItem>
                        </div>
                    ): (
                        <div>
                            <Link href="/login">
                                <MenuItem onClick={toogleOpen}>
                                    Iniciar Sesión
                                </MenuItem>
                            </Link>
                            <Link href="/register">
                                <MenuItem onClick={toogleOpen}>
                                    Registrarse
                                </MenuItem>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
        {isOpen ? <BackDrop onClick={toogleOpen}/> : null}
    </>
  )
}
