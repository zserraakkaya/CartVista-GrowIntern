import React, { useState, useEffect } from "react";
// axios
import axios from "axios";
import "./Item.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faStar, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../Context/CartContext";

export const Item = ({ activeCategory }) => {
  const [products, setProducts] = useState([]);

  const [sizes, setSizes] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  let filteredProducts;

  if (activeCategory.toLowerCase() === "heart") {
    filteredProducts = products;
  } else {
    filteredProducts = products.filter(
      (item) =>
        item.category &&
        item.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }

  const handleSizeChange = (itemId, newSize) => {
    setSizes((prevSizes) => ({ ...prevSizes, [itemId]: newSize }));
  };

  return (
    <div className="item">
      {filteredProducts.map((item, i) => (
        <SingleItem
          key={i}
          id={item.id}
          image={item.image}
          title={item.title}
          price={item.price}
          size={sizes[item.id] || ""}
          setSize={(newSize) => handleSizeChange(item.id, newSize)}
        />
      ))}
    </div>
  );
};

const SingleItem = (props) => {
  const [isStarClicked, setStarClicked] = useState(false);

  const [showPlusIcon, setShowPlusIcon] = useState(false);

  const { addToCart } = useCart();

  const handleStarClick = () => {
    setStarClicked(!isStarClicked);
  };

  const handleAddToCart = (size) => {
    if (!size) {
      return;
    }

    addToCart({
      id: props.id,
      title: props.title,
      image: props.image,
      price: props.price,
      size: size,
    });

    props.setSize("");

    setShowPlusIcon(true);

    setTimeout(() => {
      setShowPlusIcon(false);
    }, 1000);
  };

  return (
    <div className="single-item" id={`item-${props.id}`}>
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

        <form className="right-content" onSubmit={(e) => e.preventDefault()}>
          <select
            name=""
            id=""
            required
            onChange={(e) => props.setSize(e.target.value)}
          >
            <option value="">Size</option>
            <option value="XL">XL</option>
            <option value="L">L</option>
            <option value="M">M</option>
            <option value="S">S</option>
            <option value="XS">XS</option>
          </select>
          <div className="button-container">
            <button
              class="add-to-cart-button"
              type="submit"
              onClick={() => handleAddToCart(props.size)}
            >
              <FontAwesomeIcon icon={faCartPlus} />
            </button>
            {showPlusIcon && (
              <div className="plus-icon">
                <FontAwesomeIcon icon={faPlus} />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Item;
