import { useContext } from 'react';
import { MoviesContext } from '../context/MoviesContext';
import MovieCard from '../components/MovieCard';

export default function WatchedMoviesPage() {
  const { filmesAssistidos } = useContext(MoviesContext);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-xl font-bold mb-6 text-center">Minha Watchedlist:</h2>
      {filmesAssistidos.length === 0 ? (
        <p className="text-center text-xl font-semibold">Nenhum filme assistido até o momento 😞</p>
      ) : (
        <div className="flex space-x-4 gap-10 overflow-x-auto p-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {filmesAssistidos.map((filme) => (
            <MovieCard
              key={filme.id}
              {...filme}
            />
          ))}
        </div>
      )}
    </div>
  );
}
