import React, { useState } from "react";
import axios from "axios";
import "./SellProduct.css";

export const SellProduct = () => {
  const [product, setProduct] = useState({
    category: "",
    title: "",
    price: 0,
    image: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/products",
        product
      );

      console.log("Product successfully added:", response.data);

      setProduct({
        category: "",
        title: "",
        price: 0,
        image: "",
      });
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };

  return (
    <div className="sell-product-container">
      <form className="sell-product-form" onSubmit={handleSubmit}>
        <label className="sell-product-label">
          Choose a Category
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="sell-product-input"
          />
        </label>
        <label className="sell-product-label">
          Title
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            className="sell-product-input"
          />
        </label>
        <label className="sell-product-label">
          Price
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="sell-product-input"
          />
        </label>
        <label className="sell-product-label">
          Image URL
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            className="sell-product-input"
          />
        </label>
        <button type="submit" className="sell-product-button">
          Sell Product
        </button>
      </form>
    </div>
  );
};
