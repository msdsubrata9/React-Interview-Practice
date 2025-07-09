import React from "react";

async function getProducts() {
  const response = await fetch("https://dummyjson.com/products/");

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

async function ProductsServer() {
  const { products } = await getProducts();
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

export default ProductsServer;
