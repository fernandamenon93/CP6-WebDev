import { Link } from "react-router-dom";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

export default function MovieCard({ id, title, poster_path, handleFavorite, isFavorite }) {
  const posterURL = poster_path
    ? `https://image.tmdb.org/t/p/w342${poster_path}`
    : "https://via.placeholder.com/342x513?text=No+Image";

  return (
    <div
      key={id}
      className="flex flex-col text-center justify-center items-center flex-shrink-0 relative"
    >
      {/* Título do Filme (comentado, mas pode ser habilitado) */}
      {/* <h2 className="font-semibold">{title}</h2> */}

      {/* Imagem do Cartaz */}
      <img
        src={posterURL}
        alt={title || "Título indisponível"}
        className="w-[130px] h-[200px] mt-3 rounded-lg object-cover"
      />

      {/* Botão de Favoritar */}
      <button
        className="absolute top-2 right-2 p-2 bg-white rounded-full transition ease-in-out duration-300 transform hover:scale-125"
        onClick={() => handleFavorite({ id, title, poster_path })}
        aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        {isFavorite ? (
          <MdFavorite className="text-red-500 transition-transform duration-300 ease-in-out transform scale-125" />
        ) : (
          <MdFavoriteBorder className="text-black transition-transform duration-300 ease-in-out transform scale-100" />
        )}
      </button>

      {/* Link para Detalhes */}
      <Link
        className="py-2 px-3 transition ease-in-out duration-300 bg-red-800 hover:bg-white hover:text-red-800 m-4 text-white rounded-3xl"
        to={`/movies/${id}`}
      >
        Ver detalhes
      </Link>
    </div>
  );
}
