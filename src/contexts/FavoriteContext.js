import React, { createContext, useState } from "react";

const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [pokeFavorite, setPokeFavorite] = useState({});

  const removeFavorites = (name) => {
    if (favorites.length > 0) {
      let newFavorites = [];
      for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].name == name) continue;
        else {
          newFavorites[i] = favorites[i];
        }
      }
      setFavorites(newFavorites);
    } else return;
  };
  const addFavorites = (name) => {
    setFavorites([...favorites, name]);
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        addFavorites,
        removeFavorites,
        pokeFavorite,
        setPokeFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export { FavoriteContext, FavoriteProvider };
