import React from "react";
import { useCart } from "../Context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Cart.css";

const Cart = () => {
  const { cartItems } = useCart();

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Size</th>
            <th>Price</th>
            <th class="trash"></th>
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
              <td class="trash">
                <FontAwesomeIcon icon={faTrash} />
              </td>
            </tr>
          ))}
          <tr>
            <td className="trash"></td>
            <td className="trash"></td>
            <td className="trash">
              <div>
                <strong>Total Price: {calculateTotalPrice()} €</strong>
                <button id="pay-button">Pay</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
