import React, { useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import products from "../../products.json";
import Button from "../Button/Button";
import { useTelegram } from "../../hooks/useTelegram";

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    return (acc += item.price);
  }, 0);
};

const ProductList = () => {
  const { tg } = useTelegram();
  const [addedProducts, setAddedProducts] = useState([]);

  const onAdd = (product) => {
    const isAdded = addedProducts.find((item) => item.id === product.id);

    let newProd = [];
    if (!isAdded) {
      newProd = [...addedProducts, product];
    } else {
      newProd = addedProducts.filter((item) => item.id !== product.id);
    }

    setAddedProducts(newProd);

    if (newProd.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({ text: `Buy ${getTotalPrice(newProd)}` });
    }
  };

  return (
    <div>
      <ul className="list-product">
        {products.map((product) => (
          <li key={product.id}>
            <ProductItem product={product} onAdd={onAdd} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
