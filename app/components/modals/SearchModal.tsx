'use client'
import Modal from "./modal";
import DatePicker from "../forms/Calendar";
import useSearchModal from "@/app/hooks/useSearchModal";
import SelectCountry, {SelectCountryValue} from "../forms/SelectCountry";
import { useState } from "react";
import { Range } from "react-date-range";
import CustomButton from "../forms/CustomButton";

//


//
const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

const SearchModal = () =>{
    let content = (<> </>);
    const searchModal = useSearchModal();
    const [numGuests,setNumGuests]=useState<string>('1')
    const [numBedrooms,setBedrooms]=useState<string>('0')
    const [country, setCountry]= useState<SelectCountryValue>();
    const [numBathrooms,setBathooms]=useState<string>('0')
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)

    const closeAndSearch = ()=>{
        searchModal.close()
    }
    //set Date Range
    const _setDateRange = (selection: Range)=>{
         if (searchModal.step === 'checkin'){
            searchModal.open('checkout')
         }else if(searchModal.step === 'checkout'){
            searchModal.open('details')
         }

         setDateRange(selection);
    }
    //
    //Contents
    const contentLocation = (
        <>
            <h2 className="mb-6 text-2xl">Where do you want to go ? </h2>

            <SelectCountry
            value={country}
            onChange={(value)=> setCountry(value as SelectCountryValue)}
            />
            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="Check in Date ->"
                    onClick={()=> searchModal.open('checkin')}
                />
            </div>
        </>
    )

    const contentCheckIn =(
        <>
            <h2 className="mb-6 text-2xl">When do you want to check in ? </h2>
            <DatePicker
                value={dateRange}
                onChange={(value)=> _setDateRange(value.selection)}
            />
            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label=" <- Location"
                    onClick={()=> searchModal.open('location')}
                />
            </div>
            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="Check out date ->"
                    onClick={()=> searchModal.open('checkout')}
                />
            </div>
        </>
    )
    const contentCheckOut =(
        <>
            <h2 className="mb-6 text-2xl">When do you want to check out ? </h2>
            <DatePicker
                value={dateRange}
                onChange={(value)=> _setDateRange(value.selection)}
            />
            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label=" <- Chen in date"
                    onClick={()=> searchModal.open('checkin')}
                />
            </div>
            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="Details ->"
                    onClick={()=> searchModal.open('details')}
                />
            </div>
        </>
    )
    const contentDetails =(
        <>
            <h2 className="mb-6 text-2xl">Details</h2>
            <div className="space-y-4">
                <div className="space-y-4">
                    <label> Number of guests</label>
                    <input 
                    type="number"
                    min="1" 
                    value={numGuests}
                    placeholder="Number of guests" 
                    className="w-full h-14 px-4 border border-x-gray-300 rounded-xl" 
                    onChange={(e) => setNumGuests(e.target.value)}/>
                </div>
                <div className="space-y-4">
                    <label> Number of bedrooms</label>
                    <input 
                    type="number"
                    min="1" 
                    value={numBedrooms}
                    placeholder="Number of bedrooms" 
                    className="w-full h-14 px-4 border border-x-gray-300 rounded-xl" 
                    onChange={(e) => setBedrooms(e.target.value)}/>
                </div>
                <div className="space-y-4">
                    <label> Number of bathrooms</label>
                    <input 
                    type="number"
                    min="1" 
                    value={numBathrooms}
                    placeholder="Number of bathrooms" 
                    className="w-full h-14 px-4 border border-x-gray-300 rounded-xl" 
                    onChange={(e) => setBathooms(e.target.value)}/>
                </div>

            </div>

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label=" <- Chen in date"
                    onClick={()=> searchModal.open('checkout')}
                />
            </div>
            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="Search"
                    onClick={closeAndSearch}
                />
            </div>
        </>
    )

    if(searchModal.step == 'location'){
        content = contentLocation;
    } else if(searchModal.step == 'checkin'){
        content = contentCheckIn;
    }
     else if(searchModal.step == 'checkout'){
        content = contentCheckOut;
    }
     else if(searchModal.step == 'details'){
        content = contentDetails;
    }
    return (
        <Modal 
            isOpen={searchModal.isOpen}
            close={searchModal.close}
            label="Search"
            content={content}
        />
    )
}

export default SearchModal