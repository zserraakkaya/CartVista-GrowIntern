import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
// useFavorite Context
import { useFavorite } from "../Context/FavoriteContext";
// css
import "./Favorites.css";
// font awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
// useCart Context to add items to the cart
import { useCart } from "../Context/CartContext";

export const Favorites = () => {
  // check if user signed in
  const { isAuthenticated } = useAuth();
  // navigate user to sign up page if user didnt sign in
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signinsignup");
    }
  }, [isAuthenticated, navigate]);

  const { favoriteItems, removeFromFavorite } = useFavorite();

  const [sizes, setSizes] = useState({});

  const handleSizeChange = (itemId, newSize) => {
    setSizes((prevSizes) => ({ ...prevSizes, [itemId]: newSize }));
  };

  const handleRemoveItem = (itemId) => {
    removeFromFavorite(itemId);
  };

  return (
    <div>
      <div className="item">
        {favoriteItems.map((item) => (
          <FavoriteItem
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            size={sizes[item.id] || ""}
            setSize={(newSize) => handleSizeChange(item.id, newSize)}
            handleRemove={() => handleRemoveItem(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

const FavoriteItem = ({
  id,
  title,
  image,
  price,
  size,
  setSize,
  handleRemove,
}) => {
  const [showPlusIcon, setShowPlusIcon] = useState(false);

  const { addToCart } = useCart();

  const handleAddToCart = (selectedSize) => {
    if (!selectedSize) {
      return;
    }

    addToCart({
      id: id,
      title: title,
      image: image,
      price: price,
      size: selectedSize,
    });

    setSize("");

    setShowPlusIcon(true);

    setTimeout(() => {
      setShowPlusIcon(false);
    }, 1000);
  };

  const { favoriteItems } = useFavorite();
  const isFavorite = favoriteItems.some((item) => item.id === id);

  return (
    <div className="single-item" id={`item-${id}`}>
      <div className="image-container">
        <div
          className={`star-icon ${isFavorite ? "shining" : ""}`}
          onClick={() => handleRemove(id)}
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
          <select
            name=""
            id=""
            required
            onChange={(e) => setSize(e.target.value)}
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
              className="add-to-cart-button"
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

export default FavoriteItem;
