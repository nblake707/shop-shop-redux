// import React, { createContext, useContext } from 'react';
// import { useProductReducer } from './reducers';

// const StoreContext = createContext();
// // every context object comes with a provider and consumer
// const { Provider } = StoreContext; // provider = react component to wrap application so state data passed into it is avaiable to all other components
// // consumer is our means of grabbing and using the data the provider holds

// // custom provider function - manage and update state using reducer
// const StoreProvider = ({ value = [], ...props }) => {  
//     // state = most up-to-date version of global state &&  dispatch = method we execute to update state
//     const [state, dispatch] = useProductReducer({ // instantiate initial global state
//         products: [],
//         cart: [],
//         cartOpen: false,
//         categories: [],
//         currentCategory: '',
//     });

//     // confirm it works
//     console.log(state);
//     // custom provider component - value makes it possible to pass in more data for state if we need to                                                                                                    
//     return <Provider value={[state, dispatch]} {...props} />; // ...props makes sure that the other components on the page will render
// };

// /*  
//  creates a custom react hook 
//  executing from within a component will return [state, dispatch] data managed by StoreProvider
// */
// const useStoreContext = () => {
//     return useContext(StoreContext); // returns [state, dispatch] data managed by StoreProvider
// }

// export { StoreProvider, useStoreContext }; 
// // useStoreContext grabs state from <Store Provider> component
// // returns dispatch method we can use to update state