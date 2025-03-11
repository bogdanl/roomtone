import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import { useAppContext } from '../context/state';
import SearchBar from '../components/SearchBar';
import { useRouter } from 'next/router';

// Utility function to slugify text
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove non-word chars
    .replace(/\-\-+/g, '-')   // Replace multiple - with single -
    .replace(/^-+/, '')       // Trim - from start
    .replace(/-+$/, '');      // Trim - from end

export default function Home() {
  const router = useRouter();
  const { selectedFilm } = useAppContext();

  const handleMovieSelect = (movie) => {
    const slugifiedTitle = slugify(`${movie.name}-${movie.year}-${movie.id}`);
    router.push(`/${slugifiedTitle}`);
  };

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="logo">
        <img src="/logo6.png" alt="Logo" />
      </div>
      <div className="main-content">
        <SearchBar onSelect={handleMovieSelect} />
      </div>
    </Layout>
  );
}