import Head from 'next/head';
import { useRef, useEffect } from "react";

const randomInt = (max, min) =>
  Math.round(Math.random() * (max - min)) + min;

export const siteTitle = "Room Tone";

export default function Layout({ children }) {
  const bgImg = useRef(null);

  useEffect(() => {
    const storedBg = window.sessionStorage.getItem("backgroundImg");
    const bgImage =
      storedBg || `../background/bg-img-${randomInt(22, 1)}.jpeg`;

    if (!storedBg) {
      window.sessionStorage.setItem("backgroundImg", bgImage);
    }

    if (bgImg.current) {
      bgImg.current.style.setProperty('--bg-image', `url('${bgImage}')`);
    }
  }, []);

  return (
    <div className="container">
      <Head>
        <meta name="og:title" content={siteTitle} />
      </Head>
      <div className="bg-img faded faded-wide faded-left" ref={bgImg}></div>
      <main>{children}</main>
    </div>
  );
}