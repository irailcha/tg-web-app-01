import React, { useCallback, useEffect, useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import products from "../../products.json";
import { useTelegram } from "../../hooks/useTelegram";

const getTotalPrice = (items = []) => {
  const total = items.reduce((acc, item) => {
    return acc + item.price;
  }, 0);
  return parseFloat(total.toFixed(2));
};

const ProductList = () => {
  const { tg, queryId } = useTelegram();
  const [addedProducts, setAddedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [amount, setAmount] = useState(0);

  const onSendData = useCallback(() => {
    const data = {
      products: addedProducts,
      totalPrice,
      queryId,
    };

    fetch("https://tg-bot-01.onrender.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }, [addedProducts, totalPrice, queryId]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);

    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData, tg]);

  const updateMainButton = useCallback(
    (newProd) => {
      const totalPrice = getTotalPrice(newProd);
      setTotalPrice(totalPrice);

      if (totalPrice === 0) {
        tg.MainButton.hide();
      } else {
        tg.MainButton.show();
        tg.MainButton.setParams({ text: `Buy ${totalPrice}` });
      }
    },
    [tg]
  );

  const onAdd = (product) => {
    const newProd = [...addedProducts, product];
    setAmount((prevState) => prevState + 1);
    setAddedProducts(newProd);
    updateMainButton(newProd);
  };

  const onDelete = (productId) => {
    const newProd = addedProducts.filter((product) => product.id !== productId);
    setAmount((prevState) => (prevState > 0 ? prevState - 1 : 0));
    setAddedProducts(newProd);
    updateMainButton(newProd);
  };

  return (
    <div>
      <ul className="list-product">
        {products.map((product) => (
          <li className="product" key={product.id}>
            <ProductItem
              product={product}
              onAdd={onAdd}
              onDelete={onDelete}
              amount={amount}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
