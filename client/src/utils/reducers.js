import { useReducer } from 'react';
import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
  } from './actions';

export const reducer = (state, action) => {
    switch(action.type) {
        // if action type value matches, return new state object with updated products array 
        case UPDATE_PRODUCTS:
            return {
                ...state, // return new object w/ copy of state argument
                products: [...action.products], // set products key to a value of a new array
            };
        // if action type value matches, return new state object with updated categories array    
        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories]
            }
        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
            }
        case ADD_TO_CART:
            return {
                ...state, // preserves everyting else on state
                cartOpen: true,
                cart: [...state.cart, action.product]
            }
        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.products],
            }
        default:
            // if no match for above action type then return current state
            return state;   
    }
}

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
}