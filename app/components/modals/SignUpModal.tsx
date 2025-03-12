'use client';
import Modal from "./modal";
import { useState } from "react"; 
import { useRouter } from "next/navigation";
import CustomButton from "../forms/CustomButton";
import useSignUpModal from "@/app/hooks/useSignUpModal";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";

const SignUpModal= ()=>{
    //variables
    const router = useRouter();
    const signUpmodal = useSignUpModal();
    const [email , setEmail]= useState('');
    const [password1, setPasword1]= useState('');
    const [password2, setPasword2]= useState('');
    const [errors, setErrors] =useState<string[]>([]);

    //submit function
    const submitSignUp = async ()=>{
        const formData = {
            email: email,
            password1:password1,
            password2:password2,
        }
        const response = await apiService.post('/api/auth/register/',  formData)
        if(response.access){
            //handleLogin
            handleLogin(response.user.pk, response.access, response.refresh)
            signUpmodal.close();
            router.push('/')
        }else{
            const tmpErrors: string[] = Object.values(response).map((error:any)=>{
                return error
            })
            setErrors(tmpErrors);
        }
    }
    
    const content= (   
        <>
             <h2 className="mb-6 text-2xl">Welcome to DjangoBNB, please Login</h2>
             <form 
                onSubmit={submitSignUp}
                className="space-y-4">
                <input onChange={(e) => setEmail(e.target.value)} type="email" className="w-full h-[54px] border px-4 border-gray-300 rounded-xl" placeholder="Your email address" />
                <input onChange={(e) => setPasword1(e.target.value)} type="password" className="w-full h-[54px] border px-4 border-gray-300 rounded-xl" placeholder="Your password" />
                <input onChange={(e) => setPasword2(e.target.value)} type="password" className="w-full h-[54px] border px-4 border-gray-300 rounded-xl" placeholder="Repeat your password" />
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
                 onclick={submitSignUp}
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