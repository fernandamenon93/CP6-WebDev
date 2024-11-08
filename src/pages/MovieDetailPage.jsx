import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { FaStar, FaCoins } from 'react-icons/fa';
import { MoviesContext } from '../context/MoviesContext';

export default function MovieDetailPage() {
  const { id } = useParams(); // Obtendo o ID do filme pela URL
  const [movie, setMovie] = useState({});
  const [revenueInBRL, setRevenueInBRL] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [credits, setCredits] = useState(null); // Novo estado para dados de crédito
  const [releaseDates, setReleaseDates] = useState([]); // Novo estado para datas de lançamento no Brasil

  const {
    filmesAssistidos,
    filmesParaVerDepois,
    adicionarFilmeAssistido,
    adicionarFilmeParaVerDepois,
    removerFilmeAssistido,
    removerFilmeParaVerDepois,
  } = useContext(MoviesContext); // Usando o contexto de filmes

  const exchangeRate = 5; // Taxa de câmbio fictícia para conversão de receita

  // Verificar se o filme já está nas listas
  const jaAssistido = filmesAssistidos.some((f) => f.id === parseInt(id));
  const jaNaWatchlist = filmesParaVerDepois.some((f) => f.id === parseInt(id));

  // Converte a receita para Real Brasileiro (BRL)
  useEffect(() => {
    if (movie.revenue) {
      const convertedRevenue = movie.revenue * exchangeRate;
      setRevenueInBRL(
        convertedRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      );
    }
  }, [movie.revenue]);

  // Busca os dados do filme
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Busca o trailer do filme
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          const trailerURL = data.results[0].key;
          setTrailer(`https://www.youtube.com/watch?v=${trailerURL}`);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Busca os dados de crédito do filme
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`
    )
      .then((response) => response.json())
      .then((data) => {
        setCredits(data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Busca as datas de lançamento do filme
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`
    )
      .then((response) => response.json())
      .then((data) => {
        // Filtra as datas para mostrar apenas as do Brasil
        const brazilReleaseDate = data.results.find(
          (releaseInfo) => releaseInfo.iso_3166_1 === 'BR'
        );
        if (brazilReleaseDate) {
          setReleaseDates(brazilReleaseDate.release_dates);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <>
      {movie ? (
        <div
          key={movie.id}
          className="bg-cover bg-center text-white relative flex flex-col items-center justify-center p-10"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            minHeight: '100vh',
          }}
        >
          <div className="bg-black bg-opacity-80 p-10 w-full max-w-5xl rounded-lg shadow-lg relative">
            <div className="flex flex-col lg:flex-row gap-x-10">
              {/* Poster do Filme */}
              <img
                src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg shadow-lg w-full lg:w-1/3 mb-6 lg:mb-0"
              />
              {/* Informações do Filme */}
              <div className="flex flex-col gap-y-5 lg:w-2/3">
                <h1 className="text-4xl font-bold text-center lg:text-left">{movie.title}</h1>
                <p className="font-semibold text-lg text-center lg:text-left">
                  {movie.overview ? movie.overview : 'Descrição não disponível'}
                </p>
                <div className="flex justify-center lg:justify-start gap-10 mt-4">
                  <div className="flex items-center gap-2 font-semibold text-md">
                    <FaStar className="text-yellow-600" /> <span>{movie.vote_average}</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-md">
                    <FaCoins className="text-yellow-600" />{' '}
                    <span>{revenueInBRL ? revenueInBRL : 'Valor não divulgado'}</span>
                  </div>
                </div>
                {/* Botões para Marcar como Assistido ou Adicionar à Watchlist */}
                <div className="flex justify-center lg:justify-start gap-4 mt-5">
                  {jaAssistido ? (
                    <button
                      onClick={() => removerFilmeAssistido(parseInt(id))}
                      className="bg-red-700 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                    >
                      Remover dos Assistidos
                    </button>
                  ) : (
                    <button
                      onClick={() => adicionarFilmeAssistido(movie)}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400"
                    >
                      Marcar como Assistido
                    </button>
                  )}

                  {jaNaWatchlist ? (
                    <button
                      onClick={() => removerFilmeParaVerDepois(parseInt(id))}
                      className="bg-red-700 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                    >
                      Remover da Watchlist
                    </button>
                  ) : (
                    <button
                      onClick={() => adicionarFilmeParaVerDepois(movie)}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400"
                    >
                      Adicionar à Watchlist
                    </button>
                  )}
                </div>
                {/* Trailer do Filme */}
                <div className="flex justify-center mt-5">
                  {trailer ? (
                    <iframe
                      width="560"
                      height="315"
                      src={trailer.replace('watch?v=', 'embed/')}
                      title={`${movie.title} Trailer`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg shadow-lg"
                    />
                  ) : (
                    <p>Trailer não disponível</p>
                  )}
                </div>
              </div>
            </div>
            {/* Elenco e Datas de Lançamento */}
            <div className="flex flex-col lg:flex-row gap-10 mt-10">
              <div className="lg:w-1/2">
                <h2 className="text-2xl font-bold">Elenco Principal:</h2>
                <ul className="list-disc ml-5 mt-2">
                  {credits?.cast?.slice(0, 5).map((actor) => (
                    <li key={actor.cast_id} className="text-lg">
                      {actor.name} como {actor.character}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-2xl font-bold">Datas de Lançamento no Brasil:</h2>
                <ul className="list-disc ml-5 mt-2">
                  {releaseDates.map((releaseInfo) => (
                    <li key={releaseInfo.release_date} className="text-lg">
                      {new Date(releaseInfo.release_date).toLocaleDateString('pt-BR')}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Filme não encontrado</p>
      )}
    </>
  );
}
