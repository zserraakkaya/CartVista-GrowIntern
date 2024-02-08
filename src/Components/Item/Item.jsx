import React from "react";
import "./Item.css";
import all_products from "../Assets/all_products";

export const Item = ({ activeCategory }) => {
  let filteredProducts;

  if (activeCategory.toLowerCase() === "heart") {
    // If the active category is "Heart", display all products
    filteredProducts = all_products;
  } else {
    // Otherwise, filter based on the active category
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
  return (
    <div className="single-item">
      <img src={props.image} alt="" />
      <h6>{props.title}</h6>
      <p>{props.price} €</p>
    </div>
  );
};

export default Item;
