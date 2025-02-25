import Image from "next/image"
const PropertyListItem =()=>{
    return(
        <div className="cursor-pointer p-1 ">
            <div className="relative overflow-hidden aspect-square rounded-xl">
                <Image 
                fill
                src="/beach.jpg" 
                sizes="(max-width: 768px):768px, (max-width:1200px): 768px, 768px" 
                alt="Beach" 
                className="hover:scale-110 object-cover transition h-full w-full"></Image>
            </div>

            <div className="mt-2">
                <p className="text-lg font-bold">Property name</p>
            </div>
            <div className="mt-2">
                <p className="text-sm text-gray-500"><strong>$1200</strong> per night</p>
            </div>

        </div>
    )
}
export default PropertyListItem