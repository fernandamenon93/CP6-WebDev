import { Link } from 'react-router-dom';

export default function GenreCard({ name }) {
    return (
        <Link className="w-full flex justify-center mb-1" to={`/genre/${name}`}>
            <div className="bg-red-600 w-60 h-15 shadow-md p-4 flex items-center justify-center">
                <h3 className="text-lg text-white font">{name}</h3>
            </div>
        </Link>
    );
}
