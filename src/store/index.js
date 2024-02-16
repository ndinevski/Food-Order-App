import {configureStore} from '@reduxjs/toolkit';
import mealsReducer from './meals-redux';
import cartReducer from './cart-redux';


const store = configureStore({
    reducer: {
        meals : mealsReducer,
        cart : cartReducer,
   },
});

export default store;