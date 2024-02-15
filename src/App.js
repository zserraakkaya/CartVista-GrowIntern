// useState for activeCategory
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// css
import "./App.css";
// navbar component
import { Navbar } from "./Components/Navbar/Navbar";
// item component
import Item from "./Components/Item/Item";
// pages - cart, signinsignup, sellproduct, favorites
import Cart from "./Pages/Cart";
import SignInSignUp from "./Pages/SignInSignUp";
import SellProduct from "./Pages/SellProduct";
import { Favorites } from "./Pages/Favorites";

function App() {
  // first activeCategory is AllProducts
  const [activeCategory, setActiveCategory] = useState("AllProducts");

  return (
    <div>
      <Router>
        <Navbar setActiveCategory={setActiveCategory} />
        <Routes>
          <Route path="/" element={<Item activeCategory={activeCategory} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signinsignup" element={<SignInSignUp />} />
          <Route path="/sellproduct" element={<SellProduct />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
