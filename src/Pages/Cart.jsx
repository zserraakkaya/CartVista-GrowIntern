import React from "react";
// useCart context
import { useCart } from "../Context/CartContext";
// css
import "./Cart.css";
// font awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
    return totalPrice.toFixed(2);
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  return (
    <div>
      <table>
        <thead>
          <tr id="heading">
            <th>Product</th>
            <th>Size</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>
                <div>
                  <img id="table-img" src={item.image} alt={item.title} />
                  <span id="table-title">{item.title}</span>
                </div>
              </td>
              <td>{item.size}</td>
              <td>{item.price} €</td>
              <td>
                <FontAwesomeIcon
                  id="remove-button"
                  icon={faTrash}
                  onClick={() => handleRemoveItem(item.id)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <td id="total-price">
              <div>
                <strong>Total Price: {calculateTotalPrice()} €</strong>
                <button id="pay-button">Proceed to Checkout</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
