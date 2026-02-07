import {Router} from 'express';
import Word from '../models/Word.js';
import Folder from '../models/Folder.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

/**
 * Добавить слово в папку
 * POST /words
 */
router.post('/', authMiddleware, async (req, res) => {
  try {
    const {folderId, en, nl, ru} = req.body;

    // проверяем, что папка принадлежит юзеру
    const folder = await Folder.findOne({
      _id: folderId,
      userId: req.userId,
    });

    if (!folder) {
      return res.status(403).json({message: 'No access to this folder'});
    }

    const word = await Word.create({
      folderId,
      en,
      nl,
      ru,
    });

    res.json(word);
  } catch (err) {
    res.status(500).json({message: 'Create word error'});
  }
});

/**
 * Получить слова папки
 * GET /words/:folderId
 */
router.get('/:folderId', authMiddleware, async (req, res) => {
  try {
    const words = await Word.find({folderId: req.params.folderId});
    res.json(words);
  } catch (err) {
    res.status(500).json({message: 'Get words error'});
  }
  router.delete('/:id', authMiddleware, async (req, res) => {
    await Word.deleteOne({_id: req.params.id});
    res.json({success: true});
  });
});

export default router;
