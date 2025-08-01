const express = require("express");
const cloudscraper = require("cloudscraper");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
    res.send("✅ Proxy Cloudflare attivo.");
});

app.get("/bypass", async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) return res.status(400).send("❌ Parametro ?url mancante.");

    try {
        const html = await cloudscraper.get(targetUrl);
        res.send(html);
    } catch (error) {
        res.status(500).send("❌ Errore nel bypass: " + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server attivo sulla porta ${PORT}`);
});