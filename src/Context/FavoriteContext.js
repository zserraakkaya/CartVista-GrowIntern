import React, { createContext, useContext, useState } from "react";

const FavoriteContext = createContext();

export const useFavorite = () => {
  return useContext(FavoriteContext);
};

export const FavoriteProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  const addToFavorite = async (userEmail, productId) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/add-to-favorites",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: userEmail,
            productId: productId,
          }),
        }
      );

      if (response.ok) {
        console.log("Added to favorites");
      } else {
        const errorData = await response.json();
        console.error("Error", errorData.error);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const removeFromFavorite = (itemId) => {
    setFavoriteItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  return (
    <FavoriteContext.Provider
      value={{ favoriteItems, addToFavorite, removeFromFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export default useFavorite;
