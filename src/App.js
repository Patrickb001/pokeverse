import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Home, PokemonDetails } from "./routes";
import "./styles.css";

const LIMIT = 150;
const pokeApi = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonFilteredList, setPokemonFilteredList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(pokeApi);
    const data = await res.json();
    setPokemonList(data.results);
    setPokemonFilteredList(data.results);
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export { App };
