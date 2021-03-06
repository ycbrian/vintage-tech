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
import Alert from "./components/Alert";
import PrivateRoute from "./components/PrivateRoute";
import ScrollButton from "./components/ScrollButton";

import ProductProvider from "./context/products";
import { CartProvider } from "./context/cart";
import { UserProvider } from "./context/user";

export default function App() {
  return (
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <Header />
          <Alert />
          <ScrollButton />
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
            <PrivateRoute path="/checkout" name="john" msg="hello">
              <Checkout />
            </PrivateRoute>
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
    </UserProvider>
  );
}
