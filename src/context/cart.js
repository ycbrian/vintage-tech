// cart context
import React, { useState, useEffect, useReducer } from "react";
// import localCart from "../utils/localCart";
import reducer from "./reducer";
import { REMOVE, INCREASE, DECREASE, ADDTOCART, CLEARCART } from "./action";
function getCartFromLocalStorage() {
  return localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
}

const CartContext = React.createContext();

function CartProvider({ children }) {
  // const [cart, setCart] = useState(getCartFromLocalStorage());
  const [cart, dispatch] = useReducer(reducer, getCartFromLocalStorage());

  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    // local storage
    localStorage.setItem("cart", JSON.stringify(cart));
    // cart items
    let newCartItems = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount);
    }, 0);
    setCartItems(newCartItems);
    // cart total
    let newTotal = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount * cartItem.price);
    }, 0);
    newTotal = parseFloat(newTotal.toFixed(2));
    setTotal(newTotal);
  }, [cart]);

  // remove item
  const removeItem = id => {
    dispatch({ type: REMOVE, payload: id });
    // let newCart = [...cart].filter(item => item.id !== id);
    // setCart(newCart);
  };
  const increaseAmount = id => {
    dispatch({ type: INCREASE, payload: id });
    // const newCart = [...cart].map(item => {
    //   return item.id === id
    //     ? { ...item, amount: item.amount + 1 }
    //     : { ...item };
    // });
    // setCart(newCart);
  };
  const decreaseAmount = (id, amount) => {
    if (amount === 1) {
      dispatch({ type: REMOVE, payload: id });
      // removeItem(id);
      return;
    } else {
      dispatch({ type: DECREASE, payload: id });
      // const newCart = [...cart].map(item => {
      //   return item.id === id
      //     ? { ...item, amount: item.amount - 1 }
      //     : { ...item };
      // });
      // setCart(newCart);
    }
  };
  const addToCart = product => {
    let item = [...cart].find(item => item.id === product.id);
    if (item) {
      dispatch({ type: INCREASE, payload: product.id });
    } else {
      dispatch({ type: ADDTOCART, payload: product });
    }
    // const { id, image, title, price } = product;
    // const item = [...cart].find(item => item.id === id);
    // if (item) {
    //   increaseAmount(id);
    //   return;
    // } else {
    //   const newItem = { id, image, title, price, amount: 1 };
    //   const newCart = [...cart, newItem];
    //   setCart(newCart);
    // }
  };

  const clearCart = () => {
    dispatch({ type: CLEARCART });
    // setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        cartItems,
        removeItem,
        increaseAmount,
        decreaseAmount,
        addToCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
