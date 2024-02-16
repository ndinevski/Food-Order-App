import {createSlice} from '@reduxjs/toolkit';
import {cartActions} from './cart-redux';

const initialState = {
    meals: [],
    orders: [],
    isLoading: false,
  };
  
const mealsSlice = createSlice({
    name:'meals',
    initialState,
    reducers: {
        addMeals: (state, action) => {
            state.meals = action.payload;
        },
    },
});

export const postOrderData = ( items, customer ) => {
    return async (dispatch) => {
        dispatch(cartActions.toggleFormLoading());
        const postData = async () => {
            
            const response = await fetch('http://127.0.0.1:3000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    order : {
                        items: items,
                        customer: customer
                    }
                }),
            });

            if (!response.ok){
                throw new Error(response.statusText);
            }
            const data = await response.json();

            return data;
        };

        try {
            const data = await postData();
            dispatch(cartActions.resetCart());
        } catch (error){
        }
    };
};

export const fetchMealData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('http://127.0.0.1:3000/meals');
            
            if (!response.ok){
                throw new Error(response.statusText);
            }
            
            const data = await response.json();
            return data;
        };

        try {
            const data = await fetchData();
            dispatch(mealsSlice.actions.addMeals(data));
        } catch (error){
        }
    };
};
  
  export const mealsActions = mealsSlice.actions;
  
  export default mealsSlice.reducer;    