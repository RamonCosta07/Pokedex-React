// CSS
import "./Pokemon.css";
// Context
import { useContext } from "react";
import FavoriteContext from "../contexts/FavoritesContexts";

const Pokemon = (props) => {
  const { pokemon } = props;
  const { favoritePokemons, updateFavoritePokemons } =
    useContext(FavoriteContext);

  console.log("Pokemon: ", pokemon);

  const onHeartClick = () => {
    updateFavoritePokemons(pokemon.name);
  };

  const heart = favoritePokemons.includes(pokemon.name) ? "💖" : "🤍";

  return (
    <div className="pokemon-card">
      <div className="pokemon-image-container">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="pokemon-image"
        />
      </div>
      <div className="card-body">
        <div className="card-top">
          <h3>{pokemon.name}</h3>
          <div>#{pokemon.id}</div>
        </div>
        <div className="card-bottom">
          <div className="pokemon-type">
            {pokemon.types.map((type, index) => {
              return (
                <div className="pokemon-type-text" key={index}>
                  {type.type.name}
                </div>
              );
            })}
          </div>
          <button className="pokemon-heart" onClick={onHeartClick}>
            {heart}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
