import express from 'express';
import * as cheerio from 'cheerio';

const router = express.Router();

router.get("/:word", async (req, res) => {
  const { word } = req.params;

  try {
    const response = await fetch(`https://nl.wiktionary.org/wiki/${word}`);
    const html = await response.text();
    const $ = cheerio.load(html);

    let article = "unknown";

    // ищем section с aria-labelledby="Zelfstandig_naamwoord"
    const nounSection = $('section[aria-labelledby="Zelfstandig_naamwoord"]').first();

    if (nounSection.length > 0) {
      // ищем первый <p> и первый <span> внутри него
      const span = nounSection.find("p span").first();
      if (span.length > 0) {
        article = span.text().trim(); // должно вернуть "het" или "de"
      }
    }

    res.json({ word, article });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch article" });
  }
});

export default router;
