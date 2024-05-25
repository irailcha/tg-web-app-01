import React from "react";
import ProductItem from "../ProductItem/ProductItem";
import products from "../../products.json";

const ProductList = () => {
  return (
    <div>
      <ul className="listItem">
        {products.map((product) => (
          <li className="item" key={product.id}>
            <ProductItem product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
