'use client';
import Modal from "./modal";
import { useState } from "react"; 
import CustomButton from "../forms/CustomButton";
import useSignUpModal from "@/app/hooks/useSignUpModal";

const SignUpModal= ()=>{
    const signUpmodal = useSignUpModal()

    const content= (   
        <>
             <h2 className="mb-6 text-2xl">Welcome to DjangoBNB, please Login</h2>
             <form action="" className="space-y-4">
                <input type="email" className="w-full h-[54px] border px-4 border-gray-300 rounded-xl" placeholder="Your email address" />
                <input type="password" className="w-full h-[54px] border px-4 border-gray-300 rounded-xl" placeholder="Your password" />
                <input type="password" className="w-full h-[54px] border px-4 border-gray-300 rounded-xl" placeholder="Repeat your password" />
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
        isOpen={signUpmodal.isOpen}
        close={signUpmodal.close}
        label="Sign uP"    
        content={content}
        ></Modal>
        </>
    )
}
export default SignUpModal;