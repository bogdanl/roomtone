import * as cheerio from 'cheerio';

const API_URL = 'https://api.mubi.com/v3/search';

export default async function handler(req, res) {
  if (req.query == undefined) {
    res.status(200).json({});
    return;
  }

  const url = new URL(API_URL);
  const params = {
    query: `${req.query.query} ${req.query.year} ${req.query.director !== 'N/A' ? req.query.director : ''}`,
    include_series: 'true'
  };
  Object.keys(params).forEach(key => {
    url.searchParams.set(key, params[key]);
  });

  try {
    const results = await fetch(url, {
      headers: {
        CLIENT: 'web',
        CLIENT_COUNTRY: 'us'
      }
    }).then((response) => response.json());

    // Try and find a result that matches exactly the searched title
    let film = results.search.films.find((item) =>
      item.title.toLowerCase() === req.query.query.toLowerCase());

    // Otherwise fallback to a title that starts with the same query
    // to account for title mismatches between platforms
    if (!film) {
      film = results.search.films.find((item) =>
        item.title.toLowerCase().startsWith(req.query.query.toLowerCase()));
    }

    if (!film) {
      res.status(200).json({});
      return;
    }

    const $ = await fetch(film.canonical_url)
      .then((response) => response.text())
      .then(data => cheerio.load(data));

    const mubiData = JSON.parse($("#__NEXT_DATA__").text());
    res.status(200).json(mubiData);
  } catch (error) {
    console.error("Error in Mubi handler:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
