"use client";
import React, { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products/")
      .then((response) => response.json())
      .then((data) => setProducts(data.products));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Products</h1>
      {products.length > 0 && (
        <div>
          {products.map((product) => {
            return <div key={product.id}>{product.title}</div>;
          })}
        </div>
      )}
    </div>
  );
}

export default Products;
