import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Card from "react-bootstrap/Card";

function PokemonDetails() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetchPokemon();
  }, []);

  async function fetchPokemon() {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json();
    setPokemon(data);
    console.log(data);
  }

  return (
    <div>
      {!pokemon ? (
        <div>Loading...</div>
      ) : (
        <Card className="w-15 mx-auto">
          <Card.Img src={`${pokemon.sprites.front_default}`}></Card.Img>
          <Card.Body>
            <Card.Title className="mb-2">{`${
              pokemon.name.slice(0, 1).toUpperCase() + pokemon.name.slice(1)
            }`}</Card.Title>
            <Card.Text className="mb-1">Height: {pokemon.height}</Card.Text>
            <Card.Text className="mb-3">Weight: {pokemon.weight}</Card.Text>
            <Card.Text as={"div"}>
              <div>Abilities</div>
              <ul>
                {pokemon.abilities.map((pokemonAbility) => (
                  <li>{pokemonAbility.ability.name}</li>
                ))}
              </ul>
            </Card.Text>
            <Card.Text as={"div"}>
              <div>Types:</div>
              <ul>
                {pokemon.types.map((pokemonType) => (
                  <li>{pokemonType.type.name}</li>
                ))}
              </ul>
            </Card.Text>
            <Card.Text as={"div"}>
              <div>Stats:</div>
              <ul>
                {pokemon.stats.map((pokemonStat) => (
                  <li>
                    {pokemonStat.stat.name}: {pokemonStat.base_stat}
                  </li>
                ))}
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export { PokemonDetails };
