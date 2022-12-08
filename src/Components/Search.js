// Hooks
import { useState } from "react";
// CSS
import "./Search.css";

function Search({onSearch}) {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length === 0) {
      onSearch(undefined);
    }
  };

  const handleButton = () => {
    onSearch(search);
  };

  return (
    <div className="search-container">
      <div className="search">
        <input
          type="text"
          placeholder="Pesquisar Pokémon"
          onChange={handleSearch}
        />
      </div>
      <div className="search-btn">
        <button onClick={handleButton}>Buscar</button>
      </div>
    </div>
  );
}

export default Search;
