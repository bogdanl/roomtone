import useSWR from 'swr';
import LoadingIcon from '../loading';
import Link from 'next/link';
import { useAppContext } from '../../context/state';
import Rating from '../StarRating';
import { useEffect } from 'react';
import { fetcher, updateImdbUrl, parseRating } from '../../utils/generic';

const logos = {
  'Internet Movie Database': './sites_logos/imdb-logo.png',
  'Rotten Tomatoes': './sites_logos/rottentomatoes-logo.png',
  'Metacritic': './sites_logos/metacritic-logo.png'
};

export default function ImdbRating({ query }) {
  const { data, isLoading, error } = useSWR(`api/omdb/film/${query}/`, fetcher);
  const { setFilmData } = useAppContext();

  useEffect(() => {
    if (data) {
      setFilmData(data);
    }
  }, [data, setFilmData]);

  if (query === undefined) return null;
  if (isLoading) return <LoadingIcon />;
  if (error) return <p>Nothing found</p>;

  updateImdbUrl(data);

  return (
    <section>
      {data.Ratings.map((datum, index) => {
        const ratingValue = parseRating(datum);
        const link = datum.url;
        return (
          <div className='film--ratings--rating' key={index}>
            {link ? (
              <Link href={link} target="_blank">
                <span className='film--ratings--source'>
                  <img
                    className='film--ratings--source--logo'
                    src={logos[datum.Source]}
                    alt={datum.Source}
                  />
                </span>
                <Rating rating={ratingValue} />
              </Link>
            ) : (
              <>
                <span className='film--ratings--source'>
                  <img
                    className='film--ratings--source--logo'
                    src={logos[datum.Source]}
                    alt={datum.Source}
                  />
                </span>
                <Rating rating={ratingValue} />
              </>
            )}
          </div>
        );
      })}
    </section>
  );
}
