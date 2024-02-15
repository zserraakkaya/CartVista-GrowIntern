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
  const [setUniqueCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/products")
      .then((response) => {
        const processedData = response.data.map((item) => ({
          ...item,
          category: item.category.toLowerCase(),
        }));

        setProducts(processedData);

        const categories = processedData.map((item) => item.category);
        const uniqueCategories = Array.from(new Set(categories));
        setUniqueCategories(uniqueCategories);
      })
      .catch((error) => console.error(error));
  });

  return (
    <div className="item">
      {products
        .filter(
          (item) =>
            activeCategory.toLowerCase() === "allproducts" ||
            item.category === activeCategory.toLowerCase()
        )
        .map((item, i) => (
          <SingleItem key={i} {...item} />
        ))}
    </div>
  );
};

const SingleItem = ({ _id, image, title, price, category }) => {
  const [size, setSize] = useState("");

  const [showPlusIcon, setShowPlusIcon] = useState(false);

  const { isAuthenticated } = useAuth();

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

    setSize("");
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

  useEffect(() => {
    setSize("");
  }, [category]);

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
              onChange={(e) => setSize(e.target.value)}
              value={size}
              required
            >
              <option value="">Size</option>
              <option value="XL">XL</option>
              <option value="L">L</option>
              <option value="M">M</option>
              <option value="S">S</option>
              <option value="XS">XS</option>
            </select>
          )}
          {category.toLowerCase() === "jewelry" && (
            <p id="standard">Standard</p>
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
