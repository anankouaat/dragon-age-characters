import React, { useEffect, useState } from "react";
import axios from "axios";
import CharacterSearch from "./CharacterSearch";
import "./CharacterList.css";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          "https://dragon-age-api.fly.dev/api/v1/characters?perPage=1000"
        );
        if (response.data && Array.isArray(response.data)) {
          const sortedCharacters = response.data.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          setCharacters(sortedCharacters);
          setFilteredCharacters(sortedCharacters);
        } else {
          throw new Error("Data format is incorrect");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const handleSearch = (searchTerm, selectedLetters) => {
    let filtered = characters;

    if (searchTerm) {
      filtered = filtered.filter(
        (character) =>
          character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (character.appearances &&
            character.appearances.some((appearance) =>
              appearance.toLowerCase().includes(searchTerm.toLowerCase())
            )) ||
          (character.quests &&
            character.quests.some((quest) =>
              quest.toLowerCase().includes(searchTerm.toLowerCase())
            ))
      );
    }

    if (selectedLetters.length) {
      filtered = filtered.filter(
        (character) =>
          character.name &&
          selectedLetters.some((letter) => character.name.startsWith(letter))
      );
    }

    const sortedFilteredCharacters = filtered.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setFilteredCharacters(sortedFilteredCharacters);
  };

  const handleClear = () => {
    setFilteredCharacters(characters);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!characters.length) {
    return <p>No characters found.</p>;
  }

  return (
    <div className="character-list">
      <CharacterSearch onSearch={handleSearch} onClear={handleClear} />
      <h1>Character List</h1>
      {filteredCharacters.map((character) => (
        <div key={character.id || character._id} className="character-card">
          <div className="character-info">
            <h2>{character.name || "Unknown Name"}</h2>
            {character.appearances ? (
              <>
                <h3>Appearances:</h3>
                <ul>
                  {character.appearances.map((appearance, index) => (
                    <li key={index}>{appearance}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p>No appearances listed.</p>
            )}
            {character.quests ? (
              <>
                <h3>Quests:</h3>
                <ul>
                  {character.quests.map((quest, index) => (
                    <li key={index}>{quest}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p>No quests listed.</p>
            )}
          </div>
          {character.photo ? (
            <div className="character-photo-container">
              <img
                src={character.photo}
                alt={character.name || "Unknown"}
                className="character-photo"
              />
            </div>
          ) : (
            <p>No photo available.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CharacterList;
