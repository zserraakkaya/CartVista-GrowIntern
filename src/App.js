import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./Components/Navbar/Navbar";
import Cart from "./Pages/Cart";
import SignInSignUp from "./Pages/SignInSignUp";
import Item from "./Components/Item/Item";
import { SellProduct } from "./Pages/SellProduct";

function App() {
  const [activeCategory, setActiveCategory] = useState("Heart");

  return (
    <div>
      <Router>
        <Navbar setActiveCategory={setActiveCategory} />
        {/* <Item activeCategory={activeCategory} /> */}
        <Routes>
          <Route path="/" element={<Item activeCategory={activeCategory} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signinsignup" element={<SignInSignUp />} />
          <Route path="/sellproduct" element={<SellProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
