import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ProductCard from "./ProductCard";

const LIMIT = 10;

function Pagination() {
  const [currentPage, setCurrentPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [noOfPages, setNoOfPages] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  async function fetchProducts() {
    const data = await fetch(
      `https://dummyjson.com/products?limit=${LIMIT}&skip=${
        currentPage * LIMIT
      }&select=title,description,price,discountPercentage,thumbnail`
    );
    const json = await data.json();
    console.log(json);
    setProducts(json.products);
    setNoOfPages(Math.ceil(json.total / LIMIT));
  }

  return (
    <div>
      <div className="productsContainer">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      <div className="pageContainer">
        {currentPage > 0 && (
          <span
            onClick={() => setCurrentPage((currentPage) => currentPage - 1)}
          >
            Prev
          </span>
        )}
        {[...Array(noOfPages).keys()].map((pN) => (
          <span
            key={pN}
            className={pN === currentPage && "active"}
            onClick={() => setCurrentPage(pN)}
          >
            {pN + 1}
          </span>
        ))}
        {currentPage < noOfPages - 1 && (
          <span
            onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
          >
            Next
          </span>
        )}
      </div>
    </div>
  );
}

export default Pagination;
