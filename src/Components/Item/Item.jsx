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
// useFavorite for favorite items
import useFavorite from "../../Context/FavoriteContext";
// useAuth to check if the user signed in -> so the user can add an item to favorites
import { useAuth } from "../../Context/AuthContext";

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

  if (activeCategory.toLowerCase() === "allproducts") {
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
  const { isAuthenticated } = useAuth();

  const [showPlusIcon, setShowPlusIcon] = useState(false);

  const { addToCart } = useCart();

  const { addToFavorite } = useFavorite();

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

  const handleAddToFavorite = (size) => {
    if (!isAuthenticated) {
      window.location.href = "/signinsignup";
      return;
    }

    addToFavorite({
      id: props.id,
      title: props.title,
      image: props.image,
      price: props.price,
    });
  };

  return (
    <div className="single-item" id={`item-${props.id}`}>
      <div className="image-container">
        <div
          //className={`star-icon ${isStarClicked ? "shining" : ""}`}
          onClick={handleAddToFavorite}
        >
          <FontAwesomeIcon
            icon={faStar}
            //className={isStarClicked ? "yellow" : ""}
          />
        </div>
        <img src={props.image} alt={props.title} />
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
