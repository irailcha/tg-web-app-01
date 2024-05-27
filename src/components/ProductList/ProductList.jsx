import React, { useCallback, useEffect, useState } from "react";

import axios from "axios";
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
  const [addedProducts, setAddedProducts] = useState([]);

  const onSendData = useCallback(() => {
    const data = {
      products: addedProducts,
      totalPrice: getTotalPrice(addedProducts),
      queryId,
    };
    tg.sendData(JSON.stringify(data));

    axios({
      method: "post",
      url: "https://tg-bot-01.onrender.com/",
      data: data,
    })
      .then((response) => {
        console.log("Data sent successfully:", response.data);
      })
      .catch((error) => {
        console.error("There was an error sending the data:", error);
      });
  }, [addedProducts, tg, queryId]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
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
