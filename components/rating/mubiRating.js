import { useAppContext } from '../../context/state';
import LoadingIcon from '../loading';
import useSWR from 'swr';
import Link from 'next/link';
import Rating from '../StarRating';
import { fetcher } from '../../utils/generic';

export default function MubiRating({ query }) {
  const { filmData } = useAppContext();

  // Compute year and director if filmData is available
  let year, director;
  if (filmData) {
    const yearMatch = filmData.Year.match(/^(\d+)–?\d?/);
    year = yearMatch ? yearMatch[1] : '';
    director = filmData.Type === 'movie' ? filmData.Director : 'N/A';
  }

  // Run SWR query only when filmData is available
  const swrEndpoint = filmData ? `/api/mubi/?query=${query}&year=${year}&director=${director}` : null;
  const { data, isLoading, error } = useSWR(swrEndpoint, fetcher);

  if (isLoading) return <LoadingIcon />;
  if (error || !data || !data.props?.initialProps?.pageProps) return null;

  const mubiData = data.props.initialProps.pageProps.initFilm;
  if (!mubiData) return null;

  return (
    <section>
      <div className="film--ratings--rating">
        <Link href={mubiData.web_url} target="_blank">
          <span className="film--ratings--source">
            <img
              className="film--ratings--source--logo"
              src="./sites_logos/mubi-logo.png"
              alt="Mubi Logo"
            />
          </span>
          <Rating rating={mubiData.average_rating_out_of_ten / 2} />
        </Link>
      </div>
    </section>
  );
}