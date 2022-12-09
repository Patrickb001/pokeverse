import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FavoriteContext } from "../contexts/FavoriteContext";

function PokemonCard({ url, name, pokemonFilteredList }) {
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();
  const {
    addFavorites,
    favorites,
    removeFavorites,
    pokeFavorite,
    setPokeFavorite,
  } = useContext(FavoriteContext);

  useEffect(() => {
    fetchPokemon();
    if (pokeFavorite[name] == undefined) {
      setPokeFavorite({ ...pokeFavorite, [name]: false });
    }
  }, []);
  // console.log(pokeFavorite);

  const fetchPokemon = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setPokemon(data);
    } catch (error) {
      console.log(`${error.message}`);
    }
  };

  const addPokemonToFavorites = () => {
    addFavorites(pokemon);
    setPokeFavorite({ ...pokeFavorite, [name]: true });

    console.log(`${pokemon.name} was added to favorites!`);
  };
  const removePokemonFromFavorites = () => {
    removeFavorites(name);

    setPokeFavorite({ ...pokeFavorite, [name]: false });
    console.log(`${pokemon.name} was removed to favorites!`);
  };

  const navigateToPokemonCard = () => {
    navigate(name);
  };

  return (
    <>
      {pokemon ? (
        <Card style={{ cursor: "pointer" }} className="w-100">
          <Card.Img
            onClick={navigateToPokemonCard}
            src={pokemon.sprites.front_default}
          ></Card.Img>
          <Card.Body>
            <Card.Title onClick={navigateToPokemonCard}>
              {pokemon.name}
            </Card.Title>
            <Card.Text as={"div"} onClick={navigateToPokemonCard}>
              {pokemon.abilities ? (
                <ul>
                  {pokemon.abilities.map((pokemonAbility, idx) => (
                    <li key={idx}>{pokemonAbility.ability.name}</li>
                  ))}
                </ul>
              ) : (
                ""
              )}
            </Card.Text>
            {pokeFavorite[name] ? (
              <Button onClick={removePokemonFromFavorites} variant="danger">
                {" "}
                Remove from Favorites
              </Button>
            ) : (
              <Button onClick={addPokemonToFavorites}>Add to Favorites</Button>
            )}
          </Card.Body>
        </Card>
      ) : (
        ""
      )}
    </>
  );
}

export { PokemonCard };
