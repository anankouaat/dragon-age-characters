import React from "react";
import "./App.css";
import CharacterList from "./components/CharacterList";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img
          src="https://db4sgowjqfwig.cloudfront.net/game_systems/162/assets/1043454/da-logo.png"
          alt="Title"
          className="title-image"
        />
      </header>
      <main>
        <CharacterList />
        <div style={{ marginBottom: "5rem" }}></div>
        <Footer />
      </main>
    </div>
  );
}

export default App;
