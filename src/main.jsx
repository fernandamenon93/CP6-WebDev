import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import MoviesByGenrePage from './pages/MoviesByGenrePage.jsx';
import MovieListPage from './pages/MovieListPage.jsx';
import MovieDetailPage from './pages/MovieDetailPage.jsx';
import Home from './pages/Home.jsx';
import GenreList from './pages/GenreList.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import WatchlistPage from './pages/WatchlistPage.jsx';
import WatchedMoviesPage from './pages/WatchedMoviesPage.jsx';
import { ThemeProvider } from "@material-tailwind/react";
import { WatchlistProvider } from './context/WatchlistContext.jsx';
import { MoviesProvider } from './context/MoviesContext.jsx'; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/movies', element: <MovieListPage /> },
      { path: '/movies/:id', element: <MovieDetailPage /> },
      { path: '/genre', element: <GenreList /> },
      { path: '/genre/:genero', element: <MoviesByGenrePage /> },
      { path: '/WatchlistPage', element: <WatchlistPage /> },
      { path: '/WatchedMoviesPage', element: <WatchedMoviesPage /> },
      { path: '*', element: <PageNotFound /> }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <WatchlistProvider>
        <MoviesProvider>
          <RouterProvider router={router} />
        </MoviesProvider>
      </WatchlistProvider>
    </ThemeProvider>
  </StrictMode>
);
