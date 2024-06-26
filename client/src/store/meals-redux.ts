import {createSlice} from '@reduxjs/toolkit';
import {cartActions} from './cart-redux';
import {Meal, Order, Customer} from '../types/types';


export type MealsStore = {
    meals: Meal[],
    orders: Order[],
    isLoading: boolean,
};


const initialState: MealsStore = {
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

export const postOrderData = ( items: Meal[], customer: Customer ) => {
    return async (dispatch: any) => {
        dispatch(cartActions.toggleFormLoading());
        const postData = async () => {
            
            const response = await fetch('http://a86d7620a7faf4f13b6105d7795aefb9-71443352.eu-west-1.elb.amazonaws.com/api/orders', {
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
    return async (dispatch: any) => {
        const fetchData = async () => {
            const response = await fetch('http://a86d7620a7faf4f13b6105d7795aefb9-71443352.eu-west-1.elb.amazonaws.com/api/meals');
            
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