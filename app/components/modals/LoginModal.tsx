'use client';
import Modal from "./modal";
import { useState } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../forms/CustomButton";

const LoginModal= ()=>{
    const loginModal = useLoginModal()

    const content= (   
        <>
             <h2 className="mb-6 text-2xl">Welcome to DjangoBNB, please Login</h2>
             <form action="" className="space-y-4">
                <input type="email" className="w-full h-[54px] border px-4 border-gray-300 rounded-xl" placeholder="Your email address" />
                <input type="password" className="w-full h-[54px] border px-4 border-gray-300 rounded-xl" placeholder="Your password" />
                <div className="p-5 bg-airbnb text-white rounded-xl opacity-60">The error message</div>
                <CustomButton
                 label="submit"
                 onclick={()=> console.log("Hola")}
                />
             </form>

        </>
    )

    return(
        <>
        <Modal
        isOpen={loginModal.isOpen}
        close={loginModal.close}
        label="Log in"    
        content={content}
        ></Modal>
        </>
    )
}
export default LoginModal;