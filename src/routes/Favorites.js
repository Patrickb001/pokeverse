import React, { useContext, useEffect } from "react";
import { FavoriteContext } from "../contexts/FavoriteContext";
import { PokemonCard } from "../components/PokemonCard";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Favorites() {
  const { favorites } = useContext(FavoriteContext);
  console.log(favorites);

  return (
    <div>
      {favorites.length ? (
        <Container>
          <Row sm={3}>
            {favorites.map((pokemon, idx) => (
              <Col className="mb-4" sm="4">
                <PokemonCard
                  pokemonFilteredList={favorites}
                  key={idx}
                  name={pokemon.name}
                  url={pokemon.species.url}
                />
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <div>No Pokemon Have Been Added To Favorites!</div>
      )}
    </div>
  );
}

export { Favorites };
