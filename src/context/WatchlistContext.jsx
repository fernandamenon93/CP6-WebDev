import React, { createContext, useState, useEffect } from 'react';

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        setWatchlist(storedWatchlist);
    }, []);

    const handleWatchlist = (movie) => {
        let updatedWatchlist = [...watchlist];
        const isInWatchlist = updatedWatchlist.some(item => item.id === movie.id);

        if (isInWatchlist) {
            updatedWatchlist = updatedWatchlist.filter(item => item.id !== movie.id);
        } else {
            updatedWatchlist.push(movie);
        }

        setWatchlist(updatedWatchlist);
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    };

    const isInWatchlist = (movie) => {
        return watchlist.some(item => item.id === movie.id);
    };

    return (
        <WatchlistContext.Provider value={{ watchlist, handleWatchlist, isInWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
};
