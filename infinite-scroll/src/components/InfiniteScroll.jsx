/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function InfiniteScroll() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function fetchProducts() {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products/?limit=${page * 10}`
      );
      const data = await response.json();
      setProducts(data);
      setPage(page + 1);
    } catch (error) {
      console.error("Error Fetching Data: ", error);
    } finally {
      setLoading(false);
    }
  }

  const { products: allProducts } = products;

  useEffect(() => {
    fetchProducts();
  }, []);

  function throttle(callbackFn, delay) {
    let waiting = false;
    return function (...args) {
      if (!waiting) {
        callbackFn(...args);
        waiting = true;
      }

      setTimeout(() => {
        waiting = false;
      }, delay);
    };
  }

  const handleScroll = throttle(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 500 >
        document.documentElement.offsetHeight &&
      !loading &&
      products.limit < products.total
    ) {
      fetchProducts();
    }
  }, 500);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="products__container">
      <h1>Infinite Scrolling</h1>
      {allProducts?.length > 0 && (
        <div className="products">
          {allProducts.map((product) => {
            return (
              <div className="product__single" key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <span>{product.title}</span>
              </div>
            );
          })}
        </div>
      )}
      {loading && <h1>Loading...</h1>}
    </div>
  );
}

export default InfiniteScroll;
