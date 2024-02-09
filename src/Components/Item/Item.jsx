import React, { useState } from "react";
import "./Item.css";
import all_products from "../Assets/all_products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faStar } from "@fortawesome/free-solid-svg-icons";

export const Item = ({ activeCategory }) => {
  let filteredProducts;

  if (activeCategory.toLowerCase() === "heart") {
    filteredProducts = all_products;
  } else {
    filteredProducts = all_products.filter(
      (item) =>
        item.category &&
        item.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }

  return (
    <div className="item">
      {filteredProducts.map((item, i) => (
        <SingleItem
          key={i}
          id={item.id}
          image={item.image}
          title={item.title}
          price={item.price}
        />
      ))}
    </div>
  );
};

const SingleItem = (props) => {
  const [isStarClicked, setStarClicked] = useState(false);

  const handleStarClick = () => {
    setStarClicked(!isStarClicked);
  };

  return (
    <div className="single-item">
      <div className="image-container">
        <div
          className={`star-icon ${isStarClicked ? "shining" : ""}`}
          onClick={handleStarClick}
        >
          <FontAwesomeIcon
            icon={faStar}
            className={isStarClicked ? "yellow" : ""}
          />
        </div>
        <img src={props.image} alt="" />
      </div>
      <div className="container">
        <div className="left-content">
          <div className="text-content">
            <h6>{props.title}</h6>
            <p>{props.price} €</p>
          </div>
        </div>

        <form className="right-content">
          <select name="" id="" required>
            <option value="">Size</option>
            <option value="">XL</option>
            <option value="">L</option>
            <option value="">M</option>
            <option value="">S</option>
            <option value="">XS</option>
          </select>
          <button>
            <FontAwesomeIcon icon={faCartPlus} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Item;
