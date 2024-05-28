import React, { useCallback, useEffect, useState } from "react";

import ProductItem from "../ProductItem/ProductItem";
import products from "../../products.json";
import { useTelegram } from "../../hooks/useTelegram";

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    return (acc += item.price);
  }, 0);
};

const ProductList = () => {
  const { tg, queryId } = useTelegram();
  const [amount, setAmount] = useState(0);
  const [addedProducts, setAddedProducts] = useState([]);

  const onSendData = useCallback(() => {
    const data = {
      products: addedProducts,
      totalPrice: getTotalPrice(addedProducts),
      queryId,
    };

    fetch("https://tg-bot-01.onrender.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }, [addedProducts, queryId]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);

    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData, tg]);

  const onAdd = (product) => {
    let newProd = [];
    newProd = [...addedProducts, product];
    setAmount((prevState) => prevState + 1);
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
          <li className="product" key={product.id}>
            <ProductItem product={product} onAdd={onAdd} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
