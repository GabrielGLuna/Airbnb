import Image from "next/image"
const MyReservationsPage=()=>{
    return (
        <main className="max-w-[1500px mx-auto px-6 pb-6" >
                <h1 className="my-6 mb-6 text-2xl">My Reservations</h1>
           
                <div className="mt-4">
                    <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300">
                        <div className="col-span-1">
                            <div className="relative overflow-hidden aspect-square rounded-xl">
                                <Image   
                                fill
                                src="/beach.jpg"
                                alt="Beachhnshd"
                                className="hover:scale-110 object-cover transition h-full w-full"
                                ></Image>
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-3 ">
                            <h2 className="mb-4 text-xl">Property Name</h2>
                            <p className="mb-2"><strong>Check in date:</strong> 14/02/2024</p>
                            <p className="mb-2"><strong>Check out date:</strong> 14/02/2024</p>
                            
                            <p className="mb-2"><strong>Number of nights:</strong> 2</p>
                            <p className="mb-2"><strong>Total Price:</strong> $200</p>
                            <div className=" mt-5 cursor-pointer py-4 px-6 bg-airbnb rounded-xl inline-block"> Go to property</div>
                             
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300">
                        <div className="col-span-1">
                            <div className="relative overflow-hidden aspect-square rounded-xl">
                                <Image   
                                fill
                                src="/beach.jpg"
                                alt="Beachhnshd"
                                className="hover:scale-110 object-cover transition h-full w-full"
                                ></Image>
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-3 space-y-2">
                            <h2 className="mb-4 text-xl">Property Name</h2>
                            <p><strong>Check in date:</strong> 14/02/2024</p>
                            <p><strong>Check out date:</strong> 14/02/2024</p>
                            
                            <p><strong>Number of nights:</strong> 2</p>
                            <p><strong>Total Price:</strong> $200</p>
                            <div className="cursor-pointer py-4"></div>

                        </div>
                    </div>
                </div>
                
        </main>
    )}

export default MyReservationsPage