import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
// import { useStoreContext } from "../../utils/GlobalState";
import { idbPromise } from '../../utils/helpers';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { useSelector, useDispatch } from 'react-redux';


// using this component immediately calls the useStoreContext hook to retrieve current state from global state
function CategoryMenu() {
  const selectCategories = state => state.categories;
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  // query category data, store it into the global state object 
  // const [state, dispatch] = useStoreContext();
  // const { categories } = state; // destructure categories array out of global state
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES); // take this data and use it to set global state below

console.log(categoryData);
  // above process (useQuery) is asynchronous so need useEffect hook  - runs immediately on load or when state changes in the component
  // takes 2 args - function to run given certain condition & the condition
  useEffect(() => {
    // if categoryData exists or has changed from the response of useQuery, then run dispatch()
    if (categoryData) {
      // execute dispatch function with our action object - indicating the type of action and the data to set our state for categories 
      dispatch({ // sets category data to the global state
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      });

      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    });
  };
 

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
