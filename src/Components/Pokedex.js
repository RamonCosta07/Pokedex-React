import "./Pokedex.css";
import Pokemon from "./Pokemon";
// Components
import Pagination from "./Pagination";

const Pokedex = ({ pokemons, loading, page, totalPages, setPage }) => {
  const previewClickHandler = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const advanceClickHandler = () => {
    if (page+1 < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div>
      <div className="pokedex-header">
        <h1>Pokedex</h1>
        <Pagination
          page={page + 1}
          totalPages={totalPages}
          previewClick={previewClickHandler}
          advanceClick={advanceClickHandler}
        />
      </div>
      {loading ? (
        <div>
          <p>* Carregando *</p>
        </div>
      ) : (
        <div className="pokedex-grid">
          {pokemons &&
            pokemons.map((pokemon, index) => {
              return <Pokemon pokemon={pokemon} key={index} />;
            })}
        </div>
      )}
    </div>
  );
};

export default Pokedex;
