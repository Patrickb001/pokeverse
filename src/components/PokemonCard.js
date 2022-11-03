import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";

function PokemonCard({ url, name, pokemonFilteredList }) {
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPokemon();
  }, [pokemonFilteredList]);

  const fetchPokemon = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setPokemon(data);
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
          <Card.Img src={`${pokemon.sprites.front_default}`}></Card.Img>
          <Card.Body>
            <Card.Title>{pokemon.name}</Card.Title>
            <Card.Text as={"div"}>
              <ul>
                {pokemon.abilities.map((pokemonAbility, idx) => (
                  <li>{pokemonAbility.ability.name}</li>
                ))}
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        ""
      )}
    </>
  );
}

export { PokemonCard };
