import { useEffect, useState } from 'react';
import GenreCard from '../components/GenreCard';

export default function GenreList() {
    const [genre, setGenre] = useState([]);

    // Faz a requisição para buscar os gêneros
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`)
            .then((response) => response.json())
            .then((data) => {
                setGenre(data.genres);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div
            className="bg-cover bg-center min-h-screen text-white py-16 px-6"
            style={{
                backgroundImage: `url(https://path/to/your/cinema-background.jpg)`, // Substitua pela URL correta
            }}
        >
            <div className="bg-black bg-opacity-70 p-10 rounded-lg max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-8">Veja os filmes por gênero:</h2>
                <p className="text-lg mb-10">Selecione um gênero para explorar os melhores filmes disponíveis.</p>

                <main className="flex flex-wrap justify-center gap-6">
                    {genre.map((genre) => (
                        <div
                            key={genre.id}
                            className="bg-red-600 hover:bg-red-500 text-white font-semibold py-5 px-6 rounded-lg shadow-lg transition-transform transform hover:-translate-y-2 w-48 text-center"
                        >
                            <GenreCard {...genre} />
                        </div>
                    ))}
                </main>
            </div>
        </div>
    );
}
