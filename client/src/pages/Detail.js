import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY, ADD_TO_CART, UPDATE_PRODUCTS } from "../utils/actions";
import { QUERY_PRODUCTS } from "../utils/queries";
import spinner from "../assets/spinner.gif";
import Cart from "../components/Cart";

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({}); // using this bc saving a single product to the global state object not super beneficial - only used in this component

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state; // destructure products out of state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);

    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct.id
    });
  };

  useEffect(() => {
    if (products.length) {
      // checks to see if there's data in our global states products array
      setCurrentProduct(products.find((product) => product._id === id)); // if so figure out which product is the right one
    } else if (data) {
      // condition exists for when we don't have any products in the global state object or if it's the user's first time loading the app (opened link sent by another)
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.productse,
      });
    }
  }, [products, data, dispatch, id]); // dependency array - hook's functionality is dependent on these to work

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{" "}
            <button onClick={addToCart}>Add to Cart</button>
            <button>Remove from Cart</button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
