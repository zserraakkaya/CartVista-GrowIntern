import React, { useState } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faJedi,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
  // active category
  const [activeCategory, setActiveCategory] = useState("Heart");

  const handleCategoryClick = (category) => {
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
              href="#"
              onClick={() => handleCategoryClick("Heart")}
              className={activeCategory === "Heart" ? "active" : ""}
            >
              <FontAwesomeIcon icon={faHeart} style={{ color: "#ffffff" }} />
              <hr className={activeCategory === "Sweater" ? "active" : ""} />
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleCategoryClick("Sweater")}
              className={activeCategory === "Sweater" ? "active" : ""}
            >
              Sweater
              <hr className={activeCategory === "Sweater" ? "active" : ""} />
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleCategoryClick("Necklace")}
              className={activeCategory === "Necklace" ? "active" : ""}
            >
              Necklace
              <hr className={activeCategory === "Necklace" ? "active" : ""} />
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleCategoryClick("Coat")}
              className={activeCategory === "Coat" ? "active" : ""}
            >
              Coat
              <hr className={activeCategory === "Coat" ? "active" : ""} />
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleCategoryClick("Shoes")}
              className={activeCategory === "Shoes" ? "active" : ""}
            >
              Shoes
              <hr className={activeCategory === "Shoes" ? "active" : ""} />
            </a>
          </li>
        </ul>
      </div>

      <div className="profile">
        <button>Sign In</button>
        <FontAwesomeIcon icon={faCartShopping} />
      </div>
    </div>
  );
};
