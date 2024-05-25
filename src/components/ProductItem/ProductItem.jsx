import React from "react";
import "./ProductItem.css";
import Button from "../Button/Button";

const ProductItem = ({ product }) => {
  const { title, description, price, img } = product;
  return (
    <div>
      <img src={img} alt={title} />
      <h3 className="title">{title}</h3>
      <p className="description">{description}</p>

      <Button className="price">Price:{price}</Button>
    </div>
  );
};

export default ProductItem;
