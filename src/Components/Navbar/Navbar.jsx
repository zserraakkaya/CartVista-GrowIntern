// useState to keep track of active tab of categories
import React, { useState } from "react";
// link
import { Link } from "react-router-dom";
// css for Navbar.jsx
import "./Navbar.css";
// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faJedi,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
// all_products
import all_products from "../Assets/all_products";
import { useCart } from "../../Context/CartContext";

export const Navbar = ({ setActiveCategory }) => {
  const { cartItems } = useCart();

  const [activeCategory, setLocalActiveCategory] = useState("Heart");

  const uniqueCategories = [
    ...new Set(all_products.map((item) => item.category)),
  ];

  const handleCategoryClick = (category) => {
    setLocalActiveCategory(category);
    setActiveCategory(category);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <FontAwesomeIcon icon={faJedi} />
      </div>

      <div className="categories">
        <ul>
          <li>
            <a
              href="/"
              onClick={() => handleCategoryClick("Heart")}
              className={activeCategory === "Heart" ? "active" : ""}
            >
              <FontAwesomeIcon icon={faHeart} style={{ color: "#ffffff" }} />
              <hr className={activeCategory === "Heart" ? "active" : ""} />
            </a>
          </li>
          {uniqueCategories.map((category, index) => (
            <li key={index}>
              <Link
                to="/"
                onClick={() => handleCategoryClick(category)}
                className={activeCategory === category ? "active" : ""}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
                <hr className={activeCategory === category ? "active" : ""} />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="profile">
        <Link to="/signinsignup">
          <button>Sign In</button>
        </Link>
        <Link to="/cart" className="cart-icon">
          <FontAwesomeIcon icon={faCartShopping} />
          {cartItems.length > 0 && (
            <span className="cart-count">{cartItems.length}</span>
          )}
        </Link>
      </div>
    </div>
  );
};
