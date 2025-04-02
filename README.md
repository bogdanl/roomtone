# Room Tone - Movie Ratings Aggregator

Room Tone is a Next.js application that retrieves movie ratings from several platforms including:
* IMDb
* Rotten Tomatoes
* Metacritic
* Letterboxd
* Mubi

Movie addicts might know the hassle of having to look up a movie on various platforms to find its ratings, before deciding whether it's worth their time – this is the reason why I made this app: to save time to said cinephiles. I don't watch trailers, I don't watch teasers, I don't read plots (besides vague keywords), so contextualized ratings are my compass.

## Features

- **Multi-Platform Ratings:** Retrieve and display movie ratings from multiple platforms.
- **Dynamic API Calls:** Uses SWR-based data fetching to provide real-time ratings.
- **Easy UI:** Display movie details, poster, ratings and links to the various platforms for more details.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### How to run

Ratings for IMDb, Rotten Tomatoes and Metacritic are fetched from the OMDB API (if available), so you'll need a free OMDB API key.

Add an `.env.local` file with in the project root
```
OMDB_API_KEY=<YOUR_OMDB_API_KEY>
```

install packages

`npm i`

and run the app with

`npm run dev`

or 

`yarn dev`

## License

All rights reserved.
You may use, modify, and share this software for personal or non-commercial purposes only.
Commercial use of any part of this project is prohibited unless you obtain explicit permission from the author.

## Disclaimer

Room Tone is a demonstrative experiment that pulls data from external sources and that possibly queries APIs that may not be publicly-advertised or have usage policies in places. It is your responsibility to ensure compliance with any relevant terms.

We disclaim any liability for misuse of the data or violation of any third-party policies. If you believe any policies are being violated, please open an issue or contact us.
