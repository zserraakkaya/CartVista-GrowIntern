import React, { useState, useEffect } from "react";
// css
import "./Item.css";
// axios
import axios from "axios";
// font awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faStar, faPlus } from "@fortawesome/free-solid-svg-icons";
// useCart Cart Context to add items to the cart
import { useCart } from "../../Context/CartContext";
// useAuth to check if the user signed in -> so the user can add an item to favorites
import { useAuth } from "../../Context/AuthContext";
// useFavorite for favorite items
import { useFavorite } from "../../Context/FavoriteContext";

export const Item = ({ activeCategory }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="item">
      {products
        .filter(
          (item) =>
            activeCategory === "AllProducts" ||
            item.category.toLowerCase() === activeCategory.toLowerCase()
        )
        .map((item, i) => (
          <SingleItem key={i} {...item} />
        ))}
    </div>
  );
};

const SingleItem = ({ _id, image, title, price, category }) => {
  const [size, setSize] = useState("");

  const { userEmail, isAuthenticated } = useAuth();

  const [showPlusIcon, setShowPlusIcon] = useState(false);

  const { addToCart } = useCart();

  const { addToFavorite, favoriteItems } = useFavorite();
  const isFavorite = favoriteItems.some((item) => item.id === _id);

  const handleAddToCart = () => {
    if (category.toLowerCase() === "jewelry") {
      addToCart({
        id: _id,
        title,
        image,
        price,
        size: "Standard",
      });
    } else if (!size) {
      return;
    } else {
      addToCart({
        id: _id,
        title,
        image,
        price,
        size,
      });
    }

    setShowPlusIcon(true);

    setTimeout(() => {
      setShowPlusIcon(false);
    }, 1000);
  };

  const handleAddToFavorite = () => {
    if (!isAuthenticated) {
      window.location.href = "/signinsignup";
      return;
    }

    addToFavorite({
      id: _id,
      title,
      image,
      price,
    });
  };

  return (
    <div className="single-item" id={`item-${_id}`}>
      <div className="image-container">
        <div
          className={`star-icon ${isFavorite ? "shining" : ""}`}
          onClick={handleAddToFavorite}
        >
          <FontAwesomeIcon
            icon={faStar}
            className={isFavorite ? "yellow" : ""}
          />
        </div>
        <img src={image} alt={title} />
      </div>
      <div className="container">
        <div className="left-content">
          <div className="text-content">
            <h6>{title}</h6>
            <p>{price} €</p>
          </div>
        </div>

        <form className="right-content" onSubmit={(e) => e.preventDefault()}>
          {category.toLowerCase() !== "jewelry" && (
            <select
              name=""
              id=""
              required
              onChange={(e) => setSize(e.target.value)}
              value={size}
            >
              <option value="">Size</option>
              <option value="XL">XL</option>
              <option value="L">L</option>
              <option value="M">M</option>
              <option value="S">S</option>
              <option value="XS">XS</option>
            </select>
          )}
          <div className="button-container">
            <button
              class="add-to-cart-button"
              type="submit"
              onClick={() => handleAddToCart(size)}
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
