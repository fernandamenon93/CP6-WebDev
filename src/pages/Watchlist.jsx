import { useContext } from 'react';
import MovieCard from '../components/MovieCard';
import { WatchlistContext } from '../context/WatchlistContext';

export default function Watchlist() {
  const { watchlist, handleWatchlist, isInWatchlist } = useContext(WatchlistContext);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Sua Lista de Assistir Mais Tarde</h2>
      {watchlist.length === 0 ? (
        <p>Você ainda não possui uma lista 😞</p>
      ) : (
        <div className="flex space-x-4 gap-10 overflow-x-auto">
          {watchlist.map((movie) => (
            <MovieCard
              key={movie.id}
              {...movie}
              handleFavorite={handleWatchlist} 
              isFavorite={isInWatchlist(movie)} 
            />
          ))}
        </div>
      )}
    </div>
  );
}