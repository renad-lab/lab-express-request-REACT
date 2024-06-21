import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch("http://localhost:8888/pokemon");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPokemonList(data);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchPokemonData();
  }, []);

  return (
    <div className="App">
      <h1>Pokémon List</h1>
      <ul className="pokemon-list">
        {pokemonList.map((pokemon) => (
          <li
            key={pokemon.id}
            className={`pokemon-item pokemon-${getPokemonType(pokemon)}`}
          >
            <strong>Name:</strong> {pokemon.name}
            <br />
            <strong>Type:</strong> {renderPokemonTypes(pokemon)}
            <br />
            <img
              src={`http://img.pokemondb.net/artwork/${pokemon.name.toLowerCase()}.jpg`}
              alt={pokemon.name}
              className="pokemon-image"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

// Helper function to get the primary type of a Pokemon
function getPokemonType(pokemon) {
  if (pokemon.type && pokemon.type.length > 0) {
    return pokemon.type[0].toLowerCase(); // Ensure the first type is used
  }
  return "unknown"; // Default type if not specified
}

// Helper function to render Pokemon types as a comma-separated string
function renderPokemonTypes(pokemon) {
  if (pokemon.type && pokemon.type.length > 0) {
    return pokemon.type.join(", ");
  }
  return "Unknown";
}

export default App;
