import React from "react";

const ProductCard = ({
  title,
  description,
  price,
  discountPercentage,
  thumbnail,
}) => {
  return (
    <div className="singleProductContainer">
      <img src={thumbnail} alt={title} />
      <h1>{title}</h1>
      <h2>
        Rs. {price} - discount of {discountPercentage}%
      </h2>
      <p>{description}</p>
    </div>
  );
};

export default ProductCard;
