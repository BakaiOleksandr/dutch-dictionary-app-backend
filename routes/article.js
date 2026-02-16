import express from 'express';
import * as cheerio from 'cheerio';

const router = express.Router();

router.get('/:word', async (req, res) => {
  const {word} = req.params;

  try {
    const response = await fetch(`https://nl.wiktionary.org/wiki/${word}`);
    const html = await response.text();
    const $ = cheerio.load(html);

    let article = 'unknown';

    const nounSection = $(
      'section[aria-labelledby="Zelfstandig_naamwoord"]',
    ).first();

    if (nounSection.length > 0) {
      // ---------- 1) Пытаемся найти в span ----------
      const span = nounSection.find('p span').first();
      if (span.length > 0) {
        const text = span.text().trim().toLowerCase();
        if (text === 'de' || text === 'het') {
          article = text;
        }
      }

      // ---------- 2) Fallback: ищем в тексте ----------
      if (article === 'unknown') {
        const fullText = nounSection.text().toLowerCase();

        // regex: de woord / het woord
        const regex = new RegExp(`\\b(de|het)\\s+${word.toLowerCase()}\\b`);
        const match = fullText.match(regex);

        if (match) {
          article = match[1];
        }
      }
    }

    res.json({word, article});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Failed to fetch article'});
  }
});

export default router;
