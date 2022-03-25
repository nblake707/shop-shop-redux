// used by productList component
export const UPDATE_PRODUCTS = {type: "UPDATE_PRODUCTS"};
// take categories retrieved by server and store in global state
export const UPDATE_CATEGORIES = {type: "UPDATE_CATEGORIES"};
/* select a category from the state created by update_categories
   and display products from the listed created from update_products action
*/
export const UPDATE_CURRENT_CATEGORY = {type: "UPDATE_CURRENT_CATEGORY"};

// shopping cart statements 
export const ADD_TO_CART = {type: 'ADD_TO_CART'};
export const ADD_MULTIPLE_TO_CART = {type: 'ADD_MULTIPLE_TO_CART'};
export const REMOVE_FROM_CART = {type: 'REMOVE_FROM_CART'};
export const UPDATE_CART_QUANTITY = {type: 'UPDATE_CART_QUANTITY'};
export const CLEAR_CART = {type: 'CLEAR_CART'};
export const TOGGLE_CART = {type: 'TOGGLE_CART'};