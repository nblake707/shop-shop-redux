import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { UPDATE_PRODUCTS } from '../../redux/actions';
import ProductItem from '../ProductItem';
import { QUERY_PRODUCTS } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';
import { idbPromise } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../redux/store';

function ProductList() {

  const selectProducts = state => state.products;

  const dispatch = useDispatch();
  const currentCategory = useSelector((state) => state.currentCategory);
  const products = useSelector(selectProducts);


  const { loading, data } = useQuery(QUERY_PRODUCTS);


  // if we are offline and we run the useQuery hook we'll never be in a state of loading data
  useEffect(() => {
    // if there's data to be stored
    if (data) {
      // store it in the flobal state object
      store.dispatch({
        type: UPDATE_PRODUCTS, // let reducer function know that we want the update products action
        products: data.products // save the array of product data to our global store
      });
      console.log("Current Category: ", data.products);
      // take each product and save it to IndexedDB using the helper function
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
      // add else if to check if `loading` is undefined in `useQuery()`
    } else if (!loading) {
      // we are offline get all data from the products store
      idbPromise('products', 'get').then((products) => {
        // use retrieved data to set global sate for offline browsing
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products
        });
      });
    }
  }, [data, loading, dispatch]);

  const filterProducts = () => {
    if(!currentCategory) {
      return products;
    }
    return products.filter(product => product.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
              item={product}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
