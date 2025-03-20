import ReservationSideBar from "@/app/components/properties/ReservationSideBar"
import Image from "next/image"
import apiService from "@/app/services/apiService"
import { getUserId } from "@/app/lib/actions"

const PropertyDetailPage = async ({params}: {params:{id:string}})=>{
    if (!params?.id) {
        return <p>Error: No se encontró el ID de la propiedad.</p>;
    }
    console.log("Parámetros recibidos:", params);

    const  property = await apiService.get(`/api/properties/${params.id}`)
    const userId = await getUserId();
return (
    <main className=" max-w-[1500px] mx-auto px-6 pb-6">
        <div className="mb-4 w-full h-[64vh] overflow-hidden rounded-xl relative">
            <Image
             fill
             src="/beach.jpg"
             className="object-cover w-full h-full"
             alt="Beach Houser"
             />
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="py-6 pr-6 col-span-3">
             <h1 className="mb-4 text-4xl">{property.title}</h1>
             <span className="mb-6 block text-lg text-gray-600">
            {property.guests} guests - {property.bedrooms} bedrooms - {property.bathroom} bathrooms
             </span>
             <hr />
             <div className="py-6 flex items-center space-x-4">
                {property.landlord.avatar_url && (
                <Image 
                src={property.landlord.avatar_url} 
                alt="Profile Pic" 
                height={50}
                width={50}
                className="rounded-full"
                ></Image>)}
                <p><strong> {property.landlord.name} </strong></p>
             </div>
             <hr />
             <p className="mt-6 text-lg">
                {property.description}
             </p>
            </div>
            <ReservationSideBar
            property={property}
            userId={userId}
            />

        </div>
    </main>
)
}
export default PropertyDetailPage