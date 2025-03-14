import Image from "next/image";
interface CategoriesProps{
    dataCategory: string
    setCategory: (category:string) => void;
}
const Categories:React.FC<CategoriesProps> =({
    dataCategory,
    setCategory
})=>{
    return(
        <>
        <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
                        <div
                        onClick={()=> setCategory('Beach')} 
                        className={`pb-4 flex flex-col items-center space-y-2 ${dataCategory == 'Beach' ? 'border-gray-800' : 'border-white'}  border-b-2 border-white opacity-60 hover:border-gray-300 hover:opacity-100`}>
                            <Image 
                            src="/alberca_category_icon.jpg" 
                            alt="Alberca_Category"
                            width={20}
                            height={20}></Image>
                            <span className="text-xs">Alberca</span>
                        </div>
                        <div 
                        onClick={()=> setCategory('Iconicos')} 
                        className={`pb-4 flex flex-col items-center space-y-2 ${dataCategory == 'Iconicos' ? 'border-gray-800' : 'border-white'}  border-b-2 border-white opacity-60 hover:border-gray-300 hover:opacity-100`}>                            <Image 
                            src="/iconicos_category_icon.webp" 
                            alt="Iconicos_Category"
                            width={20}
                            height={20}></Image>
                            <span className="text-xs">Iconicos</span>
                        </div>
                        <div
                        onClick={()=> setCategory('Frente_a_la_Playa')} 
                        className={`pb-4 flex flex-col items-center space-y-2 ${dataCategory == 'Frente_a_la_Playa' ? 'border-gray-800' : 'border-white'}  border-b-2 border-white opacity-60 hover:border-gray-300 hover:opacity-100`}>                            <Image 
                            src="/frente_playa_icon.jpg" 
                            alt="Frente_PLaya_Category"
                            width={20}
                            height={20}></Image>
                            <span className="text-xs">Frente a la playa</span>
                        </div>
                        <div 
                        onClick={()=> setCategory('Habitaciones')} 
                        className={`pb-4 flex flex-col items-center space-y-2 ${dataCategory == 'Habitaciones' ? 'border-gray-800' : 'border-white'}  border-b-2 border-white opacity-60 hover:border-gray-300 hover:opacity-100`}>                            <Image 
                            src="/habitaciones_icon.jpg" 
                            alt="Habitaciones_Category"
                            width={20}
                            height={20}></Image>
                            <span className="text-xs">Habitaciones</span>
                        </div>
            
                    </div>
        
        </>
    )
}
export  default Categories