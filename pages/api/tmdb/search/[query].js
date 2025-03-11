const API_URL = 'https://api.themoviedb.org/3/search/multi?api_key=1754e7199e500189002862fba37fd2e2';

export default async function handler(req, res) {
  try {
    const response = await fetch(`${API_URL}&query=${encodeURIComponent(req.query.query)}`);
    const data = await response.json();
    const searchData = data.results;
    res.status(200).json(searchData);
  } catch (error) {
    console.error("Error fetching TMDB search data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
