import '../styles/globals.scss';
import { AppWrapper } from '../context/state';

// Use a descriptive name for the App component
export default function RTApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}