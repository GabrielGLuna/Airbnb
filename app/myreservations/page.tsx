import Link from "next/link"
import Image from "next/image"
import apiService from "../services/apiService"
const MyReservationsPage= async()=>{
    const reservations = await apiService.get('/api/auth/myreservations/')
   
    {console.log("API Response:", reservations)}
    return (
        <main className="max-w-[1500px mx-auto px-6 pb-6" >
                <h1 className="my-6 mb-6 text-2xl">My Reservations</h1>
                <div className="space-y-4">
                    {reservations.map((reservation:any)=>{
                     return(
                        <div
                        key={reservation.id} 
                        className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300">
                        <div className="col-span-1">
                            <div className="relative overflow-hidden aspect-square rounded-xl">
                                <Image   
                                fill
                                src={reservation.property.image_url.replace(/^https:\/\//, "http://")}
                                alt="Beachhnshd"
                                className="hover:scale-110 object-cover transition h-full w-full"
                                ></Image>
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-3 ">
                            <h2 className="mb-4 text-xl">{reservation.property.title}</h2>
                            <p className="mb-2"><strong>Check in date: </strong> {reservation.start_date} </p>
                            <p className="mb-2"><strong>Check out date: </strong> {reservation.end_date} </p>                            
                            <p className="mb-2"><strong>Number of nights: </strong> {reservation.number_of_nights} </p>
                            <p className="mb-2"><strong>Total Price: </strong> {reservation.total_price} </p>
                            <Link
                                href={`/properties/${reservation.property.id}`}                            
                                className=" mt-5 cursor-pointer py-4 px-6 bg-airbnb rounded-xl inline-block"> 
                                Go to property
                            </Link>                             
                        </div>
                    </div>)
                    })}
                </div>
        </main>
    )}

export default MyReservationsPage