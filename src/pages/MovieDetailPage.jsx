import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaStar, FaCoins } from 'react-icons/fa';

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [revenueInBRL, setRevenueInBRL] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [credits, setCredits] = useState(null); // Novo estado para dados de crédito
  const [releaseDates, setReleaseDates] = useState([]); // Novo estado para datas de lançamento do Brasil

  const exchangeRate = 5;

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
        const brazilReleaseDate = data.results.find(releaseInfo => releaseInfo.iso_3166_1 === 'BR');
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
          className="-mt-1 h-[710px] bg-cover bg-center text-white relative"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
        >
          <div className="bg-black bg-opacity-80 p-10 w-full h-full absolute top-0 left-0 flex gap-x-10 ">
            <img
              src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
              alt={movie.title}
              className=""
            />
            <div className="flex flex-col gap-y-3 justify-start items-center">
              <h1 className="text-5xl font-bold text-center">{movie.title}</h1>
              <p className="font-semibold text-lg text-center">
                {movie.overview ? movie.overview : 'Descrição não disponível'}
              </p>
              <div className="flex gap-10">
                <div className="flex items-center gap-1 font-semibold text-md">
                  <FaStar className="text-yellow-600" /> <span> {movie.vote_average}</span>
                </div>
                <div className="flex items-center gap-2 font-semibold text-lg">
                  <FaCoins className="text-yellow-600" />{' '}
                  <span> {revenueInBRL ? revenueInBRL : 'Valor não divulgado'}</span>
                </div>
              </div>
              {/* Exibe o trailer */}
              <div>
                {trailer ? (
                  <iframe
                    width="560"
                    height="315"
                    src={trailer.replace('watch?v=', 'embed/')}
                    title={`${movie.title} Trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <p>Trailer não disponível</p>
                )}
              </div>
              {/* Exibe o elenco principal após o trailer */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="text-2xl font-bold mt-1 w-full md:w-1/1">
                  <h2>Elenco Principal:</h2>
                    <ul>
                      {credits?.cast?.slice(0, 5).map((actor) => (
                        <li key={actor.cast_id} className="text-lg">
                          {actor.name} como {actor.character}
                        </li>
                      ))}
                    </ul>
                </div>
              <div className="text-2xl font-bold mt-1 w-full md:w-1/2">
                <h2>Datas de Lançamento no Brasil:</h2>
                  <ul>
                    {releaseDates.map((releaseInfo) => (
                      <li key={releaseInfo.release_date} className="text-lg">
                        {releaseInfo.release_date}
                      </li>
                    ))}
                  </ul>
              </div>
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
