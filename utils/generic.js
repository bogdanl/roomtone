/**
 * A generic fetcher function to be re-used across components, if desired.
 */
export const fetcher = (...args) =>
  fetch(...args).then((response) => response.json());

/**
 * Populate IMDb data with a direct URL to the IMDb page.
 * @param {Object} data The full rating data from OMDB
 */
export function updateImdbUrl(data) {
  if (!data || !data.Ratings) return;
  const imdbRating = data.Ratings.find(
    (el) => el.Source === "Internet Movie Database"
  );
  if (imdbRating) {
    imdbRating.url = `https://imdb.com/title/${data.imdbID}`;
  }
}

/**
 * Convert rating strings from various sources (IMDb, Rotten Tomatoes, Metacritic, etc.) into a normalized numeric value.
 * @param {Object} datum A rating object with { Source, Value }
 * @returns {number} A standardized rating value (0-10 scale, or whichever you prefer)
 */
export function parseRating(datum) {
  let val = 0;

  if (datum.Source === "Internet Movie Database") {
    // e.g. "6.6/10"
    const match = datum.Value.match(/^(\d+\.\d{1,9})\/10$/);
    if (match) val = parseFloat(match[1]);
  } else if (datum.Source === "Rotten Tomatoes") {
    // e.g. "66%"
    const match = datum.Value.match(/^(\d+)%$/);
    if (match) val = parseFloat(match[1]) / 10;
  } else if (datum.Source === "Metacritic") {
    // e.g. "66/100"
    const match = datum.Value.match(/^(\d+)\/100$/);
    if (match) val = parseFloat(match[1]) / 10;
  }

  return val / 2;
}
