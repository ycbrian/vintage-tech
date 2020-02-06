// products context
import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../utils/URL";
import { featuredProduct, flattenProducts, paginate } from "../utils/helpers";
export const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    shipping: false,
    price: "all"
  });

  useEffect(() => {
    setLoading(true);
    axios.get(`${url}/products`).then(response => {
      const featured = flattenProducts(featuredProduct(response.data));
      const products = flattenProducts(response.data);
      setSorted(paginate(products));
      setProducts(products);
      setFeatured(featured);
      setLoading(false);
    });
    return () => {};
  }, []);
  const changePage = index => {
    setPage(index);
  };
  const updateFilters = e => {
    console.log(e);
  };
  return (
    <ProductContext.Provider
      value={{
        loading,
        products,
        featured,
        sorted,
        page,
        filters,
        changePage,
        updateFilters
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
