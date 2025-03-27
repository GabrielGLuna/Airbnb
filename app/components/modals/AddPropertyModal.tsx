'use client';
import Image from "next/image";

import Modal from "./modal";
import { ChangeEvent, useState } from "react";
import SelectCountry, {SelectCountryValue} from "../forms/SelectCountry";
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import CustomButton from "../forms/CustomButton";
import Categories from "../addproperty/Categories";
import { stringify } from "querystring";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";
import { error } from "console";

const AddPropertyModal = () =>{

    //states
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors]= useState<string[]>([]);
    const [dataCategory, setDataCategory] = useState('');
    const [dataTitle, setDatatitle] = useState('');
    const [dataDescription, setDataDescription] = useState('');
    const [dataPrice, setDataPrice] = useState('')
    const [dataBathRooms, setDataBathRooms]= useState('')
    const [dataBedRooms, setDataBedRooms]= useState('')
    const [dataGuests, setDataGuests]= useState('')
    const [dataCountry, setDataCountry] =useState<SelectCountryValue>();
    const [dataImage, setDataImage] = useState<File |  null >(null);
    //
    const addPropertyModal = useAddPropertyModal();
    const router  = useRouter()
    //
    //set data
    const setCategory = (category:string) =>{
        setDataCategory(category)
    }
    const setImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const tmpImage = event.target.files[0];
    
            // 🚀 Verifica que sea un archivo de imagen válido
            if (!tmpImage.type.startsWith("image/")) {
                console.error("❌ El archivo seleccionado no es una imagen");
                return;
            }
    
            setDataImage(tmpImage);
    
            // 🚀 DEBUG: Muestra la información del archivo en consola
            console.log("Archivo seleccionado:", tmpImage);
            console.log("Tipo:", tmpImage.type);
            console.log("Tamaño (bytes):", tmpImage.size);
    
            // 🚀 Vista previa de la imagen
            const imageUrl = URL.createObjectURL(tmpImage);
            console.log("Vista previa de la imagen:", imageUrl);
        }
    };

    //submit

    const submitForm = async () => {
        console.log('Submit Form');
    
        if (dataCategory && dataTitle && dataDescription && dataPrice && dataCountry && dataImage) {
            const formData = new FormData();
            formData.append('category', dataCategory);
            formData.append('title', dataTitle);
            formData.append('description', dataDescription);
            formData.append('price_per_night', dataPrice);
            formData.append('bedrooms', dataBedRooms);
            formData.append('bathrooms', dataBathRooms);
            formData.append('guests', dataGuests);
            formData.append('country', dataCountry.label);
            formData.append('country_code', dataCountry.value);
            formData.append('image', dataImage);
    
            // 🔍 Debug: Verificar que FormData tiene los valores correctos
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }
    
            const response = await apiService.post('/api/properties/create/', formData);
    
            if (response.success) {
                console.log("SUCCESSSSSSSS");
                router.push('/?added=true');
                addPropertyModal.close();
            } else {
                console.log("Error", response);
                const tmpEroors: string[] = Object.values(response).map((error:any) =>{
                    return error
                })
                setErrors(tmpEroors)
            }
        }
    };
        

    //

    const content = (
        <>
        {currentStep == 1 ? (
        <>
        <h2 className="mb-6 text-2xl">Chose Category</h2>

            <Categories
            dataCategory={dataCategory}
            setCategory= {(category)=> setCategory(category)}
            />
         
            <CustomButton
            label="Next"
            onClick={() => setCurrentStep(2)}
            ></CustomButton></>

        ) : currentStep== 2 ?  (
            <>
            <h2 className="mb-6 text-2xl">Describe your place</h2>

            <div className="pt-3 pb-6 space-y-4">
                <div className="felx flex-col space-y-2">
                    <label >Title</label>
                    <input type="text" 
                    value={dataTitle}
                    onChange={(e) => setDatatitle(e.target.value)}
                    className="w-full p-4 border border-gray-600 rounded-xl"
                    />
                </div>
                <div className="felx flex-col space-y-2">
                    <label >Description</label>
                    <textarea 
                    value={dataDescription}
                    onChange={(e) => setDataDescription(e.target.value)}
                    className="w-full h-[200px] p-4 border border-gray-600 rounded-xl"
                    />
                </div>
            </div>

            <CustomButton
            label="Previous"
            className="mb-2 bg-black hover:bg-gray-800" 
            onClick={() => setCurrentStep(1)}
            ></CustomButton>

            <CustomButton
            label="Next"
            onClick={() => setCurrentStep(3)}
            ></CustomButton></>
            
        ): currentStep== 3 ?  (
            <>
            <h2 className="mb-6 text-2xl">Details</h2>
            <div className="pt-3 pb-6 space-y-4">
                <div className="felx flex-col space-y-2">
                    <label >Price Per Nigth</label>
                    <input type="number" 
                    value={dataPrice}
                    onChange={(e) => setDataPrice(e.target.value)}
                    className="w-full p-4 border border-gray-600 rounded-xl"
                    />
                </div>
                
            </div>

            <div className="pt-3 pb-6 space-y-4">
                <div className="felx flex-col space-y-2">
                    <label >Bathrooms</label>
                    <input type="number" 
                    value={dataBathRooms}
                    onChange={(e) => setDataBathRooms(e.target.value)}
                    className="w-full p-4 border border-gray-600 rounded-xl"
                    />
                </div>
                
            </div>

            <div className="pt-3 pb-6 space-y-4">
                <div className="felx flex-col space-y-2">
                    <label >BedRooms</label>
                    <input type="number" 
                    value={dataBedRooms}
                    onChange={(e) => setDataBedRooms(e.target.value)}
                    className="w-full p-4 border border-gray-600 rounded-xl"
                    />
                </div>
                
            </div>
            
            <div className="pt-3 pb-6 space-y-4">
                <div className="felx flex-col space-y-2">
                    <label >Maximus number of Guests</label>
                    <input type="number" 
                    value={dataGuests}
                    onChange={(e) => setDataGuests(e.target.value)}
                    className="w-full p-4 border border-gray-600 rounded-xl"
                    />
                </div>
                
            </div>

            <CustomButton
            label="Previous"
            className="mb-2 bg-black hover:bg-gray-800" 
            onClick={() => setCurrentStep(2)}
            ></CustomButton>

            <CustomButton
            label="Next"
            onClick={() => setCurrentStep(4)}
            ></CustomButton></>        
        ): currentStep== 4 ?  (
            <>

            <h2 className="mb-6 text-2xl">Location</h2>
            <div className="pt-3 pb-6 space-y-4">
               <SelectCountry
                    value={dataCountry}
                    onChange={(value) => setDataCountry(value as SelectCountryValue)}
               />
            </div>

            <CustomButton
            label="Previous"
            className="mb-2 bg-black hover:bg-gray-800" 
            onClick={() => setCurrentStep(3)}
            ></CustomButton>

            <CustomButton
            label="Next"
            onClick={() => setCurrentStep(5)}
            ></CustomButton>
            
            </>      
        ): currentStep== 5 ?  ((
            <>
            <h2 className="mb-6 text-2xl">Image</h2>
            <div className="pt-3 pb-6 space-y-4">
                <div className="py-4 px-6 bg-gray-600 text-white rounded-xl">
                    <input 
                    type="file" 
                    accept="image/*"
                    onChange={setImage}
                    />
                </div>
                {dataImage && (
                    <div className="w-[200px] h-[150px] relative">
                        <Image 
                        fill
                        alt="Uploaded Image"
                        src={URL.createObjectURL(dataImage)}
                        className="w-full h-full object-cover rounded-xl"
                        ></Image>
                    </div>
                )}
            </div>

            {errors.map((error, index) =>{
                return (
                    <div
                    key={index}
                    className="p-5 mb-4 bg-airbnb text-white rounded-xl opacity-80"
                    >
                        {error}
                    </div>
                )
            })}

            <CustomButton
            label="Previous"
            className="mb-2 bg-black hover:bg-gray-800" 
            onClick={() => setCurrentStep(4)}
            ></CustomButton>

            <CustomButton
            label="Submit"
            onClick={submitForm}
            ></CustomButton>
            </>
        )):(
            <p></p>
        )
    }
            
        </>
    )
    return(
        <>
        <Modal
        isOpen={addPropertyModal.isOpen}
        close={addPropertyModal.close}
        label='Add Property'
        content={(
            content
        )}
        ></Modal>
        </>
    )
}
export default  AddPropertyModal;
