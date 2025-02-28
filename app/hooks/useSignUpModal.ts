import {create} from "zustand"
interface SignUpModalStore{
    isOpen: boolean;
    open: ()=> void;
    close: ()=> void;
}

const useLoginModal = create<SignUpModalStore>((set)=> ({
    isOpen:false,
    open:()=> set({isOpen: true}),
    close:()=>set({isOpen:false})
}))

export default useLoginModal;