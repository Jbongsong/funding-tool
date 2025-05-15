export default async function handler(req, res) {
  // ✅ CORS Header to allow GitHub Pages
  res.setHeader("Access-Control-Allow-Origin", "https://jbongsong.github.io");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  try {
    const { name, email, results } = req.body;

    console.log("⏳ Forwarding to Google Script with:", { name, email, results });

    const formData = new URLSearchParams({ name, email, results });

    const response = await fetch("https://script.google.com/macros/s/AKfycbwiNgOcIQqiZApI33mQmkxuiv45kkadkr5wTWtBRtP_51ZYXbO7E0P0TjUuk4XZH8Eh/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData
    });

    const text = await response.text();
    console.log("✅ Google Script response:", text);

    res.status(200).send(text);
  } catch (err) {
    console.error("❌ Proxy error:", err);
    res.status(500).send("Proxy failed");
  }
}
