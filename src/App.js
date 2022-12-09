import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoriteProvider } from "./contexts/FavoriteContext";
import { Navigation } from "./components/Navigation";
import { Home, PokemonDetails, Favorites } from "./routes";
import "./styles.css";

const LIMIT = 5;
const pokeApi = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonFilteredList, setPokemonFilteredList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(pokeApi);
      const data = await res.json();
      setPokemonList(data.results);
      setPokemonFilteredList(data.results);
    } catch (error) {
      console.log(`${error.message}`);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const regex = RegExp(value, "gi");
    const filteredList = pokemonList.filter((newList) => {
      return newList.name.match(regex);
    });
    setPokemonFilteredList(filteredList);
  };

  return (
    <BrowserRouter>
      <FavoriteProvider>
        <div data-testid="app">
          <Navigation />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  handleChange={handleChange}
                  pokemonFilteredList={pokemonFilteredList}
                />
              }
            />
            <Route path="/:name" element={<PokemonDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </FavoriteProvider>
    </BrowserRouter>
  );
}

export { App };
