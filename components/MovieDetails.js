import CrossfadeImage from './CrossfadeImage';
import ImdbRating from './rating/imdbRating';
import LetterboxdRating from './rating/letterboxdRating';
import MubiRating from './rating/mubiRating';

export default function MovieDetails({ movie }) {
  if (!movie) return null;

  // Destructure movie properties for clarity
  const { type, director: movieDirector, writer, poster: moviePoster, name, year, plot } = movie;

  // Generate a random fallback image URL
  const rand404 = `./404/${Math.random().toString().slice(-1)}.jpeg`;

  // Use the provided poster if available, otherwise use fallback
  const poster = moviePoster || rand404;

  // Decide which director/writer value to use based on movie type
  const director =
    type === 'movie'
      ? movieDirector !== 'N/A' ? movieDirector : null
      : writer !== 'N/A' ? writer : null;

  return (
    <>
      {poster && (
        <CrossfadeImage
          src={poster}
          className="film--poster--background"
          opacity="0.2"
          draggable={false}
          zIndex="0"
          fallback={rand404}
        />
      )}
      <div className="film-title-director">
        <div className="film-title">
          {name && year ? `${name} (${year})` : null}
        </div>
        <div className="film-director">
          {director ? `by ${director}` : null}
        </div>
      </div>
      <div className="first-column">
        {poster && (
          <CrossfadeImage
            src={poster}
            className="film--poster--img"
            draggable={false}
            fallback={rand404}
          />
        )}
      </div>
      <div className="second-column">
        <div className="film--ratings">
          {movie && <ImdbRating query={movie.id} />}
          {movie && <LetterboxdRating query={movie.name} movie_id={movie.id} />}
          {movie && <MubiRating query={movie.name} />}
        </div>
        <div className="film--plot">
          {plot !== 'N/A' && plot}
        </div>
      </div>
    </>
  );
}
