import React, { useEffect } from "react";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../redux/actions";
import { idbPromise } from "../../utils/helpers";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { useLazyQuery } from "@apollo/client";
import { loadStripe } from "@stripe/stripe-js";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";

const Cart = () => {
  const selectCart = (state) => state.cart;
  const selectCartOpen = (state) => state.cartOpen;

  const cart = useSelector(selectCart);
  const cartOpen = useSelector(selectCartOpen);
  const dispatch = useDispatch();

  const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT); // data contains response from graphql query

  const toggleCart = () => {
    dispatch({ type: TOGGLE_CART });
  };

  // check if theres anything isn the state cart property on load
  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!cart.length) {
      getCart();
    }
  }, [cart.length, dispatch]);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  // add up the prices of everything saved in state.cart
  const calculateTotal = () => {
    let sum = 0;
    cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  };

  /* loop over items saved in state.cart and add their IDs to the new productIds
    array. This needs to be passed into the Query_Checkout hook but we cant 
    use useQuery since it is meant to run when a component is first rendered. 
    To accomplish this must use useLazyQuery hook. 
  */
  const submitCheckout = () => {
    const productIds = [];

    cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  };

  if (!cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>
        [close]
      </div>
      <h2>Shopping Cart</h2>
      {cart.length ? (
        <div>
          {cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>
            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

export default Cart;
