import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART,
} from "./actions";

// need to create initial state
const initialState = {
  products: [],
  cart: [],
  cartOpen: false,
  categories: [],
  currentCategory: '',
}


// this is currently in line with redux syntax? 
export default function reducer (state = initialState, action) {
  switch (action.type) {
    // if action type value matches, return new state object with updated products array
    case UPDATE_PRODUCTS:
      return { // should this be state.products instead of action.products? 
        ...state, // return new object w/ copy of state argument
        products: [...action.products], // set products key to a value of a new array
      };
    // if action type value matches, return new state object with updated categories array
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };
    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };
    case ADD_TO_CART:
      return {
        ...state, // preserves everyting else on state
        cartOpen: true,
        cart: [...state.cart, action.product],
      };
    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };
    case REMOVE_FROM_CART:
      // filter keeps the items that dont match the provided _id property
      let newState = state.cart.filter((product) => {
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0, // check length of array to set cartOpen to false when the array is empty
        cart: newState,
      };
    case UPDATE_CART_QUANTITY:
        return {
            ...state,
            cartOpen: true,
            cart: state.cart.map(product => {
                if (action._id === product._id) {
                    product.purchaseQuantity = action.purchaseQuantity;
                } 
                return product;
            })
        };
    case CLEAR_CART:
        return {
            ...state,
            cartOpen: false,
            cart: []
        };
    case TOGGLE_CART:
        return {
            ...state,
            cartOpen: !state.cartOpen
        };
    default:
      // if no match for above action type then return current state
      return state;
  }
};


