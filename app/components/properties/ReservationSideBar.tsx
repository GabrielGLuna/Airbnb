'use client';

import { useState, useEffect } from "react";
import { Range } from "react-date-range";
import DatePicker from "../forms/Calendar";
import apiService from "@/app/services/apiService";
import useLoginModal from "@/app/hooks/useLoginModal";
import React from "react"
import { difference } from "next/dist/build/utils";
import { differenceInDays, eachDayOfInterval, format} from "date-fns";
import { el } from "date-fns/locale";
const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'

}

export type Property={
  id:string,
  guests: number,
  price_per_night: number,
}

interface ReservationSideBarProps{
  userId : string | null,
  property: Property
}

const ReservationSideBar:React.FC<ReservationSideBarProps> =({
  property,
  userId
})=>{
  const loginModal = useLoginModal();
  const [fee, setFee] = useState<number>(0);
  const [nights, setNights] = useState<number>(0);
  const [totalPrice, settotalPrice] = useState<number>(0);
  const [dateRange, setdateRange] = useState<Range>(initialDateRange);
  const [mainDate, setMainDate] = useState<Date>(new Date());
  const [guests, setGuests] = useState<string>('1');
  const guestsRange = Array.from({length: property.guests}, (_,index)=> index+1)
  const performBooking = async () => {
      if(userId){
        if(dateRange.startDate && dateRange.endDate){
        const formData = new FormData();
        formData.append('guests', guests)
        formData.append('start_date', format(dateRange.startDate, 'yyy-MM-dd') )
        formData.append('end_date', format(dateRange.endDate, 'yyy-MM-dd') )
        formData.append('number_of_nights', nights.toString());
        formData.append('total_price', totalPrice.toString());

        const response = await apiService.post(`/api/properties/${property.id}/book/`, formData);
        if(response.success){
          console.log('Booking Succes')
        }else{
          console.log('somtehihugs')
        }
      }
      }else{
        loginModal.open()
      }
  }

  const _setDateRange = (selection:any)=>{
    const newStartDate = new Date(selection.startDate)
    const newEndDate = new Date(selection.endDate)
    if(newEndDate<= newStartDate){
      newEndDate.setDate(newStartDate.getDate() + 1)
    }

    setdateRange({
      ...dateRange,
      startDate: newStartDate,
      endDate: newEndDate,
  })
  }

  useEffect(()=>{
      if (dateRange.startDate && dateRange.endDate){
        const dayCount = differenceInDays(
          dateRange.endDate,
          dateRange.startDate,
        );
        if(dayCount && property.price_per_night){
          const _fee = ((dayCount * property.price_per_night) / 100) * 5;
          setFee (_fee)
          settotalPrice((dayCount * property.price_per_night) + _fee);
          setNights(dayCount)
        }else{
          const _fee = (property.price_per_night/100) * 5
          setFee(_fee)
          settotalPrice(property.price_per_night+ _fee)
          setNights(1);
        } 
      }
  }, [dateRange])
    return(
        <aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl ">
          <h2 className="mb-5 text-2xl">{property.price_per_night} per night</h2>
          <DatePicker
            value={dateRange}
            onChange={(value)=> _setDateRange(value.selection)}
          />
          <div className="mb-6 p-3 border border-gray-400 rounded-xl">
            <label htmlFor="" className="mb-2 block font-bold text-xs">Guests</label>
            <select 
            value={guests}
            onChange={(e)=> setGuests(e.target.value)} 
            className="w-full ml-1 text-xm" 
            id="">
                {guestsRange.map(number=>(
                  <option key={number} value={number}>{number}</option>
                ))}
            </select>
          </div>
          <div 
          onClick={performBooking}
          className="w-full mb-6 text-center hover:bg-airbnb-dark text-white bg-airbnb rounded-xl"
          >
            Book
          </div>
          <div className="mb-4 flex justify-between align-center">
            <p>${property.price_per_night} x {nights} nights</p>
            <p>${property.price_per_night * nights} </p>
          </div>
          <div className="mb-4 flex justify-between align-center">
            <p>Django BNB free</p>
            <p>${fee}</p>
          </div>
          <hr />
          <div className="mb-4 flex justify-between align-center fotnn-bold">
            <p>Total</p>
            <p>${totalPrice}</p>
          </div>
        </aside>
    )
}
export default ReservationSideBar