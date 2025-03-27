'use client';

import React, { useState } from "react";
import MenuLink from "./MenuLink";
import useLoginModal from "@/app/hooks/useLoginModal";
import useSignUpModal from "@/app/hooks/useSignUpModal";
import LogoutButton from "../LogOutButton"

import { useRouter } from "next/navigation";

interface userNavProps{
    userId?: string | null;
}
const UserNav: React.FC<userNavProps>=({
    userId
})=>{
    const router = useRouter()
    const loginModal = useLoginModal();
    const signUpModal = useSignUpModal();
    const [isOpen, setIsOpen] = useState(false)
    return(
        <div className="p-2 relative inline-block border rounded-full">
            <button 
            onClick={()=>setIsOpen(!isOpen)}
            className="flex items-center ">
            <svg  fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <svg  fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            </button>

            {isOpen && (
                <div className="w-[200px] absolute top-[60px] right-0 bg-white border rounded-xl shadow-md flex flex-col cursor-pointer">
                    {userId? (
                    <>
                    <MenuLink 
                    label="Inbox"
                    onClick={()=> {
                        setIsOpen(false);
                        router.push(`/inbox`)
                        }}
                    />
                    <MenuLink 
                    label="My properties"
                    onClick={()=> {
                        setIsOpen(false);
                        router.push(`/myproperties`)
                        }}
                    />
                    <MenuLink 
                    label="My reservations"
                    onClick={()=> {
                        setIsOpen(false);
                        router.push(`/myreservations`)
                        }}
                    />
                    <MenuLink 
                    label="My favorites"
                    onClick={()=> {
                        setIsOpen(false);
                        router.push(`/myfavorites`)
                        }}
                    />
                      <LogoutButton/>  
                    </>
                    ):(
                        <>
                    <MenuLink
                    onClick={()=> {console.log('Click bitton')
                        setIsOpen(false);
                        loginModal.open()
                        }
                    }
                label='Log In'
                />
                    <MenuLink
                    onClick={()=> {console.log('Click bitton')
                        setIsOpen(false);
                        signUpModal.open()
                    }
                }
                label="Sign Up"
                />
                </>
                )}

                    
                </div>

            )}            
        </div>
    )
}
export default UserNav