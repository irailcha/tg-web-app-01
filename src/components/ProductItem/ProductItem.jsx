import React from "react";
import "./ProductItem.css";
import Button from "../Button/Button";

const ProductItem = ({ product, onAdd, onDelete, amount }) => {
  const { title, description, price, img } = product;
  const isDisabled = product.id.length === 0;

  const onAddHandler = () => {
    onAdd(product.productId);
  };

  const onDeleteHandler = () => {
    onDelete(product.productId);
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
        <div className="button-container">
          <Button
            className="product-button"
            onClick={onDeleteHandler}
            disabled={isDisabled}
          >
            -
          </Button>
          <Button className="product-button" onClick={onAddHandler}>
            +
          </Button>
        </div>
        <div className="amount-container">
          <span className="amount">{amount || 0}</span>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
