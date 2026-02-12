import {Router} from 'express';
import Folder from '../models/Folder.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

/**
 * Создать папку
 * POST /folders
 */
router.post('/', authMiddleware, async (req, res) => {
  try {
    const folder = await Folder.create({
      userId: req.userId,
      name: req.body.name,
    });

    res.json(folder);
  } catch (err) {
    res.status(500).json({message: 'Create folder error'});
  }
});

/**
 * Получить все папки пользователя
 * GET /folders
 */
router.get('/', authMiddleware, async (req, res) => {
  try {
    const folders = await Folder.find({userId: req.userId});
    res.json(folders);
  } catch (err) {
    res.status(500).json({message: 'Get folders error'});
  }
});
// get one folder
router.get('/:folderId', authMiddleware, async (req, res) => {
  try {
    const folder = await Folder.findOne({
      _id: req.params.folderId,
      userId: req.userId,
    });

    if (!folder) {
      return res.status(404).json({message: 'Folder not found'});
    }

    res.json(folder);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Server error'});
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  await Folder.deleteOne({_id: req.params.id, userId: req.userId});
  res.json({success: true});
});
export default router;
