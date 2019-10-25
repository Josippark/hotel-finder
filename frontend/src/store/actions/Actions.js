import {FETCHING_HOTELS,FETCHING_HOTELS_SUCCESS,FETCHING_HOTELS_ERROR, SLIDE_CAROUSEL_NEXT, SLIDE_CAROUSEL_PREV} from './ActionType'
import axios from 'axios';


export const fetchHotels = (searchParam) =>{
    return dispatch=>{
        dispatch(fetchingHotels());
        window.scrollTo(0, window.innerHeight);
        axios.get('http://localhost:3001/api/v1/hotel/'+searchParam)
        .then(res=>{
            
            dispatch(fetchingHotelsSuccess(res.data))
        })
        .catch(e=>{
            dispatch(fetchingHotelsError(e))
        })

        
    }
}
export const fetchingHotels = () =>{
    return {
        type:FETCHING_HOTELS
    }
}
export const fetchingHotelsSuccess = (hotels) =>{
    console.log(hotels)
    return {
        type:FETCHING_HOTELS_SUCCESS,
        hotels:hotels
    }
}
export const fetchingHotelsError = (error) =>{
    return {
        type:FETCHING_HOTELS_ERROR,
        error:error
    }
}

export const slideCarouselNext = () => {
    return {
        type:SLIDE_CAROUSEL_NEXT
    }
}

export const slideCarouselPrev = () => {
    return {
        type:SLIDE_CAROUSEL_PREV
    }
}