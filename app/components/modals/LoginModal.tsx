'use client';
import Modal from "./modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../forms/CustomButton";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";
const LoginModal= ()=>{
    const router = useRouter()
    const loginModal = useLoginModal()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] =useState<string[]>([]);
const submitLogin = async () =>{
    const formData={
        email:email,
        password:password
    }
    const response = await apiService.postWithOutToken('/api/auth/login/',  formData)

    if(response.access){
        //handleLogin
        handleLogin(response.user.pk, response.access, response.refresh)
        loginModal.close();
        router.push('/')
    }else{
        setErrors(response.non_field_errors)
    }
}

    const content= (   
        <>
             <h2 className="mb-6 text-2xl">Welcome to DjangoBNB, please Login</h2>
             <form action={submitLogin} className="space-y-4">
                <input onChange={(e) => setEmail(e.target.value)}type="email" className="w-full h-[54px] border px-4 border-gray-300 rounded-xl" placeholder="Your email address" />
                <input onChange={(e) => setPassword(e.target.value)} type="password" className="w-full h-[54px] border px-4 border-gray-300 rounded-xl" placeholder="Your password" />
                {errors.map((error, index) => {
                    return (
                        <div 
                            key={`error_${index}`}  // Aquí se usa el valor de index correctamente
                            className="p-5 bg-airbnb text-white rounded-xl opacity-60">
                            {error}
                        </div>
                    );
                })}
                <CustomButton
                 label="submit"
                 onclick={submitLogin}
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