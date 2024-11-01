export default function BotaoLogin({ isLogged, handleLogin }) {
    return (
        <div className="flex gap-4 items-center">
            {isLogged && <span className="text-white">Olá, usuário</span>}
            <button 
                onClick={handleLogin} 
                className="bg-white text-red-800 px-4 py-1 rounded hover:bg-black-200">
                {isLogged ? "Logout" : "Login"}
            </button>
        </div>
    );
}
