import React from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { pluralize } from "../../utils/helpers";
import { useDispatch, useSelector } from 'react-redux'

const selectCart = state => state.cart;

function ProductItem(item) {
  
  const dispatch = useDispatch();

  const { image, name, _id, price, quantity } = item;
  console.log("Item: ", item);

  // const [state, dispatch] = useStoreContext();

  // const { cart } = state;

  const cart = useSelector(selectCart);
  

  const addToCart = () => {
    // find cart item with the matching id
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);

    // if there is a match (item is already in cart), call update with a new purchase quantity
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });

      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', {...item, purchaseQuantity: 1});
    }
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img alt={name} src={`/images/${image}`} />
        <p>{name}</p>
      </Link>
      <div>
        <div>
          {quantity} {pluralize("item", quantity)} in stock
        </div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
