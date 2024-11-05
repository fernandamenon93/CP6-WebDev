import { useContext, useEffect, useState } from "react";
import ContainerMovies from "../components/ContainerMovies";
import MovieCard from "../components/MovieCard";
import { FavoritesContext } from "../context/FavoritesContext";


export default function Home(){

    const [recomendadosMovies, setrecomendadosMovies] = useState([MovieCard]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [top_ratedMovies, setTop_ratedMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const { favorites, handleFavorite, isFavorite } = useContext(FavoritesContext);

    const API_KEY = '?api_key=7c572a9f5b3ba776080330d23bb76e1e';  
    const BASE_URL = 'https://api.themoviedb.org/3';
    
    const fetchMovies = async () => {
        try{
            //Monta a URL para buscar os filmes populares, animação e ficção científica
            const recomendadosURL = `${BASE_URL}/movie/recomendados${API_KEY}&language=pt-br&page=1`;
            const popularURL = `${BASE_URL}/movie/popular${API_KEY}&language=pt-br&page=1`;
            const upcomingURL = `${BASE_URL}/movie/upcoming${API_KEY}&language=pt-br&with_genres=16`;
            const top_ratedURL = `${BASE_URL}/movie/top_rated${API_KEY}&language=pt-br&with_genres=878`;
            //Faz a busca dos filmes
            const [recomendadosResponse, popularResponse, upcomingResponse, top_ratedResponse] = await Promise.all([
                fetch(recomendadosURL),
                fetch(popularURL),
                fetch(upcomingURL),
                fetch(top_ratedURL)
              ]);

            // Converte os resultados para JSON
            const recomendadosData = await recomendadosResponse.json();
            const popularData = await popularResponse.json();
            const upcomingData = await upcomingResponse.json();
            const trendingData = await top_ratedResponse.json();

            // Atualiza o estado com os dados recebidos
            
            setPopularMovies(popularData.results);
            setUpcomingMovies(upcomingData.results);
            setTop_ratedMovies(trendingData.results);
        }
        catch(error){
            console.error('Erro ao buscar os filmes:', error);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchMovies();
    }, []);

    return (
        <>
           {loading ? <p>Carregando...</p>:
        <>
        <ContainerMovies titulo="Recomendados Para Você:">
        {
            recomendadosMovies
            .map( movie => (
                <MovieCard
                    key={movie.id} {...movie} 
                    handleFavorite={handleFavorite}
                    isFavorite={isFavorite(movie)}/>
                )
            )
        }
        </ContainerMovies>
        <ContainerMovies titulo="Filmes Populares:">
        {
            popularMovies
            .map( movie => (
                <MovieCard
                    key={movie.id} {...movie} 
                    handleFavorite={handleFavorite}
                    isFavorite={isFavorite(movie)}/>
                )
            )
        }
        </ContainerMovies>
        <ContainerMovies titulo="Filmes que estão por vir:">
        {
            upcomingMovies
            .map( movie => (
                <MovieCard
                    key={movie.id} {...movie} 
                    handleFavorite={handleFavorite}
                    isFavorite={isFavorite(movie)}/>
                )
            )
        }
        </ContainerMovies>
        <ContainerMovies titulo="Mais bem avaliados:">
        {
            top_ratedMovies
            .map( movie => (
                <MovieCard
                    key={movie.id} {...movie} 
                    handleFavorite={handleFavorite}
                    isFavorite={isFavorite(movie)}/>
                )
            )
        }
        </ContainerMovies>
        </>
        }
        </>
    )
}