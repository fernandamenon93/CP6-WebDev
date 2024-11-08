import { useContext, useEffect, useState } from "react";
import ContainerMovies from "../components/ContainerMovies";
import MovieCard from "../components/MovieCard";
import { FavoritesContext } from "../context/FavoritesContext";

export default function Home() {
  const [recomendadosMovies, setRecomendadosMovies] = useState([]); // Inicialize como array vazio
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [top_ratedMovies, setTop_ratedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const { favorites, handleFavorite, isFavorite } = useContext(FavoritesContext);

  const API_KEY = '?api_key=7c572a9f5b3ba776080330d23bb76e1e';  
  const BASE_URL = 'https://api.themoviedb.org/3';

  // Função para buscar os filmes populares, mais bem avaliados, etc.
  const fetchMovies = async () => {
    try {
      const popularURL = `${BASE_URL}/movie/popular${API_KEY}&language=pt-br&page=1`;
      const upcomingURL = `${BASE_URL}/movie/upcoming${API_KEY}&language=pt-br&with_genres=16`;
      const top_ratedURL = `${BASE_URL}/movie/top_rated${API_KEY}&language=pt-br&with_genres=878`;

      // Faz a busca dos filmes
      const [popularResponse, upcomingResponse, top_ratedResponse] = await Promise.all([
        fetch(popularURL),
        fetch(upcomingURL),
        fetch(top_ratedURL)
      ]);

      // Converte os resultados para JSON
      const popularData = await popularResponse.json();
      const upcomingData = await upcomingResponse.json();
      const top_ratedData = await top_ratedResponse.json();

      // Atualiza o estado com os dados recebidos
      setPopularMovies(popularData.results);
      setUpcomingMovies(upcomingData.results);
      setTop_ratedMovies(top_ratedData.results);

      // Buscar recomendações com base no primeiro filme popular
      if (popularData.results.length > 0) {
        fetchRecommendations(popularData.results[0].id); // Passa o ID do primeiro filme popular
      }
    } catch (error) {
      console.error('Erro ao buscar os filmes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar filmes recomendados
  const fetchRecommendations = async (movieId) => {
    try {
      const recomendadosURL = `${BASE_URL}/movie/${movieId}/recommendations${API_KEY}&language=pt-br&page=1`;
      const response = await fetch(recomendadosURL);
      const data = await response.json();
      setRecomendadosMovies(data.results);
    } catch (error) {
      console.error('Erro ao buscar os filmes recomendados:', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchMovies();
  }, []);

  return (
    <>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          {/* Recomendados Para Você */}
          <ContainerMovies titulo="Recomendados Para Você:">
            {recomendadosMovies.length > 0 ? (
              recomendadosMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  {...movie}
                  handleFavorite={handleFavorite}
                  isFavorite={isFavorite(movie)}
                />
              ))
            ) : (
              <p className="text-white">Nenhum filme recomendado disponível.</p>
            )}
          </ContainerMovies>

          {/* Filmes Populares */}
          <ContainerMovies titulo="Filmes Populares:">
            {popularMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                {...movie}
                handleFavorite={handleFavorite}
                isFavorite={isFavorite(movie)}
              />
            ))}
          </ContainerMovies>

          {/* Filmes que estão por vir */}
          <ContainerMovies titulo="Filmes que estão por vir:">
            {upcomingMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                {...movie}
                handleFavorite={handleFavorite}
                isFavorite={isFavorite(movie)}
              />
            ))}
          </ContainerMovies>

          {/* Mais bem avaliados */}
          <ContainerMovies titulo="Mais bem avaliados:">
            {top_ratedMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                {...movie}
                handleFavorite={handleFavorite}
                isFavorite={isFavorite(movie)}
              />
            ))}
          </ContainerMovies>
        </>
      )}
    </>
  );
}
