import {Router} from 'express';
import Word from '../models/Word.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

/**
 * Добавить слово в папку
 * POST /words
 */
router.post('/', authMiddleware, async (req, res) => {
  const {folderId, nl, ru} = req.body;

  // Проверка полей
  if (!folderId || !nl || !ru) {
    return res.status(400).json({message: 'Missing fields'});
  }

  try {
    // Создаём слово
    const word = await Word.create({folderId, nl, ru});
    res.json(word);
  } catch (err) {
    console.error('Mongoose error adding word:', err); // лог полной ошибки
    res.status(500).json({
      message: 'Error adding word',
      error: err.message,
    });
  }
});

/**
 * Получить слова папки
 * GET /words/:folderId
 */
router.get('/:folderId', authMiddleware, async (req, res) => {
  const {folderId} = req.params;

  if (!folderId) {
    return res.status(400).json({message: 'Missing folderId'});
  }

  try {
    const words = await Word.find({folderId});
    res.json(words);
  } catch (err) {
    console.error('Mongoose error getting words:', err);
    res.status(500).json({message: 'Get words error', error: err.message});
  }
});

/**
 * Удалить слово
 * DELETE /words/:id
 */
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Word.deleteOne({_id: req.params.id});
    res.json({success: true});
  } catch (err) {
    console.error('Mongoose error deleting word:', err);
    res.status(500).json({message: 'Error deleting word', error: err.message});
  }
});

export default router;
