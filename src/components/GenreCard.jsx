import { Link } from "react-router-dom";

export default function GenreCard({ name }) {
    return (
        <Link className="w-auto" to={`/genre/${name}`}>
            <div className="bg-red-900 w-64 h-28 shadow-md rounded-md p-4 flex items-center justify-center">
                <h3 className="text-lg text-white font">{name}</h3>
            </div>
        </Link>
    );
}
