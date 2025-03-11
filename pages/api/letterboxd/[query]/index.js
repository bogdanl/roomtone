const API_URL = 'https://api.letterboxd.com/api/v0/search';

export default async function handler(req, res) {
  try {
    const response = await fetch(`${API_URL}?input=${req.query.query}`);
    const result = await response.json();
    const data = result.items;
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching Letterboxd data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
