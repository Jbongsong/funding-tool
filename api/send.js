export default async function handler(req, res) {
  const response = await fetch("https://script.google.com/macros/s/AKfycbwiNgOcIQqiZApI33mQmkxuiv45kkadkr5wTWtBRtP_51ZYXbO7E0P0TjUuk4XZH8Eh/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams(req.body)
  });

  const text = await response.text();
  res.status(200).send(text);
}
