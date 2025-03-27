'use client';

import apiService from "@/app/services/apiService";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem"
import useSearchModal from "@/app/hooks/useSearchModal";
import SearchModal from "../modals/SearchModal";
import { format } from "date-fns";

export type PropertyType = {
    id:string;
    title:string;
    price_per_night: number;
    image_url: string;
    is_favorite: boolean;
}
interface PropertyListProps{
    landlord_id?: string | null;
    favorites?: boolean | null
}

const PropertyList: React.FC<PropertyListProps> =({
    landlord_id,
    favorites
})=>{
    const params = useSearchParams()
    const searchModal = useSearchModal();
    const country = searchModal.query.country;
    const numGuests = searchModal.query.guests;
    const numBathrooms = searchModal.query.bathrooms;
    const numBedrooms = searchModal.query.bedrooms;
    const checkInDate = searchModal.query.checkIn;
    const checkOutDate = searchModal.query.checkOut;
    const category  =searchModal.query.category;
    console.log('shs',searchModal.query)
    console.log('number', numBedrooms)

    const [properties, setProperties] = useState<PropertyType[]>([]);

    const markFavorite = ( id:string, is_favorite:boolean)=>{
        const tmpProperties = properties.map((property:PropertyType)=>{
            if(property.id == id){
                property.is_favorite = is_favorite
                if (is_favorite){
                    console.log('added to list for favorite properties')
                } else{
                    console.log('removed from list')
                }
            }
            return property;
        })
        setProperties(tmpProperties)
    }

    const getProperties = async () =>{

        let url = '/api/properties/';

        if(landlord_id){
            url += `?landlord_id=${landlord_id}`
        }else if(favorites){
            url += `?is_favorites=true`
        } else{
            let urlQuery = '';

            if(country){
                urlQuery += '&country=' + country
            }
            if(numGuests){
                urlQuery += '&numGuests=' + numGuests
            }
            if(numBathrooms){
                urlQuery += '&numBathrooms=' + numBathrooms
            }
            if(numBedrooms){
                urlQuery += '&numBethrooms=' + numBedrooms
            }
            if(category){
                urlQuery += '&category=' + category
            }
            if(checkInDate){
                urlQuery += '&checkin' + format(checkInDate, `yyyy-MM-dd`)
            }
            if(checkOutDate){
                urlQuery += '&checkout' + format(checkOutDate, `yyyy-MM-dd`)
            }

            if(urlQuery.length){
                console.log('Query', urlQuery)
                urlQuery = '?'+urlQuery.substring(1)
                url += urlQuery;
            }
        }


        const tmpProperties = await apiService.get(url)

        setProperties(tmpProperties.data.map((property: PropertyType)=>{
            if(tmpProperties.favorites.includes(property.id)){
                property.is_favorite = true
            } else{
                property.is_favorite = false   
            }
            return property
        }))

    };
        
    useEffect(()=>{
            getProperties();
    }, [category, searchModal.query, params]);
    
    return(
        <>
            {properties.map((property) =>{
                return(
                    <PropertyListItem
                        key={property.id}
                        property = {property}
                        markFavorite={(is_favorite: any)=> markFavorite(property.id, is_favorite)}
                    />
                )
        })}
       
        
        </>
    )
}
export default PropertyList