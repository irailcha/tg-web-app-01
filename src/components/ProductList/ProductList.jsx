import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
  }, [addedProducts]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    navigate("/form");
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData, tg]);

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
          <li className="product" key={product.id}>
            <ProductItem product={product} onAdd={onAdd} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
