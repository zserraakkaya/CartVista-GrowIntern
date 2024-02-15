import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faJedi,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContext";

import "./Navbar.css";

export const Navbar = ({ setActiveCategory }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const { cartItems } = useCart();
  const { isAuthenticated, signOut } = useAuth();
  const [activeCategory, setLocalActiveCategory] = useState("AllProducts");

  const uniqueCategories = [
    ...new Set(products.map((item) => item.category.toLowerCase())),
  ];

  const handleCategoryClick = (category) => {
    if (category === "Favorites") {
      setActiveCategory(category);
    }
    setLocalActiveCategory(category);
    setActiveCategory(category);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <h1 id="h1">CARTVISTA</h1>
      </div>

      <div className="categories">
        <ul>
          <li>
            <Link
              to="/"
              onClick={() => handleCategoryClick("AllProducts")}
              className={activeCategory === "AllProducts" ? "active" : ""}
            >
              All
              <hr
                className={activeCategory === "AllProducts" ? "active" : ""}
              />
            </Link>
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
          {isAuthenticated ? (
            <>
              <li>
                <Link
                  to="/favorites"
                  id="favorites"
                  onClick={() => handleCategoryClick("Favorites")}
                  className={activeCategory === "Favorites" ? "active" : ""}
                >
                  Favorites
                  <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
                  <hr
                    className={activeCategory === "Favorites" ? "active" : ""}
                  />
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
      </div>

      <div className="profile">
        {isAuthenticated ? (
          <>
            <button onClick={signOut}>Sign Out</button>
            <Link to="/sellproduct">
              <button>Sell Now!</button>
            </Link>
          </>
        ) : (
          <Link to="/signinsignup">
            <button>Sign In</button>
          </Link>
        )}
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
