import { FETCHING_HOTELS, FETCHING_HOTELS_SUCCESS, FETCHING_HOTELS_ERROR, SLIDE_CAROUSEL_NEXT,SLIDE_CAROUSEL_PREV } from '../actions/ActionType'

const initialState = {
    hotels: [],
    isLoading: false,
    error: null,
    carouselIndex: 0,
    searchParam: ''
}


const HotelReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_HOTELS:
            return {
                ...state,
                isLoading: true
            }
        case FETCHING_HOTELS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                hotels: action.hotels
            }
        case FETCHING_HOTELS_ERROR:
            return {
                ...state,
                isLoading: false,
                hotels: [],
                error: action.error
            }
        case SLIDE_CAROUSEL_NEXT:
            return {
                ...state,
                carouselIndex: state.carouselIndex+1
            }
        case SLIDE_CAROUSEL_PREV:
            return {
                ...state,
                carouselIndex: state.carouselIndex-1
            }
        default:
            return state;
    }
}
export default HotelReducer;