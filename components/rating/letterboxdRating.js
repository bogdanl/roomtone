import useSWR from 'swr';
import LoadingIcon from '../loading';
import Link from 'next/link';
import Rating from '../StarRating';
import { fetcher } from '../../utils/generic';

/**
 * Recursively checks if any value in the object (or nested objects/arrays)
 * contains the given query string.
 */
function containsQuery(obj, query) {
  if (typeof obj === 'string') {
    return obj.toLowerCase().includes(query.toLowerCase());
  }
  if (Array.isArray(obj)) {
    return obj.some((item) => containsQuery(item, query));
  }
  if (obj && typeof obj === 'object') {
    return Object.values(obj).some((val) => containsQuery(val, query));
  }
  return false;
}

/**
 * Recursively finds the first 'film' object in any nested property
 * that contains the query string anywhere in its values.
 */
function findFilmRecursive(obj, query, movie_id) {
  if (obj && typeof obj === 'object') {
    if (obj.hasOwnProperty('film') && obj.film && containsQuery(obj.film, movie_id)) {
      return obj.film;
    }
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        const found = findFilmRecursive(obj[key], query, movie_id);
        if (found) return found;
      }
    }
  }
  return null;
}

export default function LetterboxdRating({ query, movie_id }) {
  const { data, isLoading, error } = useSWR(`/api/letterboxd/${query}`, fetcher);

  if (query === undefined) return null;
  if (isLoading) return <LoadingIcon />;
  if (!data || error) return <p>Letterboxd error</p>;

  const film = findFilmRecursive(data, query, movie_id);
  if (!film) return null;

  const rating = film.rating;
  const url = film.links?.find((link) => link.type === "letterboxd")?.url || "#";

  return (
    <section className="film--ratings--rating">
      <Link target="_blank" href={url}>
        <span className="film--ratings--source">
          <img
            className="film--ratings--source--logo"
            src="./sites_logos/letterboxd-logo.png"
            alt="Letterboxd Logo"
          />
        </span>
        <Rating rating={rating && parseFloat(rating.toFixed(2))} />
      </Link>
    </section>
  );
}
