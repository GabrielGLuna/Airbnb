'use client'
import { useEffect, useState } from "react"
import Image from "next/image"
import useSearchModal, {SearchQuery} from "@/app/hooks/useSearchModal"

const Categories = () =>{
    const searchModal = useSearchModal()
    useEffect(() => {
        console.log("Query actualizado:", searchModal.query);
    }, [searchModal.query]);
    const [category, setCategory] = useState('');

    const _setCategory = (_category: string) =>{
        setCategory(_category);
        const query: SearchQuery = {
            country: searchModal.query.country,
            checkIn:searchModal.query.checkIn,
            checkOut:searchModal.query.checkOut,
            guests: searchModal.query.guests,
            bathrooms:searchModal.query.bathrooms,
            bedrooms:searchModal.query.bedrooms,
            category: _category
        }
        searchModal.setQuery(query)
    }
    return(
        <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
            <div 
            onClick={()=> _setCategory('')}
            className={`pb-4 flex flex-col items-center ${category == '' ? 'border-black':'border-white'} space-y-2 border-b-2 border-white opacity-60 hover:border-gray-300 hover:opacity-100`}>
                <Image 
                src="/alberca_category_icon.jpg" 
                alt="Alberca_Category"
                width={20}
                height={20}></Image>
                <span className="text-xs">All</span>
            </div>
            <div 
            onClick={()=> _setCategory('Alberca')}
            className={`pb-4 flex flex-col items-center ${category == 'Alberca' ? 'border-black':'border-white'} space-y-2 border-b-2 border-white opacity-60 hover:border-gray-300 hover:opacity-100`}>
                <Image 
                src="/alberca_category_icon.jpg" 
                alt="Alberca_Category"
                width={20}
                height={20}></Image>
                <span className="text-xs">Alberca</span>
            </div>
            <div
                onClick={()=> _setCategory('Iconicos')} 
                className={`pb-4 flex flex-col items-center ${category == 'Iconicos' ? 'border-black':'border-white'} space-y-2 border-b-2 border-white opacity-60 hover:border-gray-300 hover:opacity-100`}>
                <Image 
                src="/iconicos_category_icon.webp" 
                alt="Iconicos_Category"
                width={20}
                height={20}></Image>
                <span className="text-xs">Iconicos</span>
            </div>
            <div 
            onClick={()=> _setCategory('beach_house')}
            className={`pb-4 flex flex-col items-center ${category == 'beach_house' ? 'border-black':'border-white'} space-y-2 border-b-2 border-white opacity-60 hover:border-gray-300 hover:opacity-100`}>
                <Image 
                src="/frente_playa_icon.jpg" 
                alt="Frente_PLaya_Category"
                width={20}
                height={20}></Image>
                <span className="text-xs">Frente a la playa</span>
            </div>
            <div 
            onClick={()=> _setCategory('Habitaciones')}
            className={`pb-4 flex flex-col items-center ${category == 'Habitaciones' ? 'border-black':'border-white'} space-y-2 border-b-2 border-white opacity-60 hover:border-gray-300 hover:opacity-100`}>
                <Image 
                src="/habitaciones_icon.jpg" 
                alt="Habitaciones_Category"
                width={20}
                height={20}></Image>
                <span className="text-xs">Habitaciones</span>
            </div>

        </div>
    )
}
export default Categories