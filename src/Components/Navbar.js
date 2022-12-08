import "./Navbar.css";
import { useContext } from "react";
import FavoriteContext from "../contexts/FavoritesContexts";

const Navbar = () => {
  const { favoritePokemons } = useContext(FavoriteContext);
  return (
    <nav>
      <div className="navbar">
        <img
          alt="PokéAPI"
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
          className="navbar-img"
        />
        <div className="heart">
          {favoritePokemons.length} 💖
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
