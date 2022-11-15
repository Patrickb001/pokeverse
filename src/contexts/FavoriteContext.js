import React, { createContext, useState } from "react";

const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const removeFavorites = () => {};
  const addFavorites = (name) => {
    console.log(favorites);
    setFavorites([...favorites, name]);
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorites, removeFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export { FavoriteContext, FavoriteProvider };
