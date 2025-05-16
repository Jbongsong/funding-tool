export default async function handler(req, res) {
  // ✅ Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "https://jbongsong.github.io");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
    return;
  }

  // ✅ Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const { name, email, results } = req.body;

    const formData = new URLSearchParams({ name, email, results });

    const response = await fetch("https://script.google.com/macros/s/AKfycbzacYoDLEUH1oJRzy9MJTP7KMSe6rr5FNOxvjetS7jbJbQxtO3RwwKrftBEHDTgrNXs/exec", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData
    });

    const text = await response.text();
    console.log("✅ Response from Google Apps Script:", text);
    return res.status(200).send(text);
  } catch (err) {
    console.error("❌ Error forwarding request:", err);
    return res.status(500).send("Internal Server Error");
  }
}
