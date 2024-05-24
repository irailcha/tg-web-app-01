import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Header/Header";
import { useTelegram } from "../hooks/useTelegram";
import ProductList from "./ProductList/ProductList";
import Form from "./Form/Form";

const App = () => {
  const { onToggleButton, tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<ProductList />} />
        <Route path={"form"} element={<Form />} />
      </Routes>
    </div>
  );
};

export default App;
