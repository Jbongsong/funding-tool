export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const { name, email, results } = req.body;

  const formData = new URLSearchParams({
    name,
    email,
    results
  });

  const response = await fetch('https://script.google.com/macros/s/AKfycbwiNgOcIQqiZApI33mQmkxuiv45kkadkr5wTWtBRtP_51ZYXbO7E0P0TjUuk4XZH8Eh/exec', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData
  });

  const text = await response.text();
  res.status(200).send(text);
}
