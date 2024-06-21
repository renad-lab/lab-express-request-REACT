import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const closeDetails = () => {
    setSelectedPokemon(null);
  };

  return (
    <div className="App">
      <h1>Pokémon List</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
      <ul className="pokemon-list">
        {filteredPokemon.map((pokemon) => (
          <li
            key={pokemon.id}
            className="pokemon-item"
            onClick={() => handlePokemonClick(pokemon)}
          >
            <div className="pokemon-image">
              <img
                src={`http://img.pokemondb.net/artwork/${pokemon.name.toLowerCase()}.jpg`}
                alt={pokemon.name}
                className="pokemon-img"
              />
            </div>
            <div className="pokemon-details">
              <strong>Name:</strong> {pokemon.name}
              <br />
              <div className="type-container">
                <strong>Type:</strong>{" "}
                {pokemon.type.map((type, index) => (
                  <span
                    key={index}
                    className={`type type-${type.toLowerCase()}`}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
      {selectedPokemon && (
        <div className="pokemon-details-overlay" onClick={closeDetails}>
          <div className="pokemon-details-modal">
            <h2>{selectedPokemon.name}</h2>
            <div className="modal-content">
              {selectedPokemon.stats && ( // Check if stats exist
                <div className="pokemon-stats">
                  <h3>Stats</h3>
                  <ul>
                    <li>HP: {selectedPokemon.stats.hp}</li>
                    <li>Attack: {selectedPokemon.stats.attack}</li>
                    <li>Defense: {selectedPokemon.stats.defense}</li>
                    <li>Special Attack: {selectedPokemon.stats.spattack}</li>
                    <li>Special Defense: {selectedPokemon.stats.spdefense}</li>
                    <li>Speed: {selectedPokemon.stats.speed}</li>
                  </ul>
                </div>
              )}
              {selectedPokemon.misc && (
                <div className="pokemon-misc">
                  <h3>Miscellaneous</h3>
                  <ul>
                    <li>
                      Classification: {selectedPokemon.misc.classification}
                    </li>
                    <li>Height: {selectedPokemon.misc.height}</li>
                    <li>Weight: {selectedPokemon.misc.weight}</li>
                    <li>Happiness: {selectedPokemon.misc.happiness}</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
