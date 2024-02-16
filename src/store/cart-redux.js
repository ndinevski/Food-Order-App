import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    cart: [],
    totalQuantity: 0,
    totalPrice: 0,
    isOpen: false,
    formIsOpen: false,
    formIsLoading: false,
};

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        resetCart: () => initialState,
        addMeal: (state, action) => {
            const existingMeal = state.cart.find((meal)=> meal.id === action.payload.id);
            
            if(!existingMeal){
                state.cart.push({
                    ...action.payload,
                    quantity: 1,
                });
            }else{
                existingMeal.quantity++;
            }
            state.totalPrice += Number(action.payload.price);
            state.totalQuantity++;
        },
        removeMeal: (state, action) => {
            const existingMeal = state.cart.find((meal)=> meal.id === action.payload.id);

            if(existingMeal.quantity > 1){
                existingMeal.quantity--;
            }else{
                state.cart = state.cart.filter((meal)=> meal.id !== action.payload.id);
            }

            state.totalQuantity--;
            state.totalPrice -= Number(action.payload.price);
        },
        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        },
        toggleForm: (state) => {
            state.formIsOpen = !state.formIsOpen;
        },
        toggleFormLoading: (state) => {
            state.formIsLoading = !state.formIsLoading;
        }
    },
});


  export const cartActions = cartSlice.actions;

export default cartSlice.reducer;