// css
import "./App.css";
// Components
import Navbar from "./Components/Navbar";
import Pokedex from "./Components/Pokedex";
import Search from "./Components/Search";
// Hooks
import { useEffect, useState } from "react";
// API
import { getPokemons, getPokemonData, searchPokemon } from "./api";
import { FavoriteProvider } from "./contexts/FavoritesContexts";

function App() {
  const favoritesKey = "favorites";
  const itensPerPage = 25;
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pokemons, setPokemons] = useState([]);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      setNotFound(false);
      const data = await getPokemons(itensPerPage, itensPerPage * page);
      const promises = data.results.map(async (pokemon) => {
        return getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotalPages(Math.ceil(data.count / itensPerPage));
    } catch (error) {
      console.log("fetchPokemons error: ", error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [page]);

  const loadFavoritePokemons = () => {
    const pokemons =
      JSON.parse(window.localStorage.getItem(favoritesKey)) || [];
    setFavorites(pokemons);
  };

  useEffect(() => {
    loadFavoritePokemons();
  }, []);

  const updateFavoritePokemons = (name) => {
    const updateFavorites = [...favorites];
    const favoriteIndex = favorites.indexOf(name);
    if (favoriteIndex >= 0) {
      updateFavorites.splice(favoriteIndex, 1);
    } else {
      updateFavorites.push(name);
    }
    window.localStorage.setItem(favoritesKey, JSON.stringify(updateFavorites));
    setFavorites(updateFavorites);
  };

  const onSearchHandler = async (pokemon) => {
    if (!pokemon) {
      return fetchPokemons();
    }
    setLoading(true);
    setNotFound(false);
    const result = await searchPokemon(pokemon);
    if (!result) {
      setNotFound(true);
    } else {
      setPokemons([result]);
      setPage(0);
      setTotalPages(1);
    }
    setLoading(false);
  };

  return (
    <div className="fundo">
      <FavoriteProvider
        value={{
          favoritePokemons: favorites,
          updateFavoritePokemons: updateFavoritePokemons,
        }}
      >
        <div>
          <Navbar />
          <Search onSearch={onSearchHandler} />
          {notFound ? (
            <div className="not-found">Pokémon Não Encontrado :&#40; </div>
          ) : (
            <Pokedex
              pokemons={pokemons}
              loading={loading}
              page={page}
              totalPages={totalPages}
              setPage={setPage}
            />
          )}
        </div>
      </FavoriteProvider>
    </div>
  );
}

export default App;
