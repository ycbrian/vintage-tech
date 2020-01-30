import React from "react";
import { Switch, Route } from "react-router-dom";

import About from "./pages/About";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";

import Header from "./components/Header";
import ProductProvider from "./context/products";
import { CartProvider } from "./context/cart";

export default function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route
            path="/products/:id"
            children={<ProductDetails></ProductDetails>}
          ></Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </CartProvider>
    </ProductProvider>
  );
}
