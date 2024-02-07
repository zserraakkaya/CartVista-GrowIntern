import React from "react";
import "./Item.css";
import all_products from "../Assets/all_products";

export const Item = (props) => {
  return (
    <div className="item">
      {all_products.map((item, i) => {
        return (
          <SingleItem
            key={i}
            id={item.id}
            image={item.image}
            title={item.title}
            price={item.price}
          />
        );
      })}
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
