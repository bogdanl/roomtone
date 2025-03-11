const API_URL = `http://www.omdbapi.com?apikey=${process.env.OMDB_API_KEY}`;

export default async function handler(req, res) {
  try {
    const response = await fetch(`${API_URL}&s=${encodeURIComponent(req.query.query)}`);
    const json = await response.json();
    const searchData = json.Search;
    res.status(200).json(searchData);
  } catch (error) {
    console.error("Error fetching search data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}