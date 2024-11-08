import { useContext } from 'react';
import { MoviesContext } from '../context/MoviesContext';
import { FavoritesContext } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';


export default function WatchlistPage() {
  const { filmesParaVerDepois, removerFilmeParaVerDepois } = useContext(MoviesContext);
  const { handleFavorite, isFavorite } = useContext(FavoritesContext);




  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-xl font-bold mb-6 text-center">Minha Watchlist:</h2>
      {filmesParaVerDepois.length === 0 ? (
        <p className="text-center text-xl font-semibold">Nenhum filme na watchlist até o momento 😞</p>
      ) : (
        <div className="flex space-x-4 gap-10 overflow-x-auto p-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {filmesParaVerDepois.map((filme) => (
              <MovieCard 
              key={filme.id}
              {...filme} 
              handleFavorite={handleFavorite}
              isFavorite={isFavorite(filme)}
              />
          ))}
        </div>
      )}
    </div>
  );
}