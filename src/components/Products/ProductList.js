import React from "react";
import Product from "./Product";

export default function ProductList({ title, products }) {
  const productArr = products.map(item => {
    return <Product key={item.id} {...item} />;
  });
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      <div className="products-center">{productArr}</div>
    </section>
  );
}
