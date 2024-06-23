import React, { useState } from "react";
import "./CharacterSearch.css";

const CharacterSearch = ({ onSearch, onClear }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetters, setSelectedLetters] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value, selectedLetters);
  };

  const handleLetterClick = (letter) => {
    let newSelectedLetters;
    if (selectedLetters.includes(letter)) {
      newSelectedLetters = selectedLetters.filter((l) => l !== letter);
    } else {
      newSelectedLetters = [...selectedLetters, letter];
    }
    setSelectedLetters(newSelectedLetters);
    onSearch(searchTerm, newSelectedLetters);
  };

  const handleClear = () => {
    setSearchTerm("");
    setSelectedLetters([]);
    onClear();
  };

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="character-search">
      <input
        type="text"
        placeholder="Search character by name, appearances, or quests..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="letter-filter">
        {letters.map((letter) => (
          <button
            key={letter}
            className={`letter-button ${
              selectedLetters.includes(letter) ? "selected" : ""
            }`}
            onClick={() => handleLetterClick(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
      <button onClick={handleClear} className="clear-button">
        Clear
      </button>
    </div>
  );
};

export default CharacterSearch;
