import ContactButton from "@/app/components/Buttons/ContactButton"
import PropertyList from "@/app/components/properties/PropertyList"
import apiService from "@/app/services/apiService"
import Image from "next/image"
import { getUserId } from "@/app/lib/actions"
const LandLordDetailPage = async ({params}: {params:{ id: string }}) =>{
    const landlord = await apiService.get(`/api/auth/${params.id}`)
    const userId = await getUserId();
    return (
        <main className=" max-w-[1500px] mx-auto px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <aside className="col-span-1 mb-4">
                    <div className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-xl">
                    <Image 
                        src={landlord.avatar_url || "/default-avatar.png"} // Imagen por defecto si está vacío
                        width={200}
                        height={200}
                        alt={landlord.name || "Landlord"}
                        className="rounded-full"
                    />
                        <h1 className="mt-6 text-2xl">{landlord.name}</h1>
                        {userId != params.id && (
                            <ContactButton
                                userId={userId}
                                landlordId={params.id}
                            />
                        )}
                    </div>
                </aside>
                <div className="col-span-1 md:col-span-3 pl-0 md_pl-6">
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3  gap-6">
                    <PropertyList
                        landlord_id={params.id}
                    />
                    </div>
                </div>
            </div>
        </main>)}
export default LandLordDetailPage