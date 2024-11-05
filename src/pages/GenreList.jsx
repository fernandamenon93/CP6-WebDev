import { useEffect, useState } from 'react';
import GenreCard from '../components/GenreCard';

export default function GenreList(){

    const [genre, setGenre] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`)
        .then(response => response.json())
        .then(data => {setGenre(data.genres)})
        .catch(err => console.error(err));
    }, []);

    return(
        <>
        <h2 className='col-span-4 text-2xl font-bold text-center mb-5'>Veja os filmes por gênero;</h2>
        <main className='flex flex-wrap gap-2 justify-center'> {/* Reduzindo o gap para 2 */}
        {
            genre.map((genre) => (
                <div className="w-full md:w-1/2 lg:w-1/4" key={genre.id}> {/* Mudança: movi o key para o div */}
                    <GenreCard {...genre} />
                </div>
            ))
        }
        </main>




        </>
    )
}