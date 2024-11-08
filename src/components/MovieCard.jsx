import { Link } from "react-router-dom";

export default function MovieCard({ id, title, poster_path }) {
  const posterURL = poster_path
    ? `https://image.tmdb.org/t/p/w342${poster_path}`
    : "https://via.placeholder.com/342x513?text=No+Image";

  return (
    <div
      key={id}
      className="flex flex-col text-center justify-center items-center flex-shrink-0 relative"
    >
      {/* Imagem do Cartaz */}
      <img
        src={posterURL}
        alt={title || "Título indisponível"}
        className="w-[130px] h-[200px] mt-3 rounded-lg object-cover"
      />

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
