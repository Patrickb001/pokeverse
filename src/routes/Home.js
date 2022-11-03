import React from "react";

import { PokemonCard } from "../components/PokemonCard";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

function Home({ pokemonFilteredList, handleChange }) {
  return (
    <div>
      <InputGroup onChange={handleChange} className="mb-3">
        <Form.Control
          aria-label="Example text with button addon"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <h1>Pokemon should appear here</h1>
      <Container>
        <Row sm={3}>
          {pokemonFilteredList.map((pokemon, idx) => (
            <Col className="mb-4" sm="4">
              <PokemonCard
                pokemonFilteredList={pokemonFilteredList}
                key={idx}
                name={pokemon.name}
                url={pokemon.url}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export { Home };
