const API_URL = `http://www.omdbapi.com?apikey=${process.env.OMDB_API_KEY}`;

export default async function handler(req, res) {
  try {
    const filmData = await fetch(`${API_URL}&i=${req.query.id}`)
      .then((response) => response.json());
    res.status(200).json(filmData);
  } catch (error) {
    console.error("Error fetching film data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}