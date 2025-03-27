'use client'
import useLoginModal from "@/app/hooks/useLoginModal"
import { useRouter } from "next/navigation"
import apiService from "@/app/services/apiService"
import { use } from "react"

interface contactButtonProps{
    userId: string | null
    landlordId: string
}

const ContactButton: React.FC<contactButtonProps> = ({
    userId,
    landlordId
}) =>{
    const loginModal = useLoginModal();
    const router = useRouter();

    const startConversation = async()=>{
        if(userId){
            const conversation = await apiService.get(`/api/chat/start/${landlordId}/`)
            if(conversation.conversation_id){
                router.push(`/inbox/${conversation.conversation_id}`)
            }
        }else{
            loginModal.open()
        }
    }
    return(
         <div 
         onClick={startConversation}
         className="hover:bg-airbnb-dark transition cursor-pointer py-4 px-6 bg-airbnb text-white rounded-xl">
            Contact
         </div>
    )
}
export default ContactButton