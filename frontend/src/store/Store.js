import {applyMiddleware, createStore, compose} from 'redux';
import HotelReducer from './reducers/HotelReducer'

import thunk from 'redux-thunk';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(HotelReducer, composeEnhancers(applyMiddleware(thunk)));


export default store;