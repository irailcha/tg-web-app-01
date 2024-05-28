import React from "react";
import "./ProductItem.css";
import Button from "../Button/Button";

const ProductItem = ({ product, onAdd }) => {
  const { title, description, price, img, amount } = product;

  const onAddHandler = () => {
    onAdd(product);
  };

  return (
    <>
      <div className="item">
        <img
          className="img"
          src={process.env.PUBLIC_URL + img}
          alt={title}
          width="50"
        />
        <h3 className="title">{title}</h3>
        <p className="description">{description}</p>
        <p className="price">Price:{price}</p>
        <Button onClick={onAddHandler}>Add to basket</Button>
        <span className="amount">{amount || 0}</span>
      </div>
    </>
  );
};

export default ProductItem;
