const express = require("express");
const fetch = require("node-fetch").default || require("node-fetch");


const app = express();
app.use(express.json());
app.use(express.static(__dirname));

// ❗ HIER SPÄTER DEIN DISCORD WEBHOOK
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1455578740301234400/8zbvuRK141KzYGmjcA5OHsfAX_PqAlx-kX0M2MkSlR5n5jzEdybC_Aj2AyLqMb8dzNnj";

app.post("/location", async (req, res) => {
console.log("LOCATION ERHALTEN:", req.body);

  const { lat, lon } = req.body;

  const mapsLink = `https://maps.google.com/?q=${lat},${lon}`;

  const message = {
    content: `🚨 Kind gefunden\n📍 ${lat}, ${lon}\n🗺 ${mapsLink}`
  };

  await fetch(DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message)
  });

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server läuft auf Port " + PORT);
});
