import React, { createContext, useState, useEffect } from 'react';

export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [filmesAssistidos, setFilmesAssistidos] = useState(() => {
    // Recuperar do localStorage ao carregar a página
    const saved = localStorage.getItem('filmesAssistidos');
    return saved ? JSON.parse(saved) : [];
  });

  const [filmesParaVerDepois, setFilmesParaVerDepois] = useState(() => {
    const saved = localStorage.getItem('filmesParaVerDepois');
    return saved ? JSON.parse(saved) : [];
  });

  // Atualizar o localStorage quando os filmes mudarem
  useEffect(() => {
    localStorage.setItem('filmesAssistidos', JSON.stringify(filmesAssistidos));
  }, [filmesAssistidos]);

  useEffect(() => {
    localStorage.setItem('filmesParaVerDepois', JSON.stringify(filmesParaVerDepois));
  }, [filmesParaVerDepois]);

  const adicionarFilmeAssistido = (filme) => {
    setFilmesAssistidos((prev) => [...prev, filme]);
  };

  const adicionarFilmeParaVerDepois = (filme) => {
    setFilmesParaVerDepois((prev) => [...prev, filme]);
  };

  const removerFilmeAssistido = (filmeId) => {
    setFilmesAssistidos((prev) => prev.filter((filme) => filme.id !== filmeId));
  };

  const removerFilmeParaVerDepois = (filmeId) => {
    setFilmesParaVerDepois((prev) => prev.filter((filme) => filme.id !== filmeId));
  };

  return (
    <MoviesContext.Provider
      value={{
        filmesAssistidos,
        filmesParaVerDepois,
        adicionarFilmeAssistido,
        adicionarFilmeParaVerDepois,
        removerFilmeAssistido,
        removerFilmeParaVerDepois,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
