import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useCallback } from 'react';
import Layout, { siteTitle } from '../components/layout';
import MovieDetails from '../components/MovieDetails';
import SearchBar from '../components/SearchBar';
import { useAppContext } from '../context/state';
import Link from 'next/link';

/**
 * Convert a string into a slug.
 */
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

export default function Page() {
  const router = useRouter();
  const { slug } = router.query;
  const { selectedFilm, setSelectedFilm } = useAppContext();

  // Fetch movie data based on movie id extracted from the slug
  const fetchMovieFromSlug = useCallback(async (movieId) => {
    try {
      const data = await fetch(`api/omdb/film/${movieId}/`)
        .then((response) => response.json());
      return {
        id: data.imdbID,
        poster: data.Poster,
        name: data.Title,
        year: data.Year,
        plot: data.Plot,
        director: data.Director,
        writer: data.Writer,
        type: data.Type,
      };
    } catch (error) {
      console.error("Error fetching movie from slug:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    if (slug) {
      const slugArray = slug.split('-');
      const movieId = slugArray.pop();
      fetchMovieFromSlug(movieId).then((data) => {
        if (data) {
          setSelectedFilm(data);
        }
      });
    }
  }, [slug, fetchMovieFromSlug, setSelectedFilm]);

  const handleMovieSelect = (movie) => {
    const slugifiedTitle = slugify(`${movie.name}-${movie.year}-${movie.id}`);
    router.push(`/${slugifiedTitle}`);
  };

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="logo">
        <Link href="/">
          <img src="/logo6.png" alt="Logo" />
        </Link>
      </div>
      <div className="main-content">
        <SearchBar onSelect={handleMovieSelect} />
        {slug && (
          <MovieDetails movie={selectedFilm} />
        )}
      </div>
    </Layout>
  );
}