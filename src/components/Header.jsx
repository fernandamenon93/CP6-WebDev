// import { useState } from "react";
import { NavLink } from "react-router-dom";
import BotaoLogin from "./BotaoLogin";
import { useState } from "react";

export default function Header(){

    const [isLogged, setIsLogged] = useState(false);

    const handleLogin = () => {
        setIsLogged(!isLogged);
    }
    
    return (
        <>
            <header className="bg-red-800 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <img src="public/logo-1.png" alt="Logo" className="w-16 h-auto" />
                    <h1 className="text-2xl font-bold">Tela Cheia</h1>
                    <nav>
                        <ul className="flex gap-5">
                            <li><NavLink to="/" className={({ isActive }) => isActive ? 'text-black-300' : 'hover:text-gray-300'}>Home</NavLink></li>
                            <li><NavLink to="/movies" className={({ isActive }) => isActive ? 'text-black-300' : 'hover:text-gray-300'}>Filmes</NavLink></li>
                            <li><NavLink to="/genre"  className={({ isActive }) => isActive ? 'text-black-300' : 'hover:text-gray-300'}>Gêneros</NavLink></li>
                            <li><NavLink to="/watchlistpage" className={({ isActive }) => isActive ? 'text-black-300' : 'hover:text-gray-300'}>Watchlist Page</NavLink></li>
                            <li><NavLink to="/watchedmoviespage" className={({ isActive }) => isActive ? 'text-black-300' : 'hover:text-gray-300'}>Watched Movies Page</NavLink></li>
                            <li><NavLink to="/favorites" className={({ isActive }) => isActive ? 'text-black-300' : 'hover:text-gray-300'}>Meus Favoritos</NavLink></li>
                        </ul>
                    </nav>
                    <BotaoLogin isLogged={isLogged} handleLogin={handleLogin} />
                </div>
            </header>
        </>
    );
    
}