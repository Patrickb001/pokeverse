import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FavoriteContext } from "../contexts/FavoriteContext";

function PokemonCard({ url, name, pokemonFilteredList }) {
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();
  const { addFavorites } = useContext(FavoriteContext);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setPokemon(data);
  };

  const addPokemonToFavorites = () => {
    addFavorites(pokemon);
    console.log(`${pokemon.name} was added to favorites!`);
  };

  const navigateToPokemonCard = () => {
    navigate(name);
  };

  return (
    <>
      {pokemon ? (
        <Card
          style={{ cursor: "pointer" }}
          onClick={navigateToPokemonCard}
          className="w-100"
        >
          <Card.Img src={pokemon.sprites.front_default}></Card.Img>
          <Card.Body>
            <Card.Title>{pokemon.name}</Card.Title>
            <Card.Text as={"div"}>
              {pokemon.abilities ? (
                <ul>
                  {pokemon.abilities.map((pokemonAbility, idx) => (
                    <li>{pokemonAbility.ability.name}</li>
                  ))}
                </ul>
              ) : (
                ""
              )}
            </Card.Text>
            <Button onClick={addPokemonToFavorites}>Add to Favorites</Button>
          </Card.Body>
        </Card>
      ) : (
        ""
      )}
    </>
  );
}

export { PokemonCard };
